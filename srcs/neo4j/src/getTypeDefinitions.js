import fs from 'fs'
import path from 'path'

const readFile = path => fs.readFileSync(path, { encoding: 'utf8' })
const PATH_SCHEMA_TYPES = path.join(__dirname, 'schema', 'types.graphql')
const PATH_SCHEMA_MUTATIONS = path.join(__dirname, 'schema', 'mutations.graphql')
const PATH_SCHEMA_QUERIES = path.join(__dirname, 'schema', 'queries.graphql')

export const getTypeDefinitions = () => {
  const types = readFile(PATH_SCHEMA_TYPES)
  const mutations = readFile(PATH_SCHEMA_MUTATIONS)
  const queries = readFile(PATH_SCHEMA_QUERIES)

  return `
    ${types}
    ${queries}
    ${mutations}
  `
}
