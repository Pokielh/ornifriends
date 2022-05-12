const mongoose = require('mongoose')

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE

mongoose.set('debug', true)

mongoose
  .connect(`mongodb+srv://${username}:${password}@cluster0.pa63v.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('connection established'))
  // eslint-disable-next-line no-console
  .catch(console.log)
