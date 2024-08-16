import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { recvWindow, url } from './constant.js'
import getSignature from './GetSignature.js'

export async function Parser(endpoint, method, data, keys, Info) {
	let [apiKey, secretKey, proxy, UA] = keys
	const proxyUrl = `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
	const httpsAgent = new HttpsProxyAgent(proxyUrl)
	const timestamp = Date.now().toString()
	const sign =
		method === 'POST'
			? getSignature(JSON.stringify(data), apiKey, secretKey, timestamp)
			: getSignature(data, apiKey, secretKey, timestamp)

	let fullendpoint = ''

	// Build the request URL based on the method
	if (method === 'POST') {
		fullendpoint = `${url}${endpoint}`
	} else {
		fullendpoint = `${url}${endpoint}?${data}`
		data = ''
	}

	const headers = {
		// 'X-BAPI-SIGN-TYPE': '2',
		'X-BAPI-SIGN': sign,
		'X-BAPI-API-KEY': apiKey,
		'X-BAPI-TIMESTAMP': timestamp,
		'X-BAPI-RECV-WINDOW': recvWindow.toString(),
		'User-Agent': UA,
	}

	if (method === 'POST') {
		headers['Content-Type'] = 'application/json'
	}

	const config = {
		method: method,
		url: fullendpoint,
		headers: headers,
		data: data,
		httpsAgent,
	}

	console.log(Info + ' Calling....')

	try {
		const { data } = await axios(config)
		// console.log(data)
		return data
	} catch (error) {
		if (error.response) {
			console.error('Error fetching wallet balance:', error.response.data)
			console.error('Status code:', error.response.status)
			console.error('Headers:', error.response.headers)
		} else if (error.request) {
			console.error('Error fetching wallet balance: No response received')
			console.error('Request:', error.request)
		} else {
			console.error('Error fetching wallet balance:', error.message)
		}
		console.error('Config:', error.config)
	}
}
