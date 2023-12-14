const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }, options) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpCategory {
        nodes {
          id
          uri
          name
          databaseId
        }
      }
    }
  `);
  const { nodes } = data.allWpCategory;

  await Promise.all(
    nodes.map(async (node, i) => {
      await actions.createPage({
        component: resolve(`./src/templates/category.js`),
        path: node.uri,
        context: {
          id: node.id,
          uri: node.uri,
          name: node.name,
          databaseId: node.databaseId,
        },
      });
    })
  );
};
