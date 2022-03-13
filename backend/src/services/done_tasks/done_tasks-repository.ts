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
      size: 10_000,
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

const remove = (doneTaskId) =>
  esClient
    .deleteByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [doneTaskId],
          },
        },
      },
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const getDoneTasksOfTask = (taskId) =>
  esClient
    .search({
      index,
      size: 10_000,
      body: {
        query: {
          match: {
            taskId: {
              query: taskId,
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

const updateDuration = (taskId, newDuration) => {
  esClient
    .updateByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [taskId],
          },
        },
        script: {
          source: "ctx._source.duration = params.newDuration",
          params: {
            newDuration,
          },
        },
      },
    })
    .then((response) => {
      return response;
    });
};

const updateCreated = (taskId, newCreated) => {
  esClient
    .updateByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [taskId],
          },
        },
        script: {
          source: "ctx._source.created = params.newCreated",
          params: {
            newCreated,
          },
        },
      },
    })
    .then((response) => {
      return response;
    });
};
export default {
  store,
  getAll,
  remove,
  updateCreated,
  updateDuration,
  getDoneTasksOfTask,
};
