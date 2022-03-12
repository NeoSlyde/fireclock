import esClient from "../es-Client";

const index = "tasks";

const handleElasticsearchError = (error) => {
  if (error.status === 404) {
    throw new Error("Task Not Found");
  }
  throw new Error(error.msg, error.status || 500);
};

const getAll = () =>
  esClient
    .search({
      index,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const store = (task) =>
  esClient
    .index({
      index,
      refresh: "true",
      body: task,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const remove = (task) =>
  esClient
    .index({
      index,
      refresh: "true",
      body: task,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const getTasks = (id) =>
  esClient
    .search({
      index,
      body: {
        query: {
          match: {
            id: {
              query: id,
            },
          },
        },
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      handleElasticsearchError(error);
    });

export default {
  getTasks,
  store,
  getAll,
  remove,
};
