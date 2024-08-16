import { v4 as uuidv4 } from 'uuid'
import { Parser } from '../Parser.js'
export async function transfer(amount, coin, ...keys) {
	const endpoint = '/v5/asset/transfer/inter-transfer'
	const data = {
		transferId: uuidv4(),
		coin: coin,
		amount: `${amount}`,
		fromAccountType: 'FUND',
		toAccountType: 'UNIFIED',
	}

	await Parser(endpoint, 'POST', data, keys, 'Transfer')
}
