import { Parser } from '../Parser.js'
import { Validator } from '../Validator.js'

export async function balance(callback, special, ...keys) {
	const endpoint = '/v5/asset/transfer/query-account-coins-balance'
	// /v5/asset/transfer/query-account-coins-balance  || /v5/account/wallet-balance
	let data = ''
	if (typeof callback !== 'function') {
		data = `accountType=${callback}` // FUND || UNIFIED
	} else {
		data = `accountType=${special}`
	}

	try {
		const response = await Parser(endpoint, 'GET', data, keys, 'Check Balance')
		console.log(JSON.stringify(response.retMsg))
		if (typeof callback === 'function' && response.retMsg === 'success') {
			callback(response)
		} else {
			Validator(response)
		}
	} catch (error) {
		console.error('Ошибка:', error)
	}
}
