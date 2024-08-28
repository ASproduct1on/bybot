import { balance } from './balance.js'
import { order } from './order.js'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
export async function umpaLumpa(coin, ...keys) {
	function getTransferAmount(response, coin = 'USDT') {
		const balanceInfo = response.result.balance.find(b => b.coin === coin)
		// console.log('amount', balanceInfo ? balanceInfo.transferBalance : null)
		const amount = balanceInfo ? balanceInfo.transferBalance : null

		return amount
	}
	try {
		const randomDelay = getRandom(1000, 3000) // range: 1 to 5 seconds
		const randomBuy = getRandom(55, 65)

		await order(randomBuy, coin, 'Buy', ...keys)
		await delay(randomDelay)

		const balanceResult = await new Promise(function unifiedCallback(resolve) {
			balance(resolve, 'UNIFIED', ...keys)
		})
		console.log('UID:', balanceResult.result.memberId)
		const amount = await getTransferAmount(balanceResult, coin)

		await delay(randomDelay)
		await order(amount, coin, 'Sell', ...keys)
	} catch (error) {
		console.error('Ошибка:', error)
	}
}
