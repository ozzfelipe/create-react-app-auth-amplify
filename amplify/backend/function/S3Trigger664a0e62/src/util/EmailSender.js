const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: process.env.REGION });
const sendEmail = async (to, subject, body) => {
  try {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },

        Subject: { Data: subject },
      },
      Source: "felipe.santos@amcom.com.br",
    };
    return await ses.sendEmail(params).promise();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendEmail };
