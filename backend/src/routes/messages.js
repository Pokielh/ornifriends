const express = require('express')

const router = express.Router()

const Message = require('../models/message')
// const User = require('../models/user')

router.get('/', async (req, res) => {
  res.send(await Message.find({}))
})
router.get('/init', async (req, res) => {
  //
  //    Let's delete any records that might be there first.
  //
  await Message.deleteMany({})

  const message1 = await Message.create({
    message: 'Hello',
    subject: 'Titel',
    sender: 'email ',
    recipent: 'email 1 ',
  })
  console.log(message1)
  message1.subject = 'Anything'
  await message1.save()
  console.log(message1)

  const message2 = await Message.create({
    message: 'Hello',
    subject: 'Titel',
    sender: 'email ',
    recipent: 'email 1 ',
  })
  console.log(message2)
  message2.subject = 'Something else'
  await message2.save()
  console.log(message2)

  res.sendStatus(200)
})

router.get('/id/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await Message.find({ _id: id })
    res.send(user)
  } catch (e) {
    res.send(`Error: ${e.message}`)
  }
})

module.exports = router
