import JsonApi from 'devour-client';

const RootPath = document.querySelector('meta[name="host"]').content;
const ApiClient = new JsonApi({ apiURL: RootPath })

ApiClient.define('storage', {
  name: '',
  slots: {
    jsonApi: 'hasMany',
    type: 'slot',
  }
})

ApiClient.define('slot', {
  startTime: '',
  endTime: '',
  storageId: '',
  storage: {
    jsonApi: 'hasOne',
    type: 'storage'
  }
})

export default ApiClient;