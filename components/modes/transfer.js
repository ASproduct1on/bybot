import { v4 as uuidv4 } from 'uuid'
import { Parser } from '../Parser.js'
export async function transfer(amount, coin, type, ...keys) {
	let from, to

	if (type === 'toFund') {
		from = 'UNIFIED'
		to = 'FUND'
	} else {
		from = 'FUND'
		to = 'UNIFIED'
	}

	const endpoint = '/v5/asset/transfer/inter-transfer'
	const data = {
		transferId: uuidv4(),
		coin: coin,
		amount: `${amount}`,
		fromAccountType: from, //FUND
		toAccountType: to, //UNIFIED
	}

	await Parser(endpoint, 'POST', data, keys, 'Transfer')
}
