var amqp = require('amqplib/callback_api');
var amqConn = null;
// var amqp = require('amqplib/callback_api');
function receiver(){

amqp.connect('amqp://icc-int-consumer:nXNX4NnrToksXndrphHvPX3hhcXpXRQweje9jLqN@integration.pltsci.com:5672/icc-int', function(err, connection) {
    if (err) {
        console.error("[AMQP]", err.message);
        return setTimeout(receiver, 1000);
      }
      connection.on("error", function(err) {
        if (err.message !== "Connection closing") {
          console.error("[AMQP] conn error", err.message);
        }
      });
      connection.on("close", function() {
        // pjs.closeAll();  
        console.error("[AMQP] reconnecting");
        // session.close();
        console.log("inside close");
        return setTimeout(receiver, 1000);
      });
      console.log("[AMQP] connected");
      
      amqConn = connection;
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'consumer.telematics_heartbeat';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function async (msg) {

            // res.json(msg);
            console.log(" [x] Received %s", msg.content.toString());
            
        
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg);
              },1000);
            }, {
              // manual acknowledgment mode,
              // see https://www.rabbitmq.com/confirms.html for details
              noAck: false
            });
        });
});
}

exports.run = receiver()