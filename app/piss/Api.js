import axios from 'axios'; // http requests til backend.

export default () => { // Sender en "Connector", for å "treffe" endpoints
    return axios.create({
       baseURL: 'http://localhost:3000/api/',
    });
};
