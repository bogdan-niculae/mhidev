const createPages = require("./create/createPages");
const createAffinity = require("./create/createAffinity");
const createPost = require("./create/createPost");
const createAllPost = require("./create/createAllPost");
const createBlog = require("./create/createBlog");
const createProduct = require("./create/createProduct");
const createGlossaryPost = require("./create/createGlossaryPost");
const createFaq = require("./create/createFaqPost");
const createAgent = require("./create/createAgent");
const createCategory = require("./create/createCategories");
exports.createPages = async (props) => {
  const { data: wpSettings } = await props.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `);

  const perPage = wpSettings.wp.readingSettings.postsPerPage || 10;
  const blogURI = "/blog";
  await createPages(props);
  await createAffinity(props);
  await createPost(props);
  // await createAffinity(props);
  if (process.env.GATSBY_STAGE === "staging") {
    await createAllPost(props);
  } else {
    await createPost(props);
  }

  await createProduct(props);
  await createBlog(props, { perPage, blogURI });
  await createGlossaryPost(props);
  await createFaq(props);
  await createAgent(props);
  await createCategory(props);
};

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// We do this, because the Avatar doesn't get handled as a File from the gatsby-source plugin yet. This might change in the future.
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;

  await createResolvers({
    WpAvatar: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.url;

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};
