function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const url = 'bio.json';
const sections = ['c.v.', 'bio', 'education', 'tongues', 'jobs', 'interests'];

class Application extends React.Component {
  constructor() {
    super();

    this.renderObject = (data = {}, section = '') => {
      return React.createElement(
        'ul',
        null,
        Object.keys(data).map(key => {
          const renderer = this.rendererMap[key.toLowerCase()] || this.rendererMap[typeof data[key]];

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

    this.renderTags = data => {
      return React.createElement(
        'ul',
        null,
        data.map(skill => {
          return React.createElement(
            'li',
            { className: 'skill' },
            skill
          );
        })
      );
    };

    this.renderLink = data => React.createElement(
      'a',
      { href: data },
      data
    );

    this.rendererMap = {
      'string': data => React.createElement(
        'p',
        null,
        data
      ),
      'website': this.renderLink,
      'github': this.renderLink,
      'object': this.renderObject,
      'undefined': data => '',
      'period': data => React.createElement(
        'p',
        null,
        `${data[0]} - ${data[1]}`
      ),
      'education': this.renderEducation,
      'jobs': this.renderEducation,
      'skills': this.renderTags,
      'interests': this.renderTags
    };

    this.renderSectionBody = (data, section) => {
      const type = typeof data;
      const renderer = this.rendererMap[section.toLowerCase()] || this.rendererMap[type];
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

    this.renderPrinter = () => {
      return React.createElement(
        'button',
        { className: 'printMe', title: 'Print Me', onClick: window.print },
        '\uD83D\uDDA8\uFE0F'
      );
    };

    console.log('Hello, thank you for checking my CV.');
    console.log('This page was written in ReactJS.');
    console.log('It is parsing a JSON formatted file to show you this information.');

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
    return React.createElement(
      'div',
      null,
      this.renderSections(),
      this.renderPrinter()
    );
  }
}

/*
 * Render the above component into the div#app
 */
ReactDOM.render(React.createElement(Application, null), document.getElementById('app'));