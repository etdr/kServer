require('dotenv').config()

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')

const userC = require('./controllers/UserC')

const app = new Koa()

app.use(userC.routes()).use(userC.allowedMethods())



app.use(jwt({ secret: process.env.JWT_SECRET }))


const apolloServer = require('./apollo')

apolloServer.applyMiddleware({ app })

// app.use(async (ctx, next) => {
//   if (ctx.path === '/graphql') ctx.disableBodyParser = true;
//   await next();
// });
// app.use(bodyParser());

app.listen(3070, () => {
  console.log(`server listening on 3070; graphql available at /${apolloServer.graphqlPath}`)
})