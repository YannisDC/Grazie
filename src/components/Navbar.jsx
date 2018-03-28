import React, { Component } from 'react';
import { isUserSignedIn } from 'blockstack';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handleSignIn = this.props.handleSignIn;
    const handleSignOut = this.props.handleSignOut;

    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Grazie</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                { !isUserSignedIn() ?
                  <button
                    className="btn btn-primary btn-lg"
                    id="signin-button"
                    onClick={ handleSignIn.bind(this) }
                  >
                    Sign In with Blockstack
                  </button>
                  :
                  <button
                    className="btn btn-primary btn-lg"
                    id="signout-button"
                    onClick={ handleSignOut.bind(this) }
                  >
                    Logout
                  </button>
                }

                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}
