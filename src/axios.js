import axios from 'axios';

const instane = axios.create({
	baseURL: "https://blog-server-06mi.onrender.com"
})

instane.interceptors.request.use((config)=>{
	config.headers.Authorization = window.localStorage.getItem('token')
	return config;
})

export default instane
