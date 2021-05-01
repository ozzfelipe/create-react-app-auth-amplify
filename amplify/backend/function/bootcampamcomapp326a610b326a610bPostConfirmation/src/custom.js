const aws = require('aws-sdk');
const ddb = aws.DynamoDB()


exports.handler = (event, context) => {
  let date = new Date()

  if(event.request.userttributes.sub){
    const params = {
      Item: {
        'id':{S: event.request.userAttributes.sub},
        '__typename': {S: 'User'},
        'userName': {S: event.request.userAttributes.email},
        'createdAt': {S: date.toISOString()},
        'updateddAt': {S: date.toISOString()},
      },
      TableName: process.env.USERTABLE
    }

    try {
      await ddb.putItem(params).promisse()
      console.log('SUCCESSES')
    } catch (error) {
      console.log('Erro', error)
      context.done(null, event);
      
    }

  } else {
    console.log('Erro ao tentar salvar no DB')
    context.done(null, event);
  }
};
