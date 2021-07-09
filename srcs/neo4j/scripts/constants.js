const path = require('path')

module.exports.NEO4J_PORT_BROWSER = '7474'
module.exports.NEO4J_PORT_BOLT = '7687'
module.exports.NEO4J_VERSION = 'latest'
module.exports.DOCKER_CONTAINER_NAME = 'zettelkasten-neo4j'
module.exports.NEO4J_PASSWORD = 'letmein'
module.exports.DATA_PATH = path.join(__dirname, '../docker/data')
module.exports.LOGS_PATH = path.join(__dirname, '../docker/logs')
