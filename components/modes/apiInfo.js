import { Parser } from '../Parser.js'

export async function apiInfo() {
	const endpoint = 'v5/user/query-api'

	const data = ''

	try {
		const response = await Parser(endpoint, 'GET', data, 'Info')

		// Validator(response)
	} catch (error) {
		console.error('Ошибка:', error)
	}
}
