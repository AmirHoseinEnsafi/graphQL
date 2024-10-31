import { ApolloServer } from "apollo-server";
import resolvers from "./GraphQL/resolvers/index.resolvers";
import typeDefs from "./GraphQL/type/index.Type"

const server = new ApolloServer({resolvers , typeDefs})

server.listen({port : 4000}).then(() => console.log(`app listen on port 4000`))