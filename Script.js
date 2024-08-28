import readline from 'readline'
import { uap } from './components/constant.js'
import shuffledData from './components/ExcelParse.js'
import Modes from './components/modes/modes.modules.js'

let { balance, order, transfer, maxSell, umpaLumpa } = Modes
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getRandomDelay = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomElement(arr) {
	const randomIndex = Math.floor(Math.random() * arr.length)
	return arr[randomIndex]
}

const processTransfers = async (shuffledData, uap, mode, params) => {
	for (let i = 0; i < shuffledData.length; i++) {
		const { apiKey, secretKey, proxy } = shuffledData[i]
		const randomUA = getRandomElement(uap)

		const randomDelay = getRandomDelay(3000, 9000) // range: 3 to 9 seconds
		await delay(randomDelay)

		console.log('account', i + 1)
		console.log('User-Agent:', randomUA)
		console.log('API-KEY:', apiKey)

		switch (mode) {
			case 'transfer':
				await transfer(
					params.amount,
					params.coin,
					params.type,
					apiKey,
					secretKey,
					proxy,
					randomUA
				)
				break
			case 'balance':
				await balance(params.type, null, apiKey, secretKey, proxy, randomUA)
				break

			case 'order':
				await order(
					params.amount,
					params.coin,
					params.method,
					apiKey,
					secretKey,
					proxy,
					randomUA
				)
				break
			case 'maxSell':
				await maxSell(params.coin, apiKey, secretKey, proxy, randomUA)
				break
			case 'umpaLumpa':
				await umpaLumpa(params.coin, apiKey, secretKey, proxy, randomUA)
				break
			default:
				console.log('Unknown mode:', mode)
		}
	}
}

// Настройка readline для получения ввода пользователя
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const askMode = () => {
	return new Promise(resolve => {
		rl.question(
			'Выберите режим (transfer, balance, order, maxSell, umpaLumpa): ',
			mode => {
				resolve(mode)
			}
		)
	})
}

const askParameters = mode => {
	return new Promise(resolve => {
		let params = {}

		switch (mode) {
			case 'balance':
				rl.question('Введите тип (FUND/UNIFIED): ', type => {
					params.type = type
					console.log(params)

					resolve(params)
				})
				break
			case 'transfer':
				rl.question('Введите валюту (coin): ', coin => {
					params.coin = coin
					rl.question('Введите сумму (amount): ', amount => {
						params.amount = parseFloat(amount)
						rl.question('Куда отправить (toFund/fromFund): ', type => {
							params.type = type
							resolve(params)
						})
					})
				})
				break
			case 'order':
				rl.question('Выберите метод (Sell/Buy): ', method => {
					params.method = method
					rl.question('Введите валюту (coin): ', coin => {
						params.coin = coin
						rl.question('Введите сумму (amount): ', amount => {
							params.amount = parseFloat(amount)
							console.log(params)
							resolve(params)
						})
					})
				})
				break
			case 'maxSell':
				rl.question('Введите валюту (coin): ', coin => {
					params.coin = coin
					resolve(params)
				})
				break
			case 'umpaLumpa':
				rl.question('Введите валюту (coin): ', coin => {
					params.coin = coin
					resolve(params)
				})
				break
			default:
				resolve(params)
		}
	})
}

const main = async () => {
	const mode = await askMode()
	const params = await askParameters(mode)
	await processTransfers(shuffledData, uap, mode, params)
	rl.close()
}

main()
