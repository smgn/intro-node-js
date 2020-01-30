const express = require('express')
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')
const users = require('./users')
const app = express()

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.get('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  // should ge user by given id in route param
  try{

    const user = await users.findUser(id)
    res.status(200).send(user)
  } catch (e){
    res.status(404).send(e.message);
  }
})

app.delete('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try{
    const deletedUsers = await users.deleteUser(id)
    res.status(201).send(deletedUsers)
  } catch (e){
    res.status(404).send(e.message);
  }
})

module.exports = app
