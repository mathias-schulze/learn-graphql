const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./server/schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 4000

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@${process.env.mongoURL}/?retryWrites=true&w=majority&appName=${process.env.mongoDatabase}`,
  {useNewUrlParser: true, useUnifiedTopology: true}
).then( () => {
    app.listen({port: port}, () => {
        console.log('Listening for requests on ' + port);
    })
}).catch((e) => console.log("Error: " + e))
