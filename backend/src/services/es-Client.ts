import elasticsearch from "elasticsearch";

const esClient = new elasticsearch.Client({
  host: "http://localhost:9200",
  log: "trace",
});

export default esClient;
