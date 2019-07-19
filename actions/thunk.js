import React from "react";
import api from "../api/api";
import {
	userRegistred,
	userLoggedIn,
	error,
	chatsLoaded,
	messagesLoaded,
	citiesLoaded,
	productsLoaded,
	categoriesLoaded,
	favoritesLoaded,
	servicesLoaded
} from "./actions";

export const loginAsync = (data, next, remember) => dispatch => {
	return api.auth
		.login(data)
		.then(res => {
			let user = res.data;
			if (res.status === 200) {
				user["password"] = data.password;
				dispatch(userLoggedIn(user));
			}
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(data));
		});
};

export const registerAsync = (data, next) => dispatch => {
	return api.auth
		.register(data)
		.then(res => {
			if (res.status === 200) {
				dispatch(userRegistred(res.data));
			}
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res.data));
		});
};

export const populateChats = (next = () => {}) => dispatch => {
	return api.chat
		.getChats()
		.then(res => {
			dispatch(chatsLoaded(res.data.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateMessages = (id, next = () => {}) => dispatch => {
	return api.chat
		.getMessages(id)
		.then(res => {
			dispatch(messagesLoaded(res.data.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateServices = (next = () => {}) => dispatch => {
	return api.category
		.getServices()
		.then(res => {
			dispatch(servicesLoaded(res.data.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateFavorites = (next = () => {}) => dispatch => {
	return api.product
		.getFavorites()
		.then(res => {
			dispatch(favoritesLoaded(res.data.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateYears = (make, model, next = () => {}) => dispatch => {
	return api.product
		.getYears(make, model)
		.then(res => {
			let years = [];
			for (var key in res.data) {
				years.push({ label: key, value: key });
			}
			dispatch(yearsLoaded(years));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateCategories = (next = () => {}) => dispatch => {
	return api.category
		.get()
		.then(res => {
			let cats = res.data.data.map(e => ({
				label: e.name,
				value: e.id,
				...e
			}));
			dispatch(categoriesLoaded(cats));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateCities = (next = () => {}) => dispatch => {
	return api.category
		.getCities()
		.then(res => {
			let cats = res.data.data.map(e => ({ label: e.name, value: e.id }));
			dispatch(citiesLoaded(cats));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateProducts = (
	categoryId = "",
	next = () => {}
) => dispatch => {
	if (categoryId === "" || !categoryId)
		return api.product
			.getProducts()
			.then(res => {
				dispatch(productsLoaded(res.data.data));
				next(res);
				return res;
			})
			.catch(res => {
				next(res);
				return dispatch(error(res));
			});
	else {
		return api.product
			.getByCategory(categoryId)
			.then(res => {
				dispatch(productsLoaded(res.data.data));
				next(res);
				return res;
			})
			.catch(res => {
				next(res);
				return dispatch(error(res));
			});
	}
};
