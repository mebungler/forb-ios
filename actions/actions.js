import React from "react";

export const userLoggedIn = user => ({
	type: "USER_LOGGED_IN",
	user
});

export const userEditing = user => ({
	type: "USER_EDITING",
	user
});

export const userLoggedOut = user => ({
	type: "USER_LOGGED_OUT",
	user
});

export const userRegistred = user => ({
	type: "USER_REGISTRED",
	user
});

export const chatsLoaded = chats => ({
	type: "CHATS_LOADED",
	chats
});

export const messagesLoaded = messages => ({
	type: "MESSAGES_LOADED",
	messages
});

export const citiesLoaded = cities => ({
	type: "CITIES_LOADED",
	cities
});

export const productsLoaded = products => ({
	type: "PRODUCTS_LOADED",
	products
});

export const categoriesLoaded = categories => ({
	type: "CATEGORIES_LOADED",
	categories
});

export const servicesLoaded = services => ({
	type: "SERVICES_LOADED",
	services
});

export const favoritesLoaded = favorites => ({
	type: "FAVORITES_LOADED",
	favorites
});

export const removeFromCart = product => ({
	type: "REMOVE_FROM_CART",
	product
});

export const clearCart = () => ({
	type: "CLEAR_CART"
});

export const routeChange = route => ({
	type: "ROUTE_CHANGE",
	route
});

export const error = err => ({ type: "ERROR", error: err });
