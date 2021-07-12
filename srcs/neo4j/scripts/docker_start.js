const path = require('path')
const dotenv = require('dotenv')
const {
  NEO4J_PORT_BROWSER,
  NEO4J_PORT_BOLT,
  NEO4J_VERSION,
  DOCKER_CONTAINER_NAME,
  NEO4J_PASSWORD,
  DATA_PATH,
  LOGS_PATH,
} = require('./constants')
const { exec } = require('./exec')

dotenv.config()

const run = async () => {
  await exec('which', ['docker']).catch(e => {
    console.error(e)
    console.error(new Error('"docker" not found in $PATH'))
    process.exit(1)
  })

  await exec('mkdir', ['-p', DATA_PATH])
  await exec('mkdir', ['-p', LOGS_PATH])

  const oldContainerID = await exec('docker', [
    'ps',
    '-a',
    '--filter',
    `name=${DOCKER_CONTAINER_NAME}`,
    '-q',
  ])

  if (!oldContainerID) {
    console.info('No container from previous run found.. skip clean up')
  } else {
    console.info('Clean up containers from previous run..')
    await exec('docker', ['rm', '-f', oldContainerID])
  }

  console.info('Starting image')

  await exec('bash', [
    path.join(__dirname, 'docker_run.sh'),
    DOCKER_CONTAINER_NAME,
    DATA_PATH,
    LOGS_PATH,
    NEO4J_PASSWORD,
    NEO4J_VERSION,
    NEO4J_PORT_BROWSER,
    NEO4J_PORT_BOLT,
  ])

  console.log('Started')

  const newContainerID = await exec('docker', [
    'ps',
    '-a',
    '--filter',
    `name=${DOCKER_CONTAINER_NAME}`,
    '-q',
  ])

  console.log('')
  console.info('-> SUCCESS <-')
  console.info(`Container running with id '${newContainerID}'`)
  console.info(`[bolt url]: bold://0.0.0.0:${NEO4J_PORT_BOLT}`)
  console.info(`[neo4j browser]: http://0.0.0.0:${NEO4J_PORT_BROWSER}/browser`)
  console.info(`[neo4j user]: neo4j:${NEO4J_PASSWORD}`)
}

run().catch(console.error)
