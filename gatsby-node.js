/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const careerTemplate = path.resolve(`src/templates/career.js`)
  const postsTemplate = path.resolve(`src/templates/posts.js`)

  return graphql(`
    {
      career: allMarkdownRemark(filter: { collection: { eq: "career" } }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      posts: allMarkdownRemark(filter: { collection: { eq: "posts" } }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.posts.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postsTemplate,
      })
    })
    result.data.career.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: careerTemplate,
      })
    })
  })
}

exports.onCreateNode =({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === 'MarkdownRemark') {
      const { createNodeField } = boundActionCreators;
      node.collection = getNode(node.parent).sourceInstanceName;
  }
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    // devtool: 'cheap-module-source-map',
  })
}
