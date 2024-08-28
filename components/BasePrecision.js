import axios from 'axios'

export async function BasePrecision(value, coin) {
	try {
		let config = {
			method: 'get',
			url: `https://api.bybit.com/v5/market/instruments-info?category=spot&symbol=${coin}USDT`,
			headers: {},
		}

		const response = await axios(config)
		const basePrecision = parseFloat(
			response.data.result.list[0].lotSizeFilter.basePrecision
		)
		if (isNaN(basePrecision)) {
			throw new Error('Не удалось получить значение basePrecision.')
		}

		const factor = 1 / basePrecision // Вычисляем множитель для округления

		// Используем Math.floor для округления вниз
		return Math.floor(value * factor) / factor
	} catch (error) {
		console.error(
			'Ошибка при получении basePrecision или округлении:',
			error.message
		)
		return null // Возвращаем null в случае ошибки
	}
}
