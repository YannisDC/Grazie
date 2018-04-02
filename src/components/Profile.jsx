import React, { Component } from 'react';
import Settings from './Settings.jsx';
import {
  isSignInPending,
  loadUserData,
  Person,
  lookupProfile,
} from 'blockstack';



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
  	  }
  	};
  }



  isLocal() {
    return this.props.match.params.username ? false : true
  }

  render() {
    const { person } = this.state;
    return (
      !isSignInPending() ?
      <div>
        <Settings
          avatarUrl={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
          name={person.name() ? person.name() : 'Nameless Person'}
          username={this.state.username}
          />
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
