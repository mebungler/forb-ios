import React from "react";
import axios from "axios";

import StorageService from "../services/StorageService";

export const siteUrl = "https://forb.uz";
export const url = siteUrl + "/api";

export const urlResolve = param => {
	if (!param) return;
	if (param[0] !== "/") return siteUrl + "/" + param;
	if (param.indexOf("http") !== -1) {
		return param;
	}
	return siteUrl + param;
};

let packageData = data => {
	const form = new FormData();
	for (const key in data) {
		if (
			key.indexOf("image") !== -1 ||
			key.indexOf("gallery") !== -1 ||
			key.indexOf("photo") !== -1
		) {
			if (typeof data[key] === typeof 1) {
				form.append(key, data[key]);
				continue;
			}
			if (!data[key]) continue;
			if (typeof data[key] !== typeof "") {
				data[key].forEach(e => {
					const uriParts = e.split(".");
					const fileType = uriParts[uriParts.length - 1];
					form.append(key + "[]", {
						uri: e,
						name: `photo.${fileType}`,
						type: `image/${fileType}`
					});
				});
				continue;
			}
			const uriParts = data[key].split(".");
			const fileType = uriParts[uriParts.length - 1];
			if (data[key].indexOf("file://") === -1) continue;
			form.append(key, {
				uri: data[key],
				name: `photo.${fileType}`,
				type: `image/${fileType}`
			});
			continue;
		}
		if (key === "filter") {
			data[key].forEach((e, index) => {
				form.append(`${key}[${index + 1}]`, e);
				form.append(`${key}[${index + 1}]`, e);
			});
			continue;
		}
		if (key === "filters") {
			data[key].forEach((e, index) => {
				form.append(`filter[${e.id}]`, e.value);
			});
			continue;
		}
		form.append(key, data[key]);
	}
	return form;
};

let getToken = () => {
	return StorageService.getState().token;
};

export default {
	auth: {
		login: credentials =>
			axios
				.post(url + "/user/sign-in", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response),
		register: credentials =>
			axios
				.post(url + "/user/sign-up", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response),
		getCode: credentials =>
			axios
				.post(url + "/user/send-phone", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response),
		sendCode: credentials =>
			axios
				.post(url + "/user/send-code", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response)
	},
	main: {
		getBanner: () =>
			axios
				.get(url + "/main/slider")
				.then(res => res)
				.catch(({ response }) => response),
		getTariff: () =>
			axios
				.get(url + "/main/tariff")
				.then(res => res)
				.catch(({ response }) => response),
		phone: () =>
			axios
				.get(url + "/main/phone")
				.then(res => res)
				.catch(({ response }) => response),
		oferta: () =>
			axios
				.get(url + "/main/oferta")
				.then(res => res)
				.catch(({ response }) => response)
	},
	user: {
		getInfo: token => {
			return axios
				.post(url + "/profile/info", {
					headers: { Authorization: "Bearer " + getToken() }
				})
				.then(res => res)
				.catch(({ response }) => response);
		},
		update: data =>
			axios
				.post(`${url}/user/update`, packageData(data), {
					headers: {
						Authorization: "Bearer " + getToken()
					}
				})
				.then(res => {
					return res;
				})
				.catch(res => {
					return res;
				})
	},
	product: {
		getProducts: (index = 1) =>
			axios
				.get(`${url}/ads?page=${index}`)
				.then(res => res)
				.catch(({ response }) => response),
		addProduct: data =>
			axios
				.post(`https://forb.uz/api/ads/create`, packageData(data), {
					headers: {
						Authorization: "Bearer " + getToken(),
						Accept: "application/json",
						"Content-Type": "application/x-www-form-urlencoded"
					}
				})
				.then(res => {
					return res;
				}),
		getActiveAds: () =>
			axios
				.get(url + "/ads/mine?status=active", {
					headers: {
						Authorization: "Bearer " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		getFavorites: () =>
			axios
				.get(url + "/ads/favorites", {
					headers: {
						Authorization: "Bearer " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		toggleFavorites: id =>
			axios
				.get(url + `/ads/add-favorite?id=${id}`, {
					headers: {
						Authorization: "Bearer " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		getInactiveAds: () =>
			axios
				.get(url + "/ads/mine?status=inactive", {
					headers: {
						Authorization: "Bearer " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		search: query =>
			axios
				.get(url + `/ads?search=${query}`, {
					headers: {
						Authorization: "Bearer " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		postSearch: data =>
			axios
				.post(url + `/ads/search`, packageData(data), {
					headers: {
						Authorization: "Bearer " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		view: (id, device) =>
			axios
				.get(url + `/ads/view?id=${id}&device_id=${device}`)
				.then(res => res)
				.catch(({ response }) => response),
		viewPhone: credentials =>
			axios
				.post(url + "/ads/view-phone", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response),
		edit: data =>
			axios
				.post(`${url}/ads/create?id=${data.id}`, packageData(data), {
					headers: {
						Authorization: "Bearer " + getToken(),
						Accept: "application/json",
						"Content-Type": "multipart/form-data"
					}
				})
				.then(res => res)
				.catch(res => res),
		remove: id =>
			axios
				.post(`${url}/ads/remove?id=${id}`, null, {
					headers: {
						Authorization: "Bearer " + getToken(),
						Accept: "application/json",
						"Content-Type": "multipart/form-data"
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		userAds: id =>
			axios
				.get(`${url}/ads?user_id=${id}`)
				.then(res => res)
				.catch(({ response }) => response),
		getByCategory: id =>
			axios
				.get(`${url}/ads?category_id=${id}`)
				.then(res => res)
				.catch(({ response }) => response),
		getByUser: id =>
			axios
				.get(`${url}/ads?user_id=${id}`)
				.then(res => res)
				.catch(({ response }) => response)
	},
	category: {
		get: () =>
			axios
				.get(url + "/category?type=main")
				.then(res => res)
				.catch(({ response }) => response),
		getCities: () =>
			axios
				.get(url + "/category?type=city")
				.then(res => res)
				.catch(({ response }) => response),
		getIndustries: () =>
			axios
				.get(url + "/category?type=industry")
				.then(res => res)
				.catch(({ response }) => response),
		getServices: () =>
			axios
				.get(url + "/category?type=service")
				.then(res => res)
				.catch(({ response }) => response),
		subCategories: id =>
			axios
				.get(url + `/category/sub?id=${id}`)
				.then(res => res)
				.catch(({ response }) => response),
		filters: id =>
			axios
				.get(url + `/category/filter?id=${id}`)
				.then(res => res)
				.catch(({ response }) => response)
	},
	options: {
		get: () =>
			axios
				.get(url + "/store-option")
				.then(res => res)
				.catch(({ response }) => response)
	},
	order: {
		request: credentials =>
			axios
				.post(url + "/query/create/", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response)
	},
	chat: {
		send: data =>
			axios
				.post(url + "/chat/send", data, {
					headers: { Authorization: "Bearer " + getToken() }
				})
				.then(res => res)
				.catch(({ response }) => response),
		getChats: () =>
			axios
				.get(url + "/chat/users", {
					headers: { Authorization: "Bearer " + getToken() }
				})
				.then(res => res)
				.catch(({ response }) => response),
		getMessages: id =>
			axios
				.get(url + "/chat/messages" + `?id=${id}`, {
					headers: { Authorization: "Bearer " + getToken() }
				})
				.then(res => res)
				.catch(({ response }) => response)
	}
};
