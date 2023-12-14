import { graphql } from "gatsby";

export const fragments = graphql`
  fragment HeroImage on File {
    childImageSharp {
      # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
      gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920)
    }
  }

  fragment HeroImageMobile on File {
    childImageSharp {
      gatsbyImageData(layout: FIXED, quality: 90, height: 450)
    }
  }

  fragment HeroImagePageMobile on File {
    childImageSharp {
      # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
      gatsbyImageData(
        layout: CONSTRAINED
        quality: 90
        aspectRatio: 1.5
        transformOptions: { cropFocus: ENTROPY }
      )
    }
  }

  fragment ProductHeroImage on File {
    childImageSharp {
      # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
      gatsbyImageData(layout: FIXED, quality: 90, height: 440, width: 1920)
    }
  }

  fragment ProductHeroMobileImage on File {
    childImageSharp {
      # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
      gatsbyImageData(height: 350, layout: FULL_WIDTH)
    }
  }

  # fragment BoxImage on File {
  #   altText
  #   localFile {
  #     childImageSharp {
  #       gatsbyImageData(width: 610, layout: CONSTRAINED)
  #     }
  #   }
  # }
  # fragment Icon on File {
  #   altText
  #   localFile {
  #     childImageSharp {
  #       gatsbyImageData(height: 45, layout: CONSTRAINED)
  #     }
  #   }
  # }
  fragment AvatarImage on File {
    childImageSharp {
      gatsbyImageData(layout: FIXED, width: 60, height: 60, quality: 90)
    }
  }

  fragment Thumbnail on File {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH, quality: 90, aspectRatio: 2.6)
    }
  }

  fragment PostPreviewContent on WpPost {
    uri
    title
    databaseId
    excerpt
    date(formatString: "LL")
    featuredImage {
      node {
        altText
        localFile {
          ...Thumbnail
        }
      }
    }
    author {
      node {
        name
        firstName
        lastName
        uri
      }
    }
    categories {
      nodes {
        name
        slug
        uri
      }
    }
  }

  fragment PostContent on WpPost {
    title
    uri
    content
    showauthor
    date(formatString: "LL")
    excerpt
    seo {
      metaDesc
      title
      canonical
      readingTime
    }
    featuredImage {
      node {
        altText
        localFile {
          ...HeroImage
          publicURL
        }
        mediaDetails {
          width
          height
        }
      }
    }
    author {
      node {
        name
        firstName
        lastName
        uri
        description
        avatar {
          url
          width
          height
          imageFile {
            ...AvatarImage
          }
        }
      }
    }
    categories {
      nodes {
        name
        slug
        uri
      }
    }
    seo {
      title
      metaDesc
      focuskw
      metaKeywords
      opengraphTitle
      opengraphDescription
      opengraphImage {
        altText
        sourceUrl
        srcSet
      }
      twitterTitle
      twitterDescription
      twitterImage {
        altText
        sourceUrl
        srcSet
      }
      canonical
      cornerstone
      schema {
        articleType
        pageType
        raw
      }
    }
  }

  fragment PageContent on WpPage {
    title
    uri
    content
    databaseId
    featuredImage {
      node {
        altText
        localFile {
          ...HeroImage
          publicURL
        }
        mediaDetails {
          width
          height
        }
      }
    }
    mobileFeaturedImage {
      mobileFeaturedImage {
        altText
        localFile {
          publicURL
          ...ProductHeroMobileImage
        }
      }
    }
    seo {
      title
      metaDesc
      focuskw
      metaKeywords

      opengraphTitle
      opengraphDescription
      opengraphImage {
        altText
        sourceUrl
        srcSet
      }
      twitterTitle
      twitterDescription
      twitterImage {
        altText
        sourceUrl
        srcSet
      }
      canonical
      cornerstone
      schema {
        articleType
        pageType
        raw
      }
    }
  }

  # fragment AccidentProducts on WpProduct {
  #   accidentProducts {
  #     combineWithOtherPlansContent
  #     combineWithOtherPlansTitle
  #     cons
  #     covers
  #     disclaimer
  #     coversTitle
  #     doesNotCover
  #     doesNotCoversTitle
  #     heroContent
  #     productDescription
  #     productName
  #     productTitle
  #     pros
  #     prosAndConsText
  #     prosAndConsTitle
  #     shortProductDescription
  #     whyThisProductBoxOneTitle
  #     whyThisProductBoxThreeTitle
  #     whyThisProductBoxTwoTitle
  #     whyThisProductSectionTitle
  #     combineWithOtherPlansImage {
  #       ...BoxImage
  #     }
  #     consImage {
  #       ...BoxImage
  #     }
  #     prosImage {
  #       ...BoxImage
  #     }
  #     whatProductCoversImage {
  #       ...BoxImage
  #     }
  #     productIcon {
  #       ...Icon
  #     }
  #     whyThisProductBoxOneIcon {
  #       ...Icon
  #     }
  #     whyThisProductBoxTwoIcon {
  #       ...Icon
  #     }
  #     whyThisProductBoxThreeIcon {
  #       ...Icon
  #     }
  #     relatedProducts {
  #       ... on WpProduct {
  #         id
  #         uri
  #         products {
  #           shortProductDescription
  #           productName
  #           productIcon {
  #             altText
  #             localFile {
  #               childImageSharp {
  #                 gatsbyImageData(height: 45, layout: CONSTRAINED)
  #               }
  #             }
  #           }
  #         }
  #       }
  #     }
  #     productResources {
  #       ...PostPreviewContent
  #     }
  #   }
  # }

  fragment ProductContent on WpProduct {
    uri
    title
    slug
    hideFormOnProductPage {
      showCtaForm
    }
    seo {
      title
      metaDesc
      focuskw
      metaKeywords

      opengraphTitle
      opengraphDescription
      opengraphImage {
        altText
        sourceUrl
        srcSet
      }
      twitterTitle
      twitterDescription
      twitterImage {
        altText
        sourceUrl
        srcSet
      }
      canonical
      cornerstone
      schema {
        articleType
        pageType
        raw
      }
    }
    featuredImage {
      node {
        altText
        localFile {
          ...ProductHeroImage
          publicURL
        }
        mediaDetails {
          width
          height
        }
      }
    }
    mobileFeaturedImage {
      mobileFeaturedImage {
        altText
        localFile {
          publicURL
          ...ProductHeroMobileImage
        }
      }
    }
    products {
      cons
      covers
      coversTitle
      disclaimer
      doesNotCover
      doesNotCoversTitle
      heroContent
      productDescription
      productName
      productResources {
        ...PostPreviewContent
      }
      productTitle
      pros
      prosAndConsText
      prosAndConsTitle
      relatedProducts {
        ... on WpProduct {
          id
          uri
          products {
            shortProductDescription
            productName
            productIcon {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(height: 45, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
      whatProductCoversImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
          }
        }
      }
      productIcon {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(height: 45, layout: CONSTRAINED)
          }
        }
      }
      prosImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
          }
        }
      }
      consImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
          }
        }
      }
      faq {
        fAQs {
          nodes {
            content
            title
            uri
            date(locale: "")
          }
        }
      }
    }
  }
`;
