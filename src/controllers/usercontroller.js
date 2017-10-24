'use strict'
import User from '../models/userModel'

export async function create(req, res) {
  User.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    birthmonth: req.body.birthmonth,
    birthyear: req.body.birthyear,
    isadmin: req.body.isadmin,
    password: req.body.password,
    localCountryCode: req.body.localCountryCode,
    phone: req.body.phone,
    overseasCountryCode: req.body.overseasCountryCode,
    overseasPhone: req.body.overseasPhone,
    facebook: req.body.facebook,
    line: req.body.line,
  }, function (err, createdUser) {
    if (err) {
      console.log('An error occurred: ' + err)
      res.status(401).json({ error: 'invalid fields'})
    } else {
      res.status(200).json(createdUser)
    }
  })
}
