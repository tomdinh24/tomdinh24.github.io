import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import './style.scss';

export default class ExpBlock extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.timespan = props.timespan;
    this.summary = props.summary;
    this.stack = props.stack;
    if (props.links) {
      this.links = props.links;
    } else {
      this.links = [];
    }
    this.imgName = props.imgName;
  }

  generateLinkIcons(iconData) {
    if (this.links.length) {
      return this.links.map((link) => {
        if (link.url === '') return <></>;
        return (
          <a
            key={link.name + '-icon'}
            className='link-icon'
            href={link.url}
            aria-label={
              link.name === 'Misc' ? 'See it in action!' : `See on ${link.name}`
            }
            title={link.name === 'Misc' ? 'See it in action!' : link.name}
          >
            <div
              style={{
                maskImage: 'url(' + iconData[link.name].publicURL + ')',
                WebkitMaskImage:
                  'url(' +
                  iconData[link.name].publicURL +
                  '#' +
                  link.name +
                  ')',
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
    return;
  }

  generateStackTags() {
    if (this.stack.length) {
      return this.stack.map((node) => {
        return <span className='stack-tag'>{node}</span>;
      });
    }
    return;
  }

  getExpImage(expImages) {
    let img = expImages.find((node) => node.node.name === this.imgName);

    return img.node.publicURL;
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query ExpBlockQuery {
            allFile(
              filter: {
                extension: { regex: "/(jpg)|(jpeg)|(png)/" }
                relativeDirectory: { eq: "experience" }
              }
            ) {
              edges {
                node {
                  name
                  publicURL
                }
              }
            }
            GitHub: file(base: { eq: "GitHub.svg" }) {
              publicURL
            }
            Youtube: file(base: { eq: "Youtube.svg" }) {
              publicURL
            }
            Misc: file(base: { eq: "Misc.svg" }) {
              publicURL
            }
          }
        `}
        render={(data) => (
          <div className='block exp-block'>
            <img src={this.getExpImage(data.allFile.edges)} alt={this.title} />
            <div className='info'>
              <h2>{this.title}</h2>
              <div className='subtitle'>
                <div className='stack'>{this.generateStackTags()}</div>
              </div>
              <p>{this.summary}</p>
              <div className='social-icons projects'>
                {this.generateLinkIcons(data)}
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}
