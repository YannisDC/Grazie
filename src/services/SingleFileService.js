import moment from "moment";

export default class SingleFileService {
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

  async putItem(item) {

    const newItem = {
      ...item,
      updated: moment().format("X")
    };

    try {
      await this.storage.setItem(this.type, newItem);
      return newItem;
    } catch (e) {
      return console.error(e);
    }
  }

  async deleteItem() {
    try {
      const item = await this.storage.getItem(this.type);
      await this.storage.setItem(this.type, {});
      return {};
    } catch (e) {
      return console.error(e);
    }
  }
}
