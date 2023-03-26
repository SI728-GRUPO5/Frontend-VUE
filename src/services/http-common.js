import axios from 'axios'

export default axios.create({
    // const API_URL = 'https://localhost:5001/api'
    // 'https://offirent.azurewebsites.net/api'
    baseURL: 'https://api-e404.herokuapp.com/api',
    headers: {
        'Content-type': 'application/json',
    }
});
