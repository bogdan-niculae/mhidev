const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }, options) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpPage(
        filter: { isPostsPage: { eq: false }, status: { eq: "publish" } }
      ) {
        nodes {
          uri
          status
          id
          date
          isFrontPage
        }
      }
    }
  `);

  const { nodes } = data.allWpPage;

  const pagesTemplates = (id, uri) => {
    if (uri === "/shop-and-enroll-in-aca/") {
      return `./src/templates/shop-and-enroll-in-aca.js`;
    }
    switch (id) {
      case "cG9zdDo2Mg==":
        return `./src/templates/privacyPage.js`;
      case "cG9zdDo4OA==":
        return `./src/templates/aboutUsPage.js`;
      case "cG9zdDo3MA==":
        return `./src/templates/contactUsPage.js`;
      case "cG9zdDoyMDU5Mw==":
        return `./src/templates/healthAdvisorPage.js`;
      case "cG9zdDo4Mg==":
        return `./src/templates/glossaryPage.js`;
      case "cG9zdDoyMzMwMw==":
        return `./src/templates/search.js`;
      case "cG9zdDoyMzMzMw==":
        return `./src/templates/findYourAgentPage.js`;
      case "cG9zdDoyMzM5NQ==":
        return `./src/templates/localHealthInsuranceOption.js`;
      case "cG9zdDoyMzM5OQ==":
        return `./src/templates/obamacareCalculator.js`;
      case "cG9zdDoyMzQxNw==":
        return `./src/templates/faqPage.js`;
      case "cG9zdDo5Nw==":
        return `./src/templates/site-map.js`;
      // case "cG9zdDoyMzc3Mw==":
      //   return `./src/templates/newsRoom.js`;
      default:
        return `./src/templates/privacyPage.js`;
    }
  };
  await Promise.all(
    nodes.map(async (node, i) => {
      await actions.createPage({
        component: node.isFrontPage
          ? resolve("./src/templates/frontPage.js")
          : resolve(pagesTemplates(node.id, node.uri)),
        path: node.uri,
        context: {
          id: node.id,
        },
      });
    })
  );
};
