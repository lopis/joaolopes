import * as React from 'react'
import css from 'styled-components'

import githubIcon from '../../../assets/icon/github.svg'
import linkedinIcon from '../../../assets/icon/linkedin.svg'
import twitterIcon from '../../../assets/icon/twitter.svg'
import downloadIcon from '../../../assets/icon/download.svg'

const icons = {
  github: githubIcon,
  linkedin: linkedinIcon,
  twitter: twitterIcon,
  resume: downloadIcon
}
const Img = css.img`
  height: 40px;
  widht: 40px;
  margin: 0 10px;
`
export default ({link, type}) => {
  return <a href={link} target="_blank" rel="noopener noreferrer">
    <Img src={icons[type]} alt={type}/>
  </a>
}