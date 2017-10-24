'use strict'
import Flight from '../models/flightModel'

export async function create(req, res) {
  Flight.create({
    flightName: req.body.flightName,
    flightFrom: req.body.flightFrom,
    flightTo: req.body.flightTo,
    flightArrival: req.body.flightArrival,
    flightDeparture: req.body.flightDeparture,
  }, function (err, createdFlight) {
    if (err) {
      console.log('An error occurred: ' + err)
      res.status(401).json({ error: 'invalid fields'})
    } else {
      res.status(200).json(createdFlight)
    }
  })
}

export async function get(req, res) {
  let flight = Flight.find({flightName: req.body.flightName})[0]
  if(!flight) {
    res.status(401).json({ error: 'no such flight' })
  } else {
    res.status(200).json(flight)
  }
}
