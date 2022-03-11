import esClient from "../es-Client";

const index = "done_tasks";

const handleElasticsearchError = (error) => {
  if (error.status === 404) {
    throw new Error("done_tasks Not Found");
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

const store = (doneTasks) =>
  esClient
    .index({
      index,
      refresh: "true",
      body: doneTasks,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const deleteDoneTask = (doneTasks) =>
  esClient
    .index({
      index,
      refresh: "true",
      body: doneTasks,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const getDoneTasks = (doneTasks) =>
  esClient
    .search({
      index,
      body: {
        query: {
          match: {
            userName: {
              query: doneTasks,
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
  getDoneTasks,
  store,
  getAll,
  deleteDoneTask,
};
