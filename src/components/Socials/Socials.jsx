import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import './style.scss';

export default class Socials extends React.Component {
  constructor(props) {
    super(props);

    this.socialIcons = [
      {
        name: 'Email',
        url: 'mailto:tomdinh0811@gmail.com',
      },
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/tom-lam-bba704188/',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/tomdinh24',
      },
    ];
  }

  generateSocialIcons(iconData) {
    return this.socialIcons.map((icon) => {
      return (
        <a
          key={icon.name + '-icon'}
          className='nav-icon'
          href={icon.url}
          aria-label={`Tom Lam's ${icon.name}`}
          title={icon.name}
        >
          <div
            style={{
              maskImage: 'url(' + iconData[icon.name].publicURL + ')',
              WebkitMaskImage:
                'url(' + iconData[icon.name].publicURL + '#' + icon.name + ')',
              width: 'auto',
              height: '100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          ></div>
        </a>
      );
    });
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SocialsQuery {
            GitHub: file(base: { eq: "GitHub.svg" }) {
              publicURL
            }
            Linkedin: file(base: { eq: "Linkedin.svg" }) {
              publicURL
            }
            Email: file(base: { eq: "Email.svg" }) {
              publicURL
            }
          }
        `}
        render={(data) => (
          <div
            className={`social-icons ${
              this.props.children ? `show-toggle` : ``
            }`}
          >
            <label className='toggle'>{this.props.children}</label>
            {this.generateSocialIcons(data)}
          </div>
        )}
      />
    );
  }
}
