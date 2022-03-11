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

const deleteTask = (task) =>
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

const getTasks = (task_id) =>
  esClient
    .search({
      index,
      body: {
        query: {
          match: {
            task_id: {
              query: task_id,
            },
          },
        },
      },
    })
    .then((response) => {
      response;
    })
    .catch((error) => {
      handleElasticsearchError(error);
    });

export default {
  getTasks,
  store,
  getAll,
  deleteTask,
};
