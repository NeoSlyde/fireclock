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
      size: 10_000,
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

const storeInTaskChildren = (task_id, child) => {
  esClient
    .updateByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [task_id],
          },
        },
        script: {
          source: "ctx._source.children = params.child",
          params: {
            child,
          },
        },
      },
    })
    .then((response) => {
      return response;
    });
};

const remove = (task) => {
  const { taskId } = task;
  return esClient
    .deleteByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [task],
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
};

const getTasks = (user_id) =>
  esClient
    .search({
      index,
      size: 10_000,
      body: {
        query: {
          match: {
            user_id: {
              query: user_id,
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

const getTask = (task_id) =>
  esClient
    .search({
      index,
      body: {
        query: {
          terms: {
            _id: [task_id],
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

const updateName = (task_id, newName) => {
  esClient
    .updateByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [task_id],
          },
        },
        script: {
          source: "ctx._source.name = params.newName",
          params: {
            newName,
          },
        },
      },
    })
    .then((response) => {
      return response;
    });
};

const updateQuota = (task_id, newQuota) => {
  esClient
    .updateByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [task_id],
          },
        },
        script: {
          source: "ctx._source.quota = params.newQuota",
          params: {
            newQuota,
          },
        },
      },
    })
    .then((response) => {
      return response;
    });
};

const updateQuotaInterval = (task_id, newQuotaInterval) => {
  esClient
    .updateByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [task_id],
          },
        },
        script: {
          source: "ctx._source.quotaInterval = params.newQuotaInterval",
          params: {
            newQuotaInterval,
          },
        },
      },
    })
    .then((response) => {
      return response;
    });
};

export default {
  getTasks,
  getTask,
  store,
  getAll,
  remove,
  updateName,
  updateQuota,
  updateQuotaInterval,
  storeInTaskChildren,
};
