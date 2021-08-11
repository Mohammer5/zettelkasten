import path from 'path'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { json } from 'express'
import neo4j from 'neo4j-driver'
import { getTypeDefinitions } from './getTypeDefinitions'

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
})

const typeDefs = getTypeDefinitions()

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
  { encrypted: false }
)

const neoSchema = new Neo4jGraphQL({ typeDefs, driver })
const server = new ApolloServer({
  schema: neoSchema.schema,
  introspection: true,
  playground: true,
  context: ({ req }) => ({ req }),
})

const PORT = process.env.GRAPHQL_LISTEN_PORT || 4001
const PATH = '/graphql'
const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(json({ limit: '500mb' }))
server.applyMiddleware({ app, path: PATH })

app.listen({ port: PORT, path: PATH }, () =>
  console.log(`GraphQL server ready at http://localhost:${PORT}${PATH}`)
)
