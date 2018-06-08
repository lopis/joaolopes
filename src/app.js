const url = 'https://raw.githubusercontent.com/lopis/joaolopes/bio/bio.json?2'
const sections = [
  'personal',
  'bio',
  'education',
  'tongues',
  'jobs',
  'preferences',
]

class Application extends React.Component {
  constructor () {
    super()

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
        const renderer = this.rendererMap[key]
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

  rendererMap = {
    'string': data => <p>{data}</p>,
    'website': data => <a href={data}>{data}</a>,
    'object': this.renderObject,
    'undefined': data => '',
    'period': data => <p>{`${data[0]} - ${data[1]}`}</p>,
    'education': this.renderEducation,
    'jobs': this.renderEducation,
  }

  renderSectionBody = (data, section) => {
    const type = typeof data
    const renderer = this.rendererMap[section]
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

  render() {
    return this.renderSections();
  }
}

/*
 * Render the above component into the div#app
 */
ReactDOM.render(<Application />, document.getElementById('app'));
