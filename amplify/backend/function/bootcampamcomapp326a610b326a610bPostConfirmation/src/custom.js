const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();
const sns = new aws.SNS({ apiVersion: "2010-03-31" });

exports.handler = async (event, context) => {
  console.log("eventResquest", event.request);

  if (event.request.userAttributes.sub) {
    const userEmail = event.request.userAttributes.email;
    const createTopicRsult = await createTopic(event.userName);

    console.log("resultado createTopic", createTopicRsult);
    if (createTopicRsult) {
      const subscribeResult = await subscribeTopic(
        createTopicRsult.TopicArn,
        userEmail
      );
      if (subscribeResult) {
        await ddbSaveUser(event, createTopicRsult.TopicArn);
      } else {
        deleteTopic(createTopicRsult.TopicArn);
      }
    }

    context.done(null, event);
  } else {
    console.log("Erro ao tentar salvar no DB");
    context.done(null, event);
  }
};

const createTopic = async (userName) => {
  var params = {
    Name: `userTopicS3-${userName.replace(/(@|\(|\)| |\.)/g, "-")}`,
    Tags: [
      {
        Key: "bootcamp-amcom",
        Value: "snsTopic",
      },
    ],
  };
  return await sns
    .createTopic(params, function (err, data) {
      if (err) {
        console.log("erro ao criar topico", err);
        return false;
      } else {
        console.log(data);
        return data;
      } // successful response
    })
    .promise();
};

const subscribeTopic = async (topicArn, email) => {
  var params = {
    Protocol: "email",
    TopicArn: topicArn,
    Endpoint: email,
    ReturnSubscriptionArn: true,
  };
  return await sns
    .subscribe(params, function (err, data) {
      if (err) {
        console.log("erro ao se inscrever no topico", err);
        return false;
      } else {
        console.log(data);
        return data;
      } // successful response
    })
    .promise();
};

const deleteTopic = async (topicArn) => {
  var params = {
    TopicArn: topicArn,
  };
  return await sns
    .deleteTopic(params, function (err, data) {
      if (err) {
        console.log("erro ao excluir topico", err);
        return false;
      } else {
        console.log(data);
        return data;
      } // successful response
    })
    .promise();
};

const ddbSaveUser = async (event, topicArn) => {
  let date = new Date();

  const params = {
    Item: {
      id: { S: event.request.userAttributes.email },
      __typename: { S: "User" },
      username: { S: event.userName },
      email: { S: event.request.userAttributes.email },
      snsTopicArn: { S: topicArn },
      createdAt: { S: date.toISOString() },
      updateddAt: { S: date.toISOString() },
    },
    TableName: process.env.USERTABLE,
  };

  try {
    await ddb.putItem(params).promise();
    console.log("SUCCESSES");
    return true;
  } catch (error) {
    console.log("Erro", error);
    return false;
  }
};
