import { balance } from './balance.js'
import { order } from './order.js'
import { transfer } from './transfer.js'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getRandomDelay = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
export async function maxSell(coin, ...keys) {
	function getTransferAmount(response, coin = 'USDT') {
		const balanceInfo = response.result.balance.find(b => b.coin === coin)
		// console.log('amount', balanceInfo ? balanceInfo.transferBalance : null)
		const amount = balanceInfo ? balanceInfo.transferBalance : null

		return amount
	}
	try {
		const randomDelay = getRandomDelay(1000, 5000) // range: 1 to 5 seconds
		const balanceResult = await new Promise(resolve => {
			balance(resolve, ...keys)
		})
		const amount = await getTransferAmount(balanceResult, coin)
		const amountSell = Math.floor(+amount * 100000) / 100000

		await delay(randomDelay)
		await transfer(amount, coin, ...keys)
		await delay(randomDelay)

		await order(amountSell, coin, 'Sell', ...keys)
	} catch (error) {
		console.error('Ошибка:', error)
	}
}
