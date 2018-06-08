function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const url = 'https://raw.githubusercontent.com/lopis/joaolopes/master/bio.json';
const sections = ['personal', 'bio', 'education', 'tongues', 'jobs', 'preferences'];

class Application extends React.Component {
  constructor() {
    super();

    this.renderObject = (data = {}, section = '') => {
      return React.createElement(
        'ul',
        null,
        Object.keys(data).map(key => {
          const renderer = this.rendererMap[key] || this.rendererMap[typeof data[key]];

          return React.createElement(
            'li',
            { key: key + section },
            React.createElement(
              'div',
              null,
              !Array.isArray(data) && React.createElement(
                'label',
                null,
                key
              ),
              renderer(data[key])
            )
          );
        })
      );
    };

    this.renderEducation = data => {
      return data.map((_ref) => {
        let { designation } = _ref,
            rest = _objectWithoutProperties(_ref, ['designation']);

        return React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            null,
            designation
          ),
          this.renderObject(rest)
        );
      });
    };

    this.rendererMap = {
      'string': data => React.createElement(
        'p',
        null,
        data
      ),
      'website': data => React.createElement(
        'a',
        { href: data },
        data
      ),
      'object': this.renderObject,
      'undefined': data => '',
      'period': data => React.createElement(
        'p',
        null,
        `${data[0]} - ${data[1]}`
      ),
      'education': this.renderEducation,
      'jobs': this.renderEducation
    };

    this.renderSectionBody = (data, section) => {
      const type = typeof data;
      const renderer = this.rendererMap[section] || this.rendererMap[type];
      return renderer(data, section);
    };

    this.renderSections = () => {
      return sections.map(s => {
        if (this.state.data[s]) {
          return React.createElement(
            'section',
            { key: s, className: 'section' },
            React.createElement(
              'h2',
              null,
              s
            ),
            this.renderSectionBody(this.state.data[s], s)
          );
        }
      });
    };

    this.state = {
      data: {
        loading: true
      }
    };
  }

  componentDidMount() {
    fetch(url).then(data => {
      return data.json();
    }).then(data => {
      this.setState({
        data: data,
        loading: false
      });
    });
  }

  render() {
    return this.renderSections();
  }
}

/*
 * Render the above component into the div#app
 */
ReactDOM.render(React.createElement(Application, null), document.getElementById('app'));