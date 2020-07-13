require('dotenv').config()

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')

const app = new Koa()


const seq = require('./db')
seq.sync();

// const client = require('./db')

app.use(async (ctx, next) => {
      if (ctx.path === '/graphql') ctx.disableBodyParser = true;
      await next();
    });
app.use(bodyParser());

// 
// let userC, apolloServer



// console.log('connected to mongo')
// console.log('client.db("k"):', client.db('k'))
// db = client.db('k')
let userC = require('./controllers/UserC')
app.use(userC.routes()).use(userC.allowedMethods())

app.use(jwt({ secret: process.env.JWT_SECRET }))

let listsC = require('./controllers/ListsC')
app.use(listsC.routes()).use(listsC.allowedMethods())


// let apolloServer = require('./apollo')

// apolloServer.applyMiddleware({ app })



app.listen(3070, () => {
  // console.log(`server listening on 3070; graphql available at ${apolloServer.graphqlPath}`)
  console.log(`server listening on 3070`)
})

// 



