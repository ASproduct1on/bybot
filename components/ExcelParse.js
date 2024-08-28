import path from 'path'
import xlsx from 'xlsx'

const filePath = path.join('data.xlsx')
function extractDataFromExcel(filePath) {
	const workbook = xlsx.readFile(filePath)
	const sheet = workbook.Sheets[workbook.SheetNames[0]]
	const rows = xlsx.utils.sheet_to_json(sheet)

	return rows.map(row => ({
		apiKey: row.ApiKey,
		secretKey: row.SecterKey,
		proxy: parseProxy(row.Proxy),
	}))
}

function parseProxy(proxyString) {
	if (!proxyString) return null

	if (proxyString.startsWith('http://')) {
		proxyString = proxyString.substring(7)
	} else if (proxyString.startsWith('socks5://')) {
		proxyString = proxyString.substring(9)
	}

	let proxy = {}

	// Split the string into parts
	const parts = proxyString.split('@')

	if (parts.length === 2) {
		// Format: login:password@host:port
		const [auth, hostPort] = parts
		const [username, password] = auth.split(':')
		const [host, port] = hostPort.split(':')

		if (username && password && host && port) {
			proxy = {
				host,
				port,
				username,
				password,
			}
		} else {
			throw new Error('Invalid proxy format: ' + proxyString)
		}
	} else if (parts.length === 1) {
		// Try other formats
		const subparts = parts[0].split(':')

		if (subparts.length === 4) {
			// Format: host:port:login:password
			const [host, port, username, password] = subparts

			if (username && password && host && port) {
				proxy = {
					host,
					port,
					username,
					password,
				}
			} else {
				throw new Error('Invalid proxy format: ' + proxyString)
			}
		} else if (subparts.length === 4) {
			// Format: login:password:host:port
			const [username, password, host, port] = subparts

			if (username && password && host && port) {
				proxy = {
					host,
					port,
					username,
					password,
				}
			} else {
				throw new Error('Invalid proxy format: ' + proxyString)
			}
		} else {
			throw new Error('Invalid proxy format: ' + proxyString)
		}
	} else {
		throw new Error('Invalid proxy format: ' + proxyString)
	}

	return proxy
}

const extractedData = extractDataFromExcel(filePath)
// console.log('extractedData', extractedData)

function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]] // Swap elements
	}
	return arr
}

const shuffledData = shuffleArray(extractedData)

export default shuffledData
