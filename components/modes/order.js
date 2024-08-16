import crypto from 'crypto'
import { Parser } from '../Parser.js'

export async function order(amount, coin, side, ...keys) {
	console.log(`amount ${side} `, `${amount}`)

	console.log('coin ', `${coin}USDT`)
	const orderLinkId = crypto.randomBytes(16).toString('hex')
	const endpoint = '/v5/order/create'
	const data = {
		category: 'spot',
		symbol: `${coin}USDT`,
		isLeverage: 0,
		side: side,
		orderType: 'Market',
		qty: `${amount}`,
		price: '1000',
		triggerPrice: null,
		triggerDirection: null,
		triggerBy: null,
		orderFilter: null,
		orderIv: null,
		timeInForce: 'GTC',
		positionIdx: 0,
		orderLinkId: `${orderLinkId}`,
		takeProfit: null,
		stopLoss: null,
		tpTriggerBy: null,
		slTriggerBy: null,
		reduceOnly: false,
		closeOnTrigger: false,
		smpType: null,
		mmp: null,
		tpslMode: null,
		tpLimitPrice: null,
		slLimitPrice: null,
		tpOrderType: null,
		slOrderType: null,
	}
	await Parser(endpoint, 'POST', data, keys, `${side}`)
}