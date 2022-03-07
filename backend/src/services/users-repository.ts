import esClient from "./es-Client";

const index = "users";

const handleElasticsearchError = (error) => {
  if (error.status === 404) {
    throw new Error("User Not Found");
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

const store = (user) =>
  esClient
    .index({
      index,
      refresh: "true",
      body: user,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const getUser = (userName) =>
  esClient
    .search({
      index,
      body: {
        query: {
          match: {
            userName: {
              query: userName,
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
  getUser,
  store,
  getAll,
};
