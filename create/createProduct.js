const { resolve } = require(`path`);

module.exports = async ({ actions, graphql }, options) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allWpProduct(filter: { status: { eq: "publish" } }) {
        nodes {
          id
          status
          date
          uri
          template {
            templateName
          }
          products {
            faq {
              slug
            }
          }
        }
      }
    }
  `);

  const productTemplates = (templateName) => {
    console.log("templateName------>", templateName);
    switch (templateName) {
      case "Obamacare Layout":
        return `./src/templates/obamacareLayout.js`;
      case "Discount Layout":
        return `./src/templates/discountLayout.js`;
      case "Accident Insurance Layout":
        return `./src/templates/accidentInsuranceLayout.js`;
      case "Product Layout":
        return `./src/templates/product.js`;
      case "Medicare Layout":
        return `./src/templates/medicareLayout.js`;
      case "Product Pet Insurance Layout":
        return `./src/templates/petInsuranceLayout.js`;
      default:
        return `./src/templates/product.js`;
    }
  };
  const { nodes } = data.allWpProduct;

  await Promise.all(
    nodes.map(async (node, i) => {
      await actions.createPage({
        component: resolve(productTemplates(node.template.templateName)),
        path: node.uri,
        context: {
          id: node.id,
          faqCat: node?.products?.faq?.slug || "gap-health-insurance",
        },
      });
    })
  );
};
