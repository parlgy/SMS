const express = require('express');
const sendSMS = require('./index');
// export {time_clicked}

const app = express();


// const time_clicked = new Date();

module.exports = function smsServer() {
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    // TODO: Incoming messages route
    app.post('/incoming-messages', (req, res) => {
        const data = req.body;
        console.log(`Received message: \n ${data}`);
        res.sendStatus(200);
      });
    // TODO: Delivery reports route
    app.post('/delivery-reports', (req, res) => {
        const data = req.body;
        console.log(`Received report: \n ${data}`);
        res.sendStatus(200);
      });

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`App running on port: ${port}`);

        // TODO: call sendSMS to send message after server starts

    });

    // app.get('/message/:dispatch_time', (req, res) => {
    //    // Capture the time the link was clicked
    //   const dispatch_time = req.params.dispatch_time; // Capture the timeSent parameter from the URL
    //   const query = "SELECT * FROM messages WHERE dispatch_time = ?";
    //   connection.query(query, [dispatch_time], (err, result) => {
    //     if (err) throw err;
    //     const message = result[0]; // Assuming there is only one message with this timeSent value
    //     const insertQuery = "INSERT INTO messages (id, time_clicked) VALUES (?, ?)";
    //     connection.query(insertQuery, [message.id, time_clicked], (err, result) => {
    //       if (err) throw err;
    //       res.send(`Message sent at ${message.dispatch_time}: ${message.message}`); // Display the message to the user
    //     });
    //   });
    // });
    
    
};