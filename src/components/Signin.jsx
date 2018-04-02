import React, { Component } from 'react';
import { isUserSignedIn } from 'blockstack';

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="sections">
        <div className="panel-landing" id="section-1">
          <h1>Grazie</h1>
          <h3>The decentralized artist support platform</h3>
          <br/>
          <p className="lead">
            <button
              className="btn btn-primary btn-lg"
              id="signin-button"
              onClick={ handleSignIn.bind(this) }
            >
              Sign In with Blockstack
            </button>
          </p>
        </div>
        <div className="panel-landing" id="section-2">
        </div>
      </div>
    );
  }
}
