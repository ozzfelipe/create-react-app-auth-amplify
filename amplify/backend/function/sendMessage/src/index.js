/* Amplify Params - DO NOT EDIT
	API_BOOTCAMPAMCOMAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_BOOTCAMPAMCOMAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const aws = require("aws-sdk");
const sns = new aws.SNS({ apiVersion: "2010-03-31" });
const ddb = new aws.DynamoDB();

exports.handler = async (event) => {
  const response = JSON.stringify(event.arguments);

  const userData = await getDataUser(event.arguments.userEmail);
  if (userData) {
    const snsTopicArn = userData.Items[0].snsTopicArn.S;

    await publishMessage(snsTopicArn, event.arguments.message);
  }

  return response;
};

const publishMessage = async (snsTopicArn, message) => {
  var params = {
    Message: message /* required */,
    Subject: "Your files have been updated",
    TopicArn: snsTopicArn,
  };
  return await sns
    .publish(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        return false;
      } // an error occurred
      else {
        return data;
      } // successful response
    })
    .promise();
};

const getDataUser = async (userEmail) => {
  var params = {
    ExpressionAttributeValues: {
      ":v1": {
        S: userEmail,
      },
    },
    KeyConditionExpression: "id = :v1",
    TableName: process.env.USERTABLE,
  };
  return await ddb
    .query(params, function (err, data) {
      if (err) {
        console.log("FAILED TO GET USER DATA:", err);

        return false;
      } else return data;
    })
    .promise();
};
