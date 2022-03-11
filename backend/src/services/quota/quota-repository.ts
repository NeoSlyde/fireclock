import esClient from "../es-Client";

const index = "quota";

const handleElasticsearchError = (error) => {
  if (error.status === 404) {
    throw new Error("quota Not Found");
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

const store = (quota) =>
  esClient
    .index({
      index,
      refresh: "true",
      body: quota,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const deleteQuota = (quota) =>
  esClient
    .index({
      index,
      refresh: "true",
      body: quota,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const getQuota = (quota_id) =>
  esClient
    .search({
      index,
      body: {
        query: {
          match: {
            quota_id: {
              query: quota_id,
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
  getQuota,
  store,
  getAll,
  deleteQuota,
};
