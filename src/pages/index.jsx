import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout/Layout'
import Card, { HorizontalCard } from '../components/layout/Card'
import ColumnContainer from '../components/layout/ColumnContainer'
import TranslucidBox from '../components/layout/TranslucidBox'
import SubTitle from '../components/typography/SubTitle'

function format (object) {
  return object.map(({node}) => ({...node.frontmatter, html: node.html}))
}

class IndexPage extends React.Component {

  render() {
    const career = format(this.props.data.career.edges)
    const posts = format(this.props.data.posts.edges)
    const about = {
      ...this.props.data.about.frontmatter,
      html: this.props.data.about.html
    }
    console.log('about', about);
    

    return (
      <Layout>
        <TranslucidBox>
          <SubTitle id="about">About me</SubTitle>
          <HorizontalCard
            horizontal
            image={about.image && <Img fixed={about.image.childImageSharp.fixed} />}
            title={about.title}>
            {about.bio}
            <br />
            {/* <Link to={about.path}>
              More about me
            </Link> */}
          </HorizontalCard>
        </TranslucidBox>
        <TranslucidBox>
          <SubTitle id="posts">Posts</SubTitle>
          <ColumnContainer>
            {posts.map((item, index) => (
              <Link key={index} to={item.path} style={{textDecoration: 'none', display: 'flex'}}>
                <Card
                  image={item.image && <Img fluid={item.image.childImageSharp.fluid} />}
                  title={item.title}
                  footer={<small>
                    Originally published to {item.original_source}
                  </small>}
                  >
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
            {career.map((item, index) => (
              <Card key={index}
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
    posts: allMarkdownRemark(
      filter: { collection: { eq: "posts" } }
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
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
            path
          }
          html
        }
      }
    }
    about: markdownRemark(frontmatter: { path: { eq: "/about_me" } }) {
      frontmatter {
        title
        path
        github
        linkedin
        twitter
        bio
        image {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
