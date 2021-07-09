const { cypherQuery, makeAugmentedSchema } = require('neo4j-graphql-js')
const { extractQueryResult } = require('neo4j-graphql-js/dist/utils');

const fs = require('fs')
const path = require('path')

const getTypeDefinitions = () => fs
  .readFileSync(path.join(__dirname, '../src/schema.graphql'))
  .toString("utf-8")

const typeDefs = getTypeDefinitions()

const schema = makeAugmentedSchema({ typeDefs })
console.log(schema);
process.exit()

const result = cypherQuery({}, '', typeDefs)
console.log('result', result)
process.exit()








const dotenv = require('dotenv')
const { exec } = require('./exec')

dotenv.config();

const FILE_NAME = 'import'
const FILE_TYPE = 'csv'
const FILE = `${FILE_NAME}.${FILE_TYPE}`

const run = async () => {
  const cypherShellPath = await exec('which', ['cypher-shell']).catch(e => {
    console.error(e)
    console.error(new Error('"which cypher-shell" does not find a path'))
    process.exit(1)
  })

  const dockerContainerId = await exec('docker', ['ps', '-a', '-q'])
  const pwd = process.cwd()
  const copySpawn = exec('docker', [
    'cp',
    `${pwd}/${FILE}`,
    `${dockerContainerId}:/var/lib/neo4j/import/${FILE}`,
  ]).catch(e => {
    console.error(e)
    process.exit(1)
  })

  const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env
  const exportSpawn = await exec('cypher-shell', [
    '--encryption', 'false',
    '-a',           `${NEO4J_URI}`,
    '-u',           `${NEO4J_USER}`,
    '-p',           `${NEO4J_PASSWORD}`,
    `CALL apoc.export.${FILE_TYPE}.all("${FILE}", {});`,
  ]).catch(e => {
    console.error(e)
    process.exit(1)
  })
}

run()
