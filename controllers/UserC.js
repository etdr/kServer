
const Router = require('@koa/router')
const router = new Router({ prefix: '/user' });

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

// const client = require('../db')

// const db = client.db('k')

// const coll = db.collection('users')

// const db = require('../db')
// console.log(db)

const Users = require('../models/Users')


router.post('/signup', async (ctx) => {
  try {
    const pwhash = await argon2.hash(ctx.request.body.password, { type: argon2.argon2id })
    const user = await Users.create({
      username: ctx.request.body.username,
      password: pwhash
    })

    console.log('user created')

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "14d" })

    console.log('sending response')

    ctx.body = {
      user,
      token
    }

  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})


router.post('/login', async (ctx, next) => {
  try {

    const user = await Users.findOne({ username: ctx.request.body.username })

    if (user) {

      const matches = await argon2.verify(user.password, ctx.request.body.password)

      if (matches) {
      
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "14d" })
        ctx.body = {
          user,
          token
        }

      } else {
        ctx.status = 502
        ctx.body = { error: 'password mismatch' }
      }

    } else {
      ctx.status = 500
      ctx.body = { error: 'no user found' }
    }


  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})



module.exports = router