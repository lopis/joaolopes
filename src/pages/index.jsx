import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Card from '../components/Card'
import ColumnContainer from '../components/ColumnContainer'
import TranslucidBox from '../components/TranslucidBox'
import SubTitle from '../components/typography/SubTitle'

class IndexPage extends React.Component {

  render() {
    const career = this.props.data.career.edges.map(({node}) => ({...node.frontmatter, html: node.html}))
    const articles = this.props.data.articles.edges.map(({node}) => ({...node.frontmatter, html: node.html}))

    return (
      <Layout>
        <TranslucidBox>
          <SubTitle id="articles">Articles</SubTitle>
          <ColumnContainer>
            {articles.map((item, index) => (
              <Link to={item.path} style={{textDecoration: 'none', display: 'flex'}}>
                <Card key={index}
                  img={item.image}
                  title={item.title}
                  footer={<small>
                    Originally publish to <a href={item.original_link}>{item.original_source}</a>
                  </small>}>
                    {(new Date(item.date)).toDateString()}
                    <br/>
                    {item.description}
                </Card>
              </Link>
            ))}
          </ColumnContainer>
        </TranslucidBox>

        <TranslucidBox>
          <SubTitle id="career">Career and Education</SubTitle>
          <ColumnContainer>
            {career.map(item => (
              <Card key={item.path}
                img={item.image}
                title={item.org}
                footer={<Link to={item.path}>Read more</Link>}
              >
                <div>{item.title}</div>
                <small>{item.period}</small>
              </Card>
            ))}
          </ColumnContainer>
        </TranslucidBox>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query {
    career: allMarkdownRemark(
      filter: { collection: { eq: "career" } }
      sort: {fields: [frontmatter___date], order: DESC}
    ){
      edges {
        node {
          frontmatter {
            title
            path
            org
            website
            location
            date
            period
          }
          html
        }
      }
    }
    articles: allMarkdownRemark(
      filter: { collection: { eq: "articles" } }
      sort: {fields: [frontmatter___date], order: DESC}
    ){
      edges {
        node {
          frontmatter {
            title
            date
            original_source
            original_link
            description
            image
            tags
            path
          }
          html
        }
      }
    }
  }
`
