//
//////////////////////
// PLEASE TAKE NOTE:
//////////////////////
//
// Since this is an online example, we're using
// localStorageDriver instead of this Blockstack driver.
// This is just here so you can play with the services
// in CodeSandbox
//

export default function createLocalStorageDriver() {
  return {
    getItem: key => {
      return JSON.parse(localStorage.getItem(key));
    },
    setItem: (key, value) => {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: key => {
      return localStorage.removeItem(key);
    }
  };
}
