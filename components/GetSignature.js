import crypto from 'crypto'
import { recvWindow } from './constant.js'

export default function GetSignature(parameters, apiKey, secret, timestamp) {
	return crypto
		.createHmac('sha256', secret)
		.update(timestamp + apiKey + recvWindow + parameters)
		.digest('hex')
}
