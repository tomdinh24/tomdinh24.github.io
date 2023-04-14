import React from 'react';
import './style.scss';
export default class Loader extends React.Component {
  render() {
    return (
      <main className='loader'>
        <div>
          <i className='fas fa-spinner'></i>
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }
}
