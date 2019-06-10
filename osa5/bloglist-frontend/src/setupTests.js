let savedItems = {
  username: 'testi',
  token: '999999',
  name: 'Testaaja'
}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock