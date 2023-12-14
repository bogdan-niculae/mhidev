const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }, options) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpFaq(filter: { status: { eq: "publish" } }) {
        nodes {
          uri
          id
        }
      }
    }
  `);

  const { nodes } = data.allWpFaq;

  await Promise.all(
    nodes.map(async (node, i) => {
      await actions.createPage({
        component: resolve("./src/templates/faqPost.js"),
        path: node.uri,
        context: {
          id: node.id,
        },
      });
    })
  );
};
