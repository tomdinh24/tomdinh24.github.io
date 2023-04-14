import React from 'react';
import NavBar from '../NavBar/NavBar';
import ExpBlock from '../ExpBlock/ExpBlock';
import Socials from '../Socials/Socials';
import { StaticQuery, graphql } from 'gatsby';
import './style.scss';
import Blob from '../../images/blob.svg';

const workData = require('../../data/work.json');
const projectsData = require('../../data/projects.json');
export default class App extends React.Component {
  getWorkBlocks() {
    return workData.map((node) => {
      return (
        <ExpBlock
          key={node.company}
          title={node.company}
          timespan={node.timespan}
          summary={node.summary}
          stack={node.stack}
          links={node.links}
          imgName={node.imgName}
        />
      );
    });
  }

  getProjectBlocks() {
    return projectsData.map((node) => {
      return (
        <ExpBlock
          key={node.title}
          title={node.title}
          timespan={node.timespan}
          summary={node.summary}
          stack={node.stack}
          links={node.links}
          imgName={node.imgName}
        />
      );
    });
  }

  componentDidMount() {
    const blobSections = [
      {
        section: document.getElementById('projects'),
        show: false,
        msg: "If you have a cool project opportunity, Tom would love to hear about it!",
      },
      {
        section: document.getElementById('work'),
        show: false,
        msg: "Tom is currently seeking out Summer 2023 internship opportunities!",
      },
    ];
    window.addEventListener(
      'scroll',
      () => {
        if (this.blob && this.blobMsg) {
          let showBlob = false;
          blobSections.forEach((sec) => {
            sec.show = this.showSectionBlob(sec.section);
            if (sec.show) {
              if (!showBlob) showBlob = true;
              if (this.blobMsg.innerHTML !== sec.msg)
                this.blobMsg.innerHTML = sec.msg;
            }
          });
          if (showBlob && !this.blob.classList.contains('visible-blob')) {
            this.blob.classList.add('visible-blob');
          } else if (
            !showBlob &&
            this.blob.classList.contains('visible-blob')
          ) {
            this.blob.classList.remove('visible-blob');
          }
        }
      },
      true
    );
  }
  showSectionBlob(section) {
    const top = section.getBoundingClientRect().top;
    const height = section.clientHeight;
    return top >= -1 * (height / 2) && top <= 0;
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query AppQuery {
            lightModeMe: file(base: { eq: "lightModeMe.jpeg" }) {
              publicURL
            }
            darkModeMe: file(base: { eq: "darkModeMe.jpeg" }) {
              publicURL
            }
            blob: file(base: { eq: "blob.svg" }) {
              publicURL
            }
          }
        `}
        render={(data) => (
          <>
            <main>
              <NavBar>{this.props.children}</NavBar>
              
              <section aria-label='Home' id='home'>
                <header>
                  <h1> Hi, I'm Tom!</h1>
                  <p>
                      &#10024; I like to put my unique spin on 
                      every problem I solve.
                  </p>
                </header>
                <img
                  src={
                    this.props.theme === 'dark'
                      ? data.darkModeMe.publicURL
                      : data.lightModeMe.publicURL
                  }
                  alt='Isabella Enriquez'
                  id='profile-pic'
                />
              </section>
              
              <section id='about-me' aria-label='About Me'>
                <header>
                  <h1>About Me</h1>
                </header>
                <div id='summary'>
                  <p>Pronouns: He/Him</p>
                  <p>&#128187; Started coding in 11th grade as I took my first
                      programming class "Intro to Java". I didn't like it at first
                      but I eventually find value in the endless opportunities programming can provide.
                  </p>
                  <p>
                      &#128218;Sophmore Computer Science Student at De Anza College
                  </p>
                  <p>
                      &#128084;Professional Interest: I would like explore AI/ML and Full Stack projects that target
                      Climate Change/Sustainability, Healthcare, and Education.
                  </p>
                  <p>
                      &#10024;(un)professional interests: Gym, Music, Rave, and Travel
                  </p>

              </div>
              </section>

              <section
                id='work'
                aria-label='Work'
                ref={(section) => (this.workSection = section)}
              >
                <header>
                  <h1>Work</h1>
                </header>
                <p>&#128640; My professional adventures thus far.</p>
                <div className='block-grid'>{this.getWorkBlocks()}</div>
              </section>
              
              <section id='projects' aria-label='Projects'>
                <header>
                  <h1>Projects</h1>
                </header>
                <p>
                  &#128296; Innovating with code and design. Below are select
                  projects, check out more on my{' '}
                  <a href='https://github.com/tomdinh24'>GitHub</a>!
                </p>
                <div className='block-grid'>{this.getProjectBlocks()}</div>
              </section>
              <div
                id='popup-blob'
                className='blob-friend'
                ref={(blob) => (this.blob = blob)}
              >
                <Blob />
                <span
                  className='blob-message'
                  ref={(span) => (this.blobMsg = span)}
                />
              </div>
            </main>
            <footer id='footer'>
              <h2>Aw, leaving already? Stay in touch :)</h2>
              <Socials />
              <div id='footer-blob' className='blob-friend'>
                <Blob />
                <span className='blob-message'>Thank You for visiting!!</span>
              </div>
            </footer>
          </>
        )}
      />
    );
  }
}
