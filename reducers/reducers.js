import React from "react";
import StorageService from "../services/StorageService";

export const user = (state = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			StorageService.setState(action.user);
			StorageService.saveChanges();
			return { ...action.user };
		case "USER_LOGGED_OUT":
			StorageService.setState("");
			StorageService.saveChanges();
			return {};
		case "USER_REGISTRED":
			StorageService.setState(action.user);
			StorageService.saveChanges();
			return { ...action.user };
		default:
			return state;
	}
};

export const chats = (state = [], action) => {
	switch (action.type) {
		case "CHATS_LOADED":
			return action.chats;
		default:
			return state;
	}
};

export const categories = (state = [], action) => {
	switch (action.type) {
		case "CATEGORIES_LOADED":
			return action.categories;
		default:
			return state;
	}
};

export const cities = (state = [], action) => {
	switch (action.type) {
		case "CITIES_LOADED":
			return action.cities;
		default:
			return state;
	}
};

export const products = (state = [], action) => {
	switch (action.type) {
		case "PRODUCTS_LOADED":
			return action.products;
		default:
			return state;
	}
};

export const messages = (state = [], action) => {
	switch (action.type) {
		case "MESSAGES_LOADED":
			return action.messages;
		default:
			return state;
	}
};

export const route = (state = { name: "", getter_id: "" }, action) => {
	switch (action.type) {
		case "ROUTE_CHANGE":
			return { ...state, ...action.route };
		default:
			return state;
	}
};

export const services = (state = [], action) => {
	switch (action.type) {
		case "SERVICES_LOADED":
			return action.services;
		default:
			return state;
	}
};

export const favorites = (state = [], action) => {
	switch (action.type) {
		case "FAVORITES_LOADED":
			return action.favorites;
		default:
			return state;
	}
};

export const error = (state = {}, action) => {
	switch (action.type) {
		case "ERROR":
			return action.error;
		default:
			return state;
	}
};
