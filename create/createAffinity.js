const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }, options) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpAffinity(filter: { status: { eq: "publish" } }) {
        nodes {
          uri
          status
          id
          databaseId
        }
      }
    }
  `);

  const { nodes } = data.allWpAffinity;

  // const pagesTemplates = (id) => {
  //   switch (id) {
  //     case 'cG9zdDo2Mg==':
  //       return `./src/templates/privacyPage.js`
  //     default:
  //       return `./src/templates/privacyPage.js`
  //   }
  // }
  await Promise.all(
    nodes.map(async (node, i) => {
      await actions.createPage({
        component: resolve("./src/templates/affinityPage.js"),
        path: node.uri,
        context: {
          id: node.id,
        },
      });
    })
  );
};
