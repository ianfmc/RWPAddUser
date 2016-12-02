var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    
    var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

    userEmail = event.email;
    if (userEmail == null) {
      callback(new Error('No email'));
    }
    else {
      if (userEmail.indexOf('@') < 1) {
        callback(new Error('Malformed email'));
      }
      else {
        var params = {

            TableName : 'User',
            Item : {
                "email" : userEmail,
            },
        };
        docClient.put(params, function(err, result) {
          if (err)
            callback(new Error('DynamoDB Error'));
          else
            callback(null, '{ user: ' + event.email + ' }');
        });
      }
    }
};

