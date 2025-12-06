import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:8081',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		'Access-Control-Expose-Headers': '*',
	},
});
