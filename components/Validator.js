export function Validator(jsonResponse) {
	const result = jsonResponse.result
	// const Total = parseFloat(result.totalEquity)
	const uid = result.memberId
	const accountType = result.accountType

	const coins = result.balance
		.filter(coin => coin.walletBalance > 0)
		.map(coin => ({
			token: coin.coin,
			amount: coin.walletBalance,
		}))

	console.log({
		uid,
		accountType,
		coins,
	})
}
