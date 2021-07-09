DOCKER_CONTAINER_NAME=$1
DATA_PATH=$2
LOGS_PATH=$3
NEO4J_PASSWORD=$4
NEO4J_VERSION=$5
NEO4J_PORT_BROWSER=$6
NEO4J_PORT_BOLT=$7

docker run \
  -d \
  --name $DOCKER_CONTAINER_NAME \
  --publish $NEO4J_PORT_BROWSER:$NEO4J_PORT_BROWSER \
  --publish $NEO4J_PORT_BOLT:$NEO4J_PORT_BOLT \
  --volume=$DATA_PATH:/data \
  --volume=$LOGS_PATH:/logs \
  --user="$(id -u)":"$(id -g)" \
  --env NEO4J_AUTH="neo4j/$NEO4J_PASSWORD" \
  --env NEO4J_apoc_export_file_enabled=true \
  --env NEO4J_apoc_import_file_enabled=true \
  --env NEO4J_apoc_import_file_use__neo4j__config=true \
  --env NEO4JLABS_PLUGINS=\[\"apoc\"\] \
  neo4j:$NEO4J_VERSION
