import axios from 'axios';

const instane = axios.create({
	baseURL: process.env.API,
})

instane.interceptors.request.use((config)=>{
	config.headers.Authorization = window.localStorage.getItem('token')
	return config;
})

export default instane
