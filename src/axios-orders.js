import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-2bd7e.firebaseio.com/'

})

export default instance;