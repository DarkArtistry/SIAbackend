import { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const flightSchema = new Schema({
  flightName: {
    type: String,
    required: [true, 'flight name is required'],
    minlength: [1, 'Username must be longer than 1 character']
  },
  flightFrom: {
    type: String,
    required: [true, 'flight name is required'],
  },
  flightTo: {
    type: String,
    required: [true, 'flight name is required'],
  },
  flightArrival: {
    type: Number,
  },
  flightDeparture: {
    type: Number,
  },
  passengers: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
})

export default flightSchema
