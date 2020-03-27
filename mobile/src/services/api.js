import axios from 'axios';

// If you want to test on your own phone, get his IP
// You can find it on the page with opened by running 'npm start' in the terminal
const api = axios.create({
	baseURL: 'http://localhost:2999'
});

export default api;
