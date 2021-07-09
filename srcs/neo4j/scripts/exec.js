const spawn = require('cross-spawn')

module.exports.exec = async (cmd, args, options, { log } = {}) => {
  log && console.log('$', `"${[cmd, ...(args || [])].join(' ')}"`)

  const result = spawn.sync(cmd, args, options)

  if (result.error) {
    throw exportSpawn.error
    process.exit(1)
  }

  const exportErr = result.stderr && result.stderr.toString('utf8').trim()
  if (exportErr) {
    throw new Error(exportErr)
  }

  if (!result.stdout) {
    log && console.log('> no output')
    return Promise.resolve()
  }

  log && console.log('>', result.stdout.toString('utf8').trim())
  return result.stdout.toString('utf8').trim()
}
