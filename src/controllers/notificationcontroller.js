'use strict'
import Flight from '../models/flightModel'
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});
// Twilio Credentials
const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const authToken = 'your_auth_token';

//require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

export async function send(req, res) {
  let targetFlight = Flight.find({flightName: flightName}).populate({
    populate: {
      path: 'passengers',
      model: 'User',
    }
  })
  let targetMessage = req.body.message
  targetFlight.passengers.forEach((passenger) => {
    sendIndividual(passenger, targetMessage)
  })
}

async function sendIndividual(Passenger, Message) {
  let mailOptions = {
    from: 'youremail@gmail.com',
    to: Passenger.email,
    subject: 'Sending Email using Node.js',
    text: Message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  client.messages.create({
      to: `+${Passenger.localCountryCode + Passenger.phone}`,
      from: "+twilionumber",
      body: `${Message}`,
  }, function(err, message) {
      console.log(message.sid);
  });
}
