const url = 'bio.json'
const sections = [
  'c.v.',
  'bio',
  'tongues',
  'interests',
  'jobs',
  'education',
]

class Application extends React.Component {
  constructor () {
    super()

    console.log('Hello, thank you for checking my CV.')
    console.log('This page was written in ReactJS.')
    console.log('It is parsing a JSON formatted file to show you this information.')

    this.state = {
      data: {
        loading: true
      }
    }
  }

  componentDidMount () {
    fetch(url)
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.setState({
        data: data,
        loading: false
      })
    })
  }

  renderObject = (data = {}, section = '') => {
    return <ul>
      {Object.keys(data).map(key => {
        const renderer = this.rendererMap[key.toLowerCase()]
          || this.rendererMap[typeof data[key]]

        return <li key={key + section}>
          <div>
            {!Array.isArray(data) && (<label>{key}</label>)}
            {renderer(data[key])}
          </div>
        </li>
      })}
    </ul>
  }

  renderEducation = (data) => {
    return data.map(({designation, ...rest}) => {
      return (
        <div>
          <h3>{designation}</h3>
          {this.renderObject(rest)}
        </div>
      )
    })
  }

  renderTags = (data) => {
    return <ul>
      {
        data.map(skill => {
          return <li className="skill">{skill}</li>
        })
      }
    </ul>
  }

  renderLink = (link, label) => <a href={link}>{label || link}</a>

  renderLinks = data => {
    return Object.keys(data).map((key) => this.renderLink(data[key], key))
  }

  rendererMap = {
    'string': data => <p>{data}</p>,
    'website': this.renderLink,
    'github': this.renderLink,
    'object': this.renderObject,
    'undefined': data => '',
    'period': data => <p>{`${data[0]} - ${data[1]}`}</p>,
    'education': this.renderEducation,
    'jobs': this.renderEducation,
    'skills': this.renderTags,
    'interests': this.renderTags,
    'pages': this.renderLinks,
  }

  renderSectionBody = (data, section) => {
    const type = typeof data
    const renderer = this.rendererMap[section.toLowerCase()]
      || this.rendererMap[type]
    return renderer(data, section)
  }

  renderSections = () => {
    return sections.map(s => {
      if(this.state.data[s]) {
        return (
          <section key={s} className="section">
            <h2>{s}</h2>
            {this.renderSectionBody(this.state.data[s], s)}
          </section>
        )
      }
    })
  }

  renderButtons = () => {
    return <div class="buttons">
      <button className="printMe" title="Print Me" onClick={window.print}>🖨️</button>
      <a className="printMe" title="My CV" href="dist/joao_lopes_frontend.pdf" >️📄</a>
    </div>
  }

  render() {
    return <div>
      {this.renderSections()}
      {this.renderButtons()}
    </div>
  }
}

/*
 * Render the above component into the div#app
 */
ReactDOM.render(<Application />, document.getElementById('app'));
