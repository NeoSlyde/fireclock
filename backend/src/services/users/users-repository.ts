import esClient from "../es-Client";

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
      size: 10000,
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

const remove = (nickname) =>
  esClient
    .deleteByQuery({
      index,
      refresh: "true",
      body: {
        query: {
          match: {
            nickname: {
              query: nickname,
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

const getUserById = (id) =>
  esClient
    .search({
      index,
      body: {
        query: {
          terms: {
            _id: [id],
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

const getUser = (nickname: any) =>
  esClient
    .search({
      index,
      body: {
        query: {
          match: {
            nickname: {
              query: nickname,
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
  getUser,
  store,
  getAll,
  remove,
  getUserById,
};
