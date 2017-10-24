import flightSchema from '../schemas/userSchema'
import mongoose from 'mongoose'

const Flight = mongoose.model('flight', flightSchema)
export default Flight
