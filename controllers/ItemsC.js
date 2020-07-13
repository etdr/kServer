
const Router = require('@koa/router')
const router = new Router({ prefix: '/i' });



const Lists = require('../models/Lists')
const Items = require('../models/Items')


const h = require('../helpers')


router.get('/:id', async (ctx) => {
  try {

    const item = await Items.findOne({ where: { itemId: ctx.params.id }})

    ctx.body = item

  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})


router.post('/:listId', async (ctx) => {
  try {

    const itemIds = await h.createItems(ctx.request.body.items, ctx.params.listId)



  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})