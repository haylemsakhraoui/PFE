const express =require('express');
const { graphqlHTTP }=require('express-graphql');
const schema =require('./schema/schema');
const mongoose =require('mongoose');
const {USER_NAME,DB_NAME,DB_PASSWORD,PORT}=require('./config')


const app = express();



mongoose.connect(`mongodb+srv://VOSHS:VOSHS1999@fooddelivcluster.erdv9.mongodb.net/FoodDelivCluster?retryWrites=true&w=majority`)

mongoose.connection.once('open',() => {
console.log('connected to database')
})

app.use('/graphql',graphqlHTTP({
 schema,
 graphiql:true
}))

app.listen(4000,() => {
    console.log('server is running on port 4000')
});

