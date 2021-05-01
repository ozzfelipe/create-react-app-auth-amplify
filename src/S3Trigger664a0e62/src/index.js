// eslint-disable-next-line

const aws = require("aws-sdk");
const ses = aws.SES;
const { NotificationService } = require("./services/NotificationService");

exports.handler = function (event, context) {
  const notificationService = new NotificationService();
  console.log("Received S3 event:", JSON.stringify(event, null, 2));
  console.log("------event-----", event);
  console.log("------context-----", context);
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line

  notificationService.push(
    "felipe.santos@amcom.com.br",
    key,
    JSON.stringify({ event, context })
  );
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  context.done(null, "Successfully processed S3 event"); // SUCCESS with message
};
