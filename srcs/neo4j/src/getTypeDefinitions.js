import fs from 'fs'
import path from 'path'

const readFile = path => fs.readFileSync(path, { encoding: 'utf8' })
const PATH_SCHEMA = path.join(__dirname, 'schema.graphql')

export const getTypeDefinitions = () => {
  return readFile(PATH_SCHEMA)

  // const types = readFile(typesPath)
  // const query = readFile(queryPath)
  // const mutation = readFile(mutationPath)
  //
  // return `
  //   ${types}
  //   ${query}
  //   ${mutation}
  // `
}
