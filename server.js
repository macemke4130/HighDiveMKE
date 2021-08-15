import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema, root } from "./graphql.js";

var app = express();
app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use(express.static('./public'));

app.listen(process.env.PORT || 4000);
console.log("... Bottoms Up ...");