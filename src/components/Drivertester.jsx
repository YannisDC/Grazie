import React, { Component, Link } from 'react';

// import createLocalStorageDriver from "../services/drivers/localStorageDriver";
import createLocalStorageDriver from "../services/drivers/blockstackDriver";
import MultiFileCollectionService from "../services/MultiFileCollectionService";
import SingleFileCollectionService from "../services/SingleFileCollectionService";
import SingleFileService from "../services/SingleFileService";

const storage = createLocalStorageDriver();

const multiFile = new MultiFileCollectionService({
  type: "multi-file-items",
  storage
});

const singleFile = new SingleFileCollectionService({
  type: "single-file-items",
  storage
});

const profile = new SingleFileService({
  type: "profile",
  storage
});

export default class Drivertester extends Component {
  constructor(props) {
    super(props);
    this.addProfile = this.addProfile.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.addItemSingle = this.addItemSingle.bind(this);
    this.addItemMulti = this.addItemMulti.bind(this);
    this.state = {
      singleFileItems: [],
      multiFileItems: [],
      profile: {
        title: ""
      }
    };
  }

  async addProfile() {
    const newProfile = this.state.profile
    const response = await profile.putItem( newProfile );
    const item = await profile.getItem();
    this.setState({
      profile: item
    });
  };

  async deleteProfile() {
    const response = await profile.deleteItem();
    this.setState({
      profile: {
        title: ""
      }
    });
  };

  async addItemSingle() {
    const response = await singleFile.createItem({
      title: "Single File Item"
    });
    const items = await singleFile.getItem();
    this.setState({
      singleFileItems: Object.keys(items).map(key => items[key])
    });
  };

  async updateItemSingle(id) {
    const response = await singleFile.updateItem({
      id,
      title: "Updated Single File Item"
    });
    const items = await singleFile.getItem();
    this.setState({
      singleFileItems: Object.keys(items).map(key => items[key])
    });
  };

  async deleteItemSingle(id) {
    const response = await singleFile.deleteItem(id);
    const items = await singleFile.getItem();
    this.setState({
      singleFileItems: Object.keys(items).map(key => items[key])
    });
  };

  async addItemMulti() {
    const response = await multiFile.createItem({
      title: "Multi File Item"
    });
    const items = await multiFile.getItems();
    this.setState({ multiFileItems: items });
  };

  async updateItemMulti(id){
    const response = await multiFile.updateItem({
      id,
      title: "Updated Multi File Item"
    });
    const items = await multiFile.getItems();
    this.setState({ multiFileItems: items });
  };

  async deleteItemMulti(id) {
    const response = await multiFile.deleteItem(id);
    const items = await multiFile.getItems();
    this.setState({ multiFileItems: items });
  };

  render() {
    return (
      <div>
        <div style={{ padding: "20px" }}>
          <h1>Blockstack Storage Demonstration</h1>
          <p>
            This sandbox shows two ways to organize your collection data.{" "}
            <a href="https://www.blockstack.org" target="_blank">
              For more information, visit the tutorial.
            </a>
          </p>

          <p>
            NOTE: for the sandbox, we're interacting with localstorage instead
            of Blockstack via a swappable driver. The Blockstack driver is
            included in the codebase as well. You can view localstorage data in
            browser developer tools. If you're using Chrome, just go to the
            developer tools by pressing F12, then go to the Application tab. In
            the Storage section expand Local Storage. After that, you'll see all
            your browser's local storage there.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ padding: "20px", flex: "0 0 33%" }}>
            <h4>Multi File Collection</h4>
            <button onClick={this.addItemMulti}>Add MultiFile Item</button>
            <ul>
              {this.state.multiFileItems.map(item => (
                <li key={item.id}>
                  {item.title} - {item.id}&nbsp;
                  <button onClick={() => this.updateItemMulti(item.id)}>
                    Edit
                  </button>
                  <button onClick={() => this.deleteItemMulti(item.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: "20px", flex: "0 0 33%" }}>
            <h4>Single File Collection</h4>
            <button onClick={this.addItemSingle}>Add SingleFile Item</button>
            <ul>
              {this.state.singleFileItems.map(item => (
                <li key={item.id}>
                  {item.title} - {item.id}&nbsp;
                  <button onClick={() => this.updateItemSingle(item.id)}>
                    Edit
                  </button>
                  <button onClick={() => this.deleteItemSingle(item.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: "20px", flex: "0 0 33%" }}>
            <h4>Single File</h4>
            <button onClick={this.addProfile}>Add Profile</button>
            <p>
              {this.state.profile.title}
              <button onClick={() => this.addProfile()}>
                Edit
              </button>
              <button onClick={() => this.deleteProfile()}>
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const multiFileItems = await multiFile.getItems();
    const singleFileItems = await singleFile.getItem();
    const profileItem = await profile.getItem();
    this.setState({
      multiFileItems,
      singleFileItems: Object.keys(singleFileItems).map(
        key => singleFileItems[key]
      )
    });
    if (Object.keys(profileItem).length === 0 && profileItem.constructor === Object) {
      //do nothing
    } else {
      this.setState({
        profile: profileItem
      });
    }
  }
}
