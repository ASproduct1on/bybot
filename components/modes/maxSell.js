import { balance } from './balance.js'
import { order } from './order.js'
import { transfer } from './transfer.js'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getRandomDelay = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
export async function maxSell(coin, ...keys) {
	function getTransferAmount(response, coin) {
		const balanceInfo = response.result.balance.find(b => b.coin === coin)
		// console.log('amount', balanceInfo ? balanceInfo.transferBalance : null)
		return balanceInfo ? balanceInfo.transferBalance : null
	}
	try {
		const randomDelay = getRandomDelay(1500, 3500) // range: 1.5 to 3.5 seconds
		const balanceResult = await new Promise(fund => {
			balance(fund, 'FUND', ...keys)
		})
		const amount = await getTransferAmount(balanceResult, coin)

		await delay(randomDelay)
		await transfer(amount, coin, 'fromFund', ...keys)
		await delay(randomDelay)

		await order(amount, coin, 'Sell', ...keys)
	} catch (error) {
		console.error('Ошибка:', error)
	}
}
