import * as React from 'react'
import css from 'styled-components'

const Card = css.div`
  background: white;
  position: relative;
  color: #777;
  box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 4px 2px -2px rgba(0,0,0,0.12);
  border-radius: 1px;
  margin: 10px;
  border-left: 10px solid #cf546e;
  display: flex;
  flex-direction: column;
  a > & {
    width: 100%;
    top: 0;
    transition: box-shadow 100ms ease-in-out, top 100ms ease-in-out;
  }
  @media (min-width: 769px) {
    a:hover > & {
      top: -3px;
      box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.1), 0px 6px 8px 0px rgba(0,0,0,0.07), 0px 8px 4px -4px rgba(0,0,0,0.06);
    }
  }
  @media (max-width: 768px) {
    margin: 10px 0 0 0;
  }
`

const CardHorizontal = css(Card)`
  padding-right: 35px;
  @media (min-width: 769px) {
    padding-right: 200px;
  }
`

const Title = css.h3`
  margin: 30px;
  margin-bottom: 0;
  min-height: 2em;
  line-height: 1em;
`

const Body = css.div`
  flex-grow: 1;
  margin: 30px;
`

const Footer = css.div`
  margin: 30px;
  margin-top: 0;
  text-align: right;
`

const ImageWrapper = css.div`
  overflow: hidden;
  max-height: 150px;
`

const CircleSize = 150
const ImageCircleWrapper = css.div`
  overflow: hidden;
  height: ${CircleSize}px;
  width: ${CircleSize}px;
  border-radius: 100px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 30px;
  margin-top: -${CircleSize / 2}px;
  @media (max-width: 768px) {
    border-radius: 0 0 0 100px;
    top 0;
    height: 120px;
    width: 120px;
    margin: 0;
    float: right;
  }
`

export default ({ title, footer, image, children }) => {
  return (
    <Card>
      <ImageWrapper>{image}</ImageWrapper>
      {title && <Title>{title}</Title>}
      <Body>{children}</Body>
      {footer && <Footer>{footer}</Footer>}
    </Card>
  )
}

const HorizontalCard = ({ title, footer, image, children }) => {
  return (
    <CardHorizontal>
      <ImageCircleWrapper>{image}</ImageCircleWrapper>
      {title && <Title>{title}</Title>}
      <Body>{children}</Body>
      {footer && <Footer>{footer}</Footer>}
    </CardHorizontal>
  )
}
export { HorizontalCard }
