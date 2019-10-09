import React from 'react'
import { Link } from 'gatsby'
import css from 'styled-components'

const Header = css.div`
  marginBottom: 1.5rem;
  padding: 1.5rem;
  fontSize: 80%;
  display: flex;
  margin: 0 auto;
`
const NavLink = css(Link)`
  text-decoration: none;
  padding: 0.6em;
  color: white;
  line-height: 1;
  transition: background 70ms, color 70ms;
  &:hover {
    background: white;
    color: #b34471;
  }
  @media (min-width: 769px) {
    padding: 1em;
  }
`

const H1 = css.h1`
  font-size: 100%;
`

export default ({ siteTitle }) => (
  <Header>
    <NavLink to="/">
      <H1 style={{ margin: 0 }}>{siteTitle}</H1>
    </NavLink>
    <NavLink to="/#about">about</NavLink>
    <NavLink to="/#posts">posts</NavLink>
    <NavLink to="/#projects">projects</NavLink>
    <NavLink to="/#career">career</NavLink>
  </Header>
)
