const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpTerm(filter: { status: { eq: "publish" } }) {
        edges {
          node {
            title
            uri
            id
            content
            excerpt
            status
          }
          next {
            id
            title
            uri
          }
          previous {
            id
            title
            uri
          }
        }
      }
    }
  `);

  const { edges } = data.allWpTerm;
  await Promise.all(
    edges.map(async (edge, i) => {
      await actions.createPage({
        component: resolve("./src/templates/glossaryPost.js"),
        path: edge.node.uri,
        context: {
          id: edge.node.id,
          prev: edge?.next,
          next: edge?.previous,
        },
      });
    })
  );
};
