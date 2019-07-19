import React from "react";
import { AsyncStorage } from "react-native";

let state = {};
let favorites = [];

const initialize = async () => {
	let result = await AsyncStorage.getItem("@Forb.uz:token");
	let resA = await AsyncStorage.getItem("@Forb.uz:favorites");
	if (!result) {
		AsyncStorage.setItem("@Forb.uz:token", "");
		AsyncStorage.setItem("@Forb.uz:favorites", "");
	}
	let res = JSON.parse(result);
	let resB = JSON.parse(resA);
	state = res === null ? {} : res;
	favorites = resB === null ? [] : resB;
};

const saveChanges = async () => {
	try {
		let str = JSON.stringify(state);
		let strA = JSON.stringify(favorites);
		AsyncStorage.setItem("@Forb.uz:token", str);
		AsyncStorage.setItem("@Forb.uz:favorites", strA);
	} catch (e) {}
};

const getState = () => {
	return state;
};

const setState = e => {
	state = e;
};

const toggleItem = e => {
	if (!favorites) {
		favorites = [e];
		return favorites;
	} else {
		let element = favorites.find(el => el.id === e.id);
		if (element && Object.keys(element).length > 0) {
			favorites = favorites.filter(el => element.id !== el.id);
			return favorites;
		} else {
			favorites = [...favorites, e];
			return favorites;
		}
	}
};

const isFavorite = e => {
	if (!favorites || Object.keys(favorites).length <= 0) {
		favorites = [];
		return false;
	}
	let element = favorites.find(el => el.id === e.id);
	if (!element) {
		return false;
	}
	let isFavorite = Object.keys(element).length > 0;
	return isFavorite;
};

const getFavorites = () => (favorites ? favorites : []);

export default {
	initialize,
	saveChanges,
	getState,
	setState,
	isFavorite,
	toggleItem,
	getFavorites
};
