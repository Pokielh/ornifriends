const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Photo = require('../models/photo')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  if (req.query.email) {
    query.email = req.query.email
  }

  res.send(await User.find(query))
})

router.delete('/', async (req, res) => {
  console.log('hello from aux')

  await User.deleteMany({})
  res.send()
})
router.delete('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  console.log(user)
  await User.deleteOne(req.params.userId)
  res.send()
})

/* POST create a user */
router.post('/', async (req, res) => {
  const createdUser = await User.create(req.body)
  res.send(createdUser)
})

router.get('/initialize', async (req, res) => {
  const mihri = await User.create({ name: 'mihri', age: 35, email: `mihri@example.com` })
  const armagan = await User.create({ name: 'armagan', age: 36, email: `armagan@example.com` })

  const steve = await User.create({ name: 'steve', age: 21, email: `steve@example.com` })

  mihri.setPassword('test')
  armagan.setPassword('test')
  steve.setPassword('test')

  steve.bio = 'An awesome hacker who has seen it all, and now sharing them all with you.'

  const berlinPhoto = await Photo.create({ filename: 'berlin.jpg' })
  const munichPhoto = await Photo.create({ filename: 'munich.jpg' })

  await steve.addPhoto(berlinPhoto)
  await steve.addPhoto(munichPhoto)

  await armagan.likePhoto(berlinPhoto)
  await mihri.likePhoto(berlinPhoto)

  res.sendStatus(200)
})

router.post('/:userId/adds', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.addPhoto(photo)
  res.sendStatus(200)
})

router.post('/:userId/likes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.likePhoto(photo)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

router.get('/:userId/json', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

module.exports = router
