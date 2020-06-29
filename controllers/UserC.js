
const router = require('@koa/router').Router({ prefix: '/user' });
const argon2 = require('argon2').argon2id

const { db } = require('../db')

const coll = db.collection('users')

router.post('/signup', async (ctx, next) => {

})


router.post('/login', async (ctx, next) => {

})



module.exports = router