const AfricasTalking = require('africastalking');
// const smsServer = require('./smsServer');
const mysql = require('mysql');
// import { time_clicked } from './smsServer';

// const time_cliked = require('./smsServer');


// Initialize AfricasTalking with your API key and username
// const username = 'sandbox';
// const apiKey = 'c2219efc916a509a32699f02d0badbfc4f0122e0ff104bcedf3a3ab9431f17db';

const username = 'healthsms';
const apiKey = '7ede4f1c982ef4a15e2920489c73b4c7c7f2feaaa80672d8d32ba9d88088fc9a';
const africastalking = AfricasTalking({username, apiKey});

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'health'
});


const message = `Dear patient your lab results are available. COLLECT them at your nearest Facility as soon as possible. split ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`;

const words = message.split('split');
const dispatch_time = words[1];
// Define the message parameters

const to = '+254722618773'; // Replace with the phone number you want to send the message to
// const from = 'LAB-RESULTS';

// console.log(time_cliked);




// Send the message using the SMS API
const sms = africastalking.SMS;
sms.send({ to, message})
  .then(response => {
    console.log('Message sent:', response);

    // Save the message data to the database
    connection.query(
      'INSERT INTO messages (contact, message, dispatch_time) VALUES (?, ?, ?)',
      [to, message, dispatch_time],
      (error, results) => {
        if (error) {
          console.log('Error saving message to database:', error);
        } else {
          console.log('Message saved to database');
        }
      }
    );
    
  })
  .catch(error => {
    console.log('Error sending message:', error);
  });



