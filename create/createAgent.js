const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }, options) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpAgent(filter: { status: { eq: "publish" } }) {
        nodes {
          uri
          id
        }
      }
    }
  `);

  const { nodes } = data.allWpAgent;

  await Promise.all(
    nodes.map(async (node, i) => {
      await actions.createPage({
        component: resolve("./src/templates/agentTemplate.js"),
        path: node.uri,
        context: {
          id: node.id,
        },
      });
    })
  );
};
