import Modes from './components/modes/modes.modules.js'

let { balance, order, transfer, maxSell } = Modes
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getRandomDelay = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomElement(arr) {
	const randomIndex = Math.floor(Math.random() * arr.length)
	return arr[randomIndex]
}
/* ******************** MODES ******************** */

/*
 *
 * await balance('FUND'/'UNIFIED', apiKey, secretKey, proxy, randomUA)
 * await transfer(number, 'TOKEN', apiKey, secretKey, proxy, randomUA)
 * await sell(number, 'TOKEN', 'Sell'/'Buy', apiKey, secretKey, proxy, randomUA)
 * await maxSell('TOKEN', apiKey, secretKey, proxy, randomUA)
 *
 */

/* ******************** MAIN SCRIPT ******************** */

;async (shuffledData, uap) => {
	for (let i = 0; i < shuffledData.length; i++) {
		const { apiKey, secretKey, proxy } = shuffledData[i]
		const randomUA = getRandomElement(uap)

		const randomDelay = getRandomDelay(5000, 15000) // range: 5 to 15 seconds
		await delay(randomDelay)

		console.log('account', i + 1)
		console.log(proxy, 'User-Agent:', randomUA)

		// await balance('FUND', apiKey, secretKey, proxy, randomUA)
		// await transfer(1000, 'USDT', apiKey, secretKey, proxy, randomUA)
		// await order(10000, 'BTC', 'Buy', apiKey, secretKey, proxy, randomUA)
		await maxSell('BTC', apiKey, secretKey, proxy, randomUA)
	}
}
