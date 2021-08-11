import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import neo4j from 'neo4j-driver'

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
})

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
  { encrypted: false }
)

const tagsAndTagCategoriesCypher = fs.readFileSync(
  path.join(__dirname, 'seed-tags-and-tag-categories.cypher'),
  { encoding: 'utf8' }
)

const execute = (session, statement) =>
  new Promise((resolve, reject) => {
    session.run(statement).subscribe({
      onCompleted: resolve,
      onError: error => reject(error),
    })
  })

const main = async () => {
  var session = driver.session()

  // Delete everything that already exists
  console.info('> Deleting everything in the database')
  await execute(session, 'MATCH (n) DETACH DELETE n')

  // Insert tags and tag categories
  console.info('> Creating tag categories and tags')
  await execute(session, tagsAndTagCategoriesCypher)

  session.close()
}

main()
  .then(() => console.info('> Successfully seeded DB'))
  .catch(console.error)
  .finally(() => driver.close())
