const dotenv = require('dotenv')
const { DOCKER_CONTAINER_NAME } = require('./constants')
const { exec } = require('./exec')

dotenv.config()

const run = async () => {
  await exec('which', ['docker']).catch(e => {
    console.error(e)
    console.error(new Error('"docker" does not find a path'))
    process.exit(1)
  })

  const oldContainerID = await exec('docker', [
    'ps',
    '-a',
    '--filter',
    `name=${DOCKER_CONTAINER_NAME}`,
    '-q',
  ])

  if (oldContainerID) {
    console.info('Clean up containers from previous run..')
    await exec('docker', ['rm', '-f', oldContainerID])

    console.log('')
    console.info('-> SUCCESS <-')
    console.log(`Stopped container with name "${DOCKER_CONTAINER_NAME}"`)
  } else {
    console.info('No container from previous run found..')
  }
}

run().catch(console.error)
