const Cars = require('./cars-model')
const vinValidator = require('vin-validator')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  const car = await Cars.getById(req.params.id)
  if (!car) {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` })
  } else {
    req.car = car
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if (!vin) return res.status(400).json({ message: 'vin is missing' })
  if (!make) return res.status(400).json({ message: 'make is missing' })
  if (!model) return res.status(400).json({ message: 'model is missing' })
  if (!mileage && mileage !== 0) return res.status(400).json({ message: 'mileage is missing' })
  next()
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  if (!vinValidator.validate(vin)) {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const existing = await db('cars').where('vin', req.body.vin).first()
  if (existing) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}