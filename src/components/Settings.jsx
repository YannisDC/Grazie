import React, { Component } from 'react';
import ImageUpload from './ImageUpload.jsx';

// import createLocalStorageDriver from "../services/drivers/localStorageDriver";
import createLocalStorageDriver from "../services/drivers/blockstackDriver";
import SingleFileService from "../services/SingleFileService";

var storage = createLocalStorageDriver({ defaultOptions: {username: "decleene.id"}});

var profileService = new SingleFileService({
  type: "profile",
  storage
});

export default class Settings extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  about: "",
      thanks: "",
      name: ""
  	};

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async addProfile() {
    const newProfile = this.state
    const response = await profileService.putItem( newProfile );
    const item = await profileService.getItem();
    this.setState( item );
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  render() {
    return (
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img src={ this.props.avatarUrl } className="img-circle avatar" id="avatar-image" />
        </div>
        <h1>Hello, <span id="heading-name">{ this.props.name }</span>!</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="settings">
                <form className="form-horizontal">
                  <div className="form-group">
                    <div className="col-sm-5">
                      <label>Name</label>
                    </div>
                    <div className="col-sm-7">
                      <input
                        className="form-control"
                        name="name"
                        value={ this.state.name }
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-5">
                      <label>What are your creations about?</label>
                    </div>
                    <div className="col-sm-7">
                      <input
                        className="form-control"
                        name="about"
                        value={ this.state.about }
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-5">
                      <label>Write a little message to thank your supporters.</label>
                    </div>
                    <div className="col-sm-7">
                      <textarea
                        className="form-control"
                        rows="3"
                        name="thanks"
                        value={this.state.thanks}
                        onChange={this.handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="settings">
                <form className="form-horizontal">
                  <div className="form-group">
                    <div className="col-sm-5">
                      <label htmlFor="profilePicture">Profile Picture</label>
                      <p>Your profile picture that will appear in messages, lists, and search</p>
                    </div>
                    <div className="col-sm-7">
                      <ImageUpload imagePreviewUrl={ this.props.avatarUrl } />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-5">
                      <label htmlFor="coverImage">Cover Image</label>
                    </div>
                    <div className="col-sm-7">
                      <input type="file" id="coverImage"/>
                    </div>
                  </div>
                </form>
              </div>


            </div>
            <div className="col-md-4">
              <div className="settings-save">
              <button
                className="btn btn-primary btn-lg"
                id="save-button"
                onClick={() => this.addProfile()}
              >
                Save Changes
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    console.log(this.props.username);
  }

  async componentDidMount() {
    const profileItem = await profileService.getItem();

    if (Object.keys(profileItem).length === 0 && profileItem.constructor === Object) {
      //do nothing
    } else {
      this.setState(profileItem);
    }
  }
}
