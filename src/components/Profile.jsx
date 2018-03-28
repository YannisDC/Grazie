import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  lookupProfile,
} from 'blockstack';
import Drivertester from './Drivertester.jsx';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
      username: ""
  	};
  }

  isLocal() {
    return this.props.match.params.username ? false : true
  }

  render() {
    const { person } = this.state;
    return (
      !isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-circle avatar" id="avatar-image" />
        </div>
        <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
        <p className="lead">

        </p>
        <Drivertester />
      </div> : null
    );
  }

  componentWillMount() {
    if (this.isLocal()) {
      this.setState({
        person: new Person(loadUserData().profile),
        username: loadUserData().username
      });
    } else {
      const username = this.props.match.params.username

      lookupProfile(username)
        .then((profile) => {
          this.setState({
            person: new Person(profile),
            username: username
          })
        })
        .catch((error) => {
          console.log('could not resolve profile')
        })
    }

  }
}
