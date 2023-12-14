const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }, options) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpPost {
        nodes {
          uri
          status
          id
          date
        }
      }
    }
  `);

  const { nodes } = data.allWpPost;

  await Promise.all(
    nodes.map(async (node, i) => {
      await actions.createPage({
        component: resolve("./src/templates/post.js"),
        path: node.uri,
        context: {
          id: node.id,
        },
      });
    })
  );
};
