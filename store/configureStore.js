import React from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
	user,
	error,
	products,
	route,
	chats,
	messages,
	cities,
	categories,
	services,
	favorites
} from "../reducers/reducers";

const configureStore = () =>
	createStore(
		combineReducers({
			user,
			error,
			products,
			route,
			chats,
			messages,
			cities,
			categories,
			services,
			favorites
		}),
		applyMiddleware(thunk)
	);

export default configureStore;
