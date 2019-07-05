import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Card from '../components/Card'

class IndexPage extends React.Component {

  render() {
    const carreer = this.props.data.carreer.edges.map(({node}) => ({...node.frontmatter, html: node.html}))

    return (
      <Layout>
        <h2>Carreer and Education</h2>
        <div>
          {carreer.map(item => (
            <Link to={item.path}>
              <Card key={`${item.path}`}>
                <div dangerouslySetInnerHTML={{ __html: item.html }} />
              </Card>
            </Link>
          ))}
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query {
    carreer: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            path
            org
            website
            location
            date
          }
          html
        }
      }
    }
  }
`
