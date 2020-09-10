const URI = "https://3000-dc5b60a1-e9c7-47df-8afe-d76da2d221f2.ws-us02.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			portfolioValue: 50000,
			buyingPower: 50000,
			user: {
				userId: 1,
				username: "Moldovanjason",
				email: "moldovanjason@gmail.com",
				password: "okokokok",
				it_active: true,
				portfolio: []
			},
			currentStocks: []
		},
		actions: {
			createUser: (username, email, password) => {
				// console.log("user created with", username, email, password);
				fetch(URI + "/register_user", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: username,
						email: email,
						password: password,
						buying_power: buying_power
					})
				})
					.then(data => data.json().then(response => ({ status: data.status, resMsg: response.msg })))
					.then(({ status, resMsg }) => {
						alert("User Created", resMsg, status);
					})
					.catch(err => alert(err.message));
			},

			buyStock: (userId, symbol, companyName, price, shares, totalReturn) => {
				fetch(URI + "/portfolio/1", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						symbol: symbol,
						companyName: companyName,
						price: price,
						shares: shares,
						totalReturn: totalReturn
					})
				})
					.then(data => data.json())
					.then(response => alert("Thank you for your puchase!"))

					.catch(error => error);
			},

			sellStock: (userId, symbol, price, shares) => {
				fetch(URI + "/portfolio/1", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						symbol: symbol,
						price: price,
						shares: parseInt(shares)
					})
				})
					.then(data => data.json())
					.then(response => response)
					.catch(error => error);
			},

			loadStockData: () => {
				const store = getStore();
				fetch("https://financialmodelingprep.com/api/v3/stock/list?apikey=f19b2da4e27cfbbaeaa219bc4d346fd5")
					.then(res => res.json())
					.then(data => setStore({ ...store, currentStocks: data.slice(0, 50) }))
					.catch(err => alert(err.message));
			}
			// signInUser: () => {
			//     fetch(URI + "/login", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify({
			// 		email: email,
			// 	})
			// })
			// }
		}
	};
};

export default getState;
