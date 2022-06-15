const express = require('express')

const router = express.Router()

const Message = require('../models/message')
// const User = require('../models/user')

router.get('/', async (req, res) => {
  res.send(await Message.find({}))
})
