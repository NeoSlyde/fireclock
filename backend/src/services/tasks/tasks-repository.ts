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

const updateChildren = (task_id, newChildren) => {
  console.log(newChildren);
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
          source: "ctx._source.children = params.newChildren",
          params: {
            newChildren,
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
    ._updateById({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [task_id],
          },
          match: {
            quota: {
              query: newQuota,
            },
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
    ._updateById({
      index,
      refresh: "true",
      body: {
        query: {
          terms: {
            _id: [task_id],
          },
          match: {
            quotaInterval: {
              query: newQuotaInterval,
            },
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
  updateChildren,
};
