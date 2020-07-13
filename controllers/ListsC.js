
const Router = require('@koa/router')
const router = new Router({ prefix: '/l' });



const Lists = require('../models/Lists')
const Items = require('../models/Items')


const h = require('../helpers')


// FOR ADMIN PURPOSES
// router.get('/all')

router.get('/', async (ctx) => {
  try {

    console.log(ctx.state.user)

    const lists = await Lists.findAll({ where: { userId: ctx.state.user.id }})


    ctx.body = lists


  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})


router.get('/:id', async (ctx) => {
  try {

    const list = await Lists.findOne({ where: {
      userId: ctx.state.user.id,
      id: ctx.params.id
    }})

    ctx.body = list

  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})


router.post('/', async (ctx) => {
  try {

    const title = ctx.request.body.title

    const list = await Lists.create({
      title,
      userId: ctx.state.user.id,
      items: Buffer([])
    })

    const itemIds = await h.createItems(ctx.request.body.items, list.id)

    await Lists.update({
      items: itemIds
    }, {
      where: { id: list.id }
    })

    ctx.body = await Lists.findOne({ where: { id: list.id }})

  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})


module.exports = router