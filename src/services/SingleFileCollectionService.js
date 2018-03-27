import shortid from "shortid";
import moment from "moment";

export default class SingleFileCollectionService {
  constructor(config) {
    this.type = config.type;
    this.storage = config.storage;
  }

  async getItem() {
    try {
      const result = await this.storage.getItem(this.type);
      return result || {};
    } catch (e) {
      console.error(e);
    }
  }

  async createItem(item) {
    const id = shortid.generate();

    const newItem = {
      ...item,
      id,
      updated: moment().format("X"),
      created: moment().format("X")
    };

    try {
      const items = await this.storage.getItem(this.type);
      const newItems = { ...items, [id]: newItem };
      await this.storage.setItem(this.type, newItems);
      return newItems;
    } catch (e) {
      return console.error(e);
    }
  }

  async updateItem(item) {
    item = { ...item, updated: moment().format("X") };
    try {
      const items = await this.storage.getItem(this.type);
      const updatedItems = { ...items, [item.id]: item };
      await this.storage.setItem(this.type, updatedItems);
      return updatedItems;
    } catch (e) {
      return console.error(e);
    }
  }

  async deleteItem(id) {
    try {
      const items = await this.storage.getItem(this.type);
      const updatedItems = { ...items };
      delete updatedItems[id];
      await this.storage.setItem(this.type, updatedItems);
      return updatedItems;
    } catch (e) {
      return console.error(e);
    }
  }
}
