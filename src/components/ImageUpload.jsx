import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  lookupProfile,
  getFile,
  putFile,
} from 'blockstack';


import createLocalStorageDriver from "../services/drivers/localStorageDriver";
// import createLocalStorageDriver from "../services/drivers/blockstackDriver";
import SingleFileService from "../services/SingleFileService";

const storage = createLocalStorageDriver();

const profileService = new SingleFileService({
  type: "image",
  storage
});


export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: this.props.imagePreviewUrl
    };
  }

  async addProfile() {
    const newProfile = this.state.file
    const response = await profileService.putItem( newProfile );
    const item = await profileService.getItem();
    this.setState({ file: item });
  };

  _handleSubmit() {
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);


    putFile('yannis.json', this.state.imagePreviewUrl)
    .then(() => {
      console.log("saved");
    })

  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this._handleSubmit();
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className="previewComponent">
        <div className="imgPreview" style={{backgroundImage: `url(${this.state.imagePreviewUrl})`}}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
        </div>
      </div>
    )
  }

  componentWillMount() {
    getFile('yannis.json')
    .then((file) => {
      this.setState({imagePreviewUrl: file})
    })

  }
}
