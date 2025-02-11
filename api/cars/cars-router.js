const router = require('express').Router()
const Cars = require('./cars-model')
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware')

router.get('/', async (req, res) => {
  const cars = await Cars.getAll()
  res.json(cars)
})

router.get('/:id', checkCarId, (req, res) => {
  res.json(req.car)
})

router.post('/', 
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res) => {
    const car = await Cars.create(req.body)
    res.status(201).json(car)
})

module.exports = router