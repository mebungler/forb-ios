import React, { Component } from "react";
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
	PermissionsAndroid,
	Dimensions,
	Alert
} from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import DefaultPicker from "../components/DefaultPicker";
import Icon from "../services/IconService";
import { CheckBox } from "react-native-elements";
import RoundInput from "../components/RoundInput";
import RoundPicker from "../components/RoundPicker";
import RoundButton from "../components/RoundButton";
import PropertyItem from "./PropertyItem";
import MultiImagePicker from "../components/MultiImagePicker";
import { connect } from "react-redux";
import api from "../api/api";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import strings from "../localization/Strings";

import {
	populateCategories,
	populateProducts,
	populateCities
} from "../actions/thunk";

let { width } = Layout;

class AddProduct extends Component {
	state = {
		category_id: -1,
		price: "",
		price_d: "",
		title: "",
		discount: true,
		properties: [{ key: "", value: "" }],
		gallery: [],
		responsible_person: "",
		photo: "",
		email: this.props.user.email,
		city_id: -1,
		status: "idle",
		content: "",
		phone: this.props.user.phone,
		lng: 0,
		lat: 0,
		isMine: null,
		subcategories: [],
		regions: [],
		region: -1,
		filters: [],
		values: []
	};
	onChange = (index, item) => {
		let properties = [...this.state.properties];
		properties[index] = item;
		this.setState({ ...this.state, properties });
	};
	fetchFilters = (id, clear) => {
		api.category.filters(id).then(res => {
			let filters = clear
				? res.data.data.map(e => ({
						...e,
						label: e.name,
						value: e.name
				  }))
				: [
						...this.state.filters,
						...res.data.data.map(e => ({
							...e,
							label: e.name,
							value: e.name
						}))
				  ];
			this.setState({
				...this.state,
				filters
			});
		});
	};
	add = e => {
		this.setState({ ...this.state, gallery: [...this.state.gallery, e] });
	};
	pickLocation = ({ latitude, longitude }, isMine) => {
		this.setState({ ...this.state, lat: latitude, lng: longitude, isMine });
	};
	remove = index => {
		if (index === 0 && this.state.gallery.length === 1) {
			return [];
		}
		this.setState({
			...this.state,
			gallery: [
				...this.state.gallery.slice(0, index),
				this.state.gallery.slice(
					index + 1,
					this.state.gallery.length - 1
				)
			]
		});
	};

	request = () => {
		this.setState({ ...this.state, status: "rotate" });
		let {
			title,
			category_id,
			content,
			city_id,
			email,
			phone,
			responsible_person,
			gallery,
			properties,
			discount,
			price,
			price_d,
			subcategories,
			regions,
			region,
			lat,
			lng,
			filters
		} = this.state;
		let { cities, categories } = this.props;
		let cat =
			category_id === -1 ? null : parseInt(categories[category_id].value);
		if (subcategories.length > 0 && subcategories[0].value !== -1) {
			let sub = subcategories[subcategories.length - 1];
			cat = sub.data[sub.value].id;
			cat = parseInt(cat);
		}
		let _city = city_id === -1 ? null : parseInt(cities[city_id].value);
		if (region !== -1) {
			_city = parseInt(regions[region].value);
		}
		let data = {
			title,
			content,
			email,
			phone,
			gallery: [...gallery.slice(1, gallery.length)],
			photo: gallery[0],
			type: discount ? 1 : 2,
			price,
			price_d,
			category_id: cat,
			city_id: _city,
			responsible_person,
			lat,
			lng,
			filters
		};
		api.product
			.addProduct(data)
			.then(res => {
				this.setState({ ...this.state, status: "idle" });
				if (res.status !== 200) {
					Alert.alert(
						strings.attention,
						strings.didNotFill,
						[{ text: "OK" }],
						{ cancelable: true }
					);
					return;
				}
				Alert.alert(
					strings.attention,
					strings.complete,
					[{ text: "OK" }],
					{ cancelable: true }
				);
				this.props.navigation.navigate("Products");
			})
			.catch(res => {
				this.setState({ ...this.state, status: "idle" });
			});
	};

	getUserLocation = () => {
		if (Platform.OS === "android") {
			try {
				PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: "Forb",
						message: strings.accessLocation,
						buttonNegative: strings.cancel,
						buttonPositive: strings.good
					}
				).then(granted => {
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						navigator.geolocation.getCurrentPosition(
							e => {
								this.pickLocation(e, true);
							},
							null,
							{ enableHighAccuracy: true, timeout: 30000 }
						);
						return;
					} else {
						return;
					}
				});
			} catch (err) {
				return;
			}
		}
		try {
			console.warn(navigator.geolocation);
			// navigator.geolocation.getCurrentPosition(e => {
			// 	console.warn(e);
			// 	this.pickLocation(e, true);
			// });
		} catch (e) {
			alert("Your phone does not support Location API");
		}
	};

	componentDidMount() {
		this.props.dispatch(populateCategories());
		this.props.dispatch(populateCities());
	}

	render() {
		let {
			category_id,
			properties,
			gallery,
			responsible_person,
			email,
			phone,
			city_id,
			status,
			isMine,
			subcategories,
			regions,
			region,
			filters,
			values
		} = this.state;
		let { add, remove, pickLocation, fetchFilters } = this;
		let { cities, categories } = this.props;
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: Colors.lightGray }}
			>
				<View
					style={{
						padding: 30,
						paddingTop: 15,
						paddingBottom: 30
					}}
				>
					<DefaultPicker
						horizontal
						description={`(${categories.length})`}
						data={categories}
						leftIcon={() => (
							<Icon
								name="categories"
								size={18}
								color={Colors.darkGray}
							/>
						)}
						rightIcon={() => (
							<Icon
								name="chevrondown"
								size={10}
								color={Colors.pink}
							/>
						)}
						placeholder={strings.chooseCategory}
						selectedValue={
							category_id === -1
								? ""
								: categories[category_id].label
						}
						style={{
							borderColor: Colors.pink,
							borderWidth: 1,
							borderStyle: "dashed",
							borderRadius: 30,
							marginTop: 15,
							width: width - 60,
							marginBottom: 15
						}}
						onValueChange={(val, index) => {
							api.category
								.subCategories(categories[index - 1].id)
								.then(res => {
									fetchFilters(
										categories[index - 1].id,
										true
									);
									if (
										!res.data ||
										!res.data.data ||
										res.data.data.length <= 0
									) {
										return;
									}
									let normData = res.data.data.map(e => ({
										value: e.id,
										label: e.name,
										...e
									}));
									this.setState({
										...this.state,
										subcategories: [
											{
												value: -1,
												data: normData
											}
										]
									});
								});
							this.setState({
								...this.state,
								category_id: index - 1,
								subcategories: []
							});
						}}
					/>
					{subcategories.map((e, i) => {
						if (!e || !e.data) {
							return null;
						}
						if (
							!subcategories[i] ||
							subcategories[i].data.length <= 0
						)
							return null;
						return (
							<DefaultPicker
								placeholder={strings.chooseSubcategory}
								rightIcon={() => (
									<Icon
										name="chevrondown"
										size={10}
										color={Colors.pink}
									/>
								)}
								selectedValue={
									subcategories[i].value === -1
										? ""
										: subcategories[i].data[
												subcategories[i].value
										  ].label
								}
								data={subcategories[i].data}
								onValueChange={(val, index) => {
									api.category
										.subCategories(
											subcategories[i].data[index - 1].id
										)
										.then(res => {
											fetchFilters(
												subcategories[i].data[index - 1]
													.id,
												false
											);
											if (
												res.data.data &&
												res.data.data.length > 0
											) {
												let normData = res.data.data.map(
													e => ({
														value: e.id,
														label: e.name,
														...e
													})
												);
												this.setState({
													...this.state,
													subcategories: [
														...subcategories,
														{
															value: -1,
															data: normData
														}
													]
												});
											} else {
												return;
											}
										});
									let subs = subcategories;
									subs[i].value = index - 1;
									this.setState({
										...this.state,
										subcategories: subs
									});
								}}
								style={{
									backgroundColor: Colors.white,
									borderColor: Colors.gray,
									borderWidth: 1,
									shadowColor: Colors.gray,
									shadowRadius: 2,
									shadowOffset: { width: 0, height: 0 },
									borderRadius: 30,
									marginBottom: 10
								}}
								small
							/>
						);
					})}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alingItems: "center",
							paddingTop: 15,
							paddingBottom: 15
						}}
					>
						<CheckBox
							checked={this.state.discount}
							containerStyle={{
								backgroundColor: "transparent",
								borderWidth: 0,
								padding: 0,
								margin: 0,
								justifyContent: "flex-start"
							}}
							iconType="material-community"
							checkedIcon="circle-slice-8"
							title={strings.bargaining}
							checkedColor={Colors.blue}
							uncheckedIcon="checkbox-blank-circle-outline"
							textStyle={{
								color: Colors.black,
								fontWeight: "400"
							}}
							onPress={() =>
								this.setState({
									...this.state,
									discount: !this.state.discount
								})
							}
						/>
						<CheckBox
							checked={!this.state.discount}
							containerStyle={{
								backgroundColor: "transparent",
								borderWidth: 0,
								padding: 0,
								margin: 0,
								justifyContent: "flex-start"
							}}
							checkedColor={Colors.blue}
							iconType="material-community"
							checkedIcon="circle-slice-8"
							title={strings.finalPrice}
							uncheckedIcon="checkbox-blank-circle-outline"
							textStyle={{
								color: Colors.black,
								fontWeight: "400"
							}}
							onPress={() =>
								this.setState({
									...this.state,
									discount: !this.state.discount
								})
							}
						/>
					</View>
					<View style={{ marginLeft: -15 }}>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({
									...this.setState,
									[key]: val
								})
							}
							leftIcon={() => (
								<Icon
									name="money"
									size={24}
									color={"#c4c4c4"}
								/>
							)}
							wider
							placeholder={strings.price}
							name="price"
							keyboardType="numeric"
							error={this.state.errors}
							required
							rightIcon={() => (
								<FontAwesome
									name="asterisk"
									size={12}
									color={Colors.pink}
								/>
							)}
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({
									...this.setState,
									[key]: val
								})
							}
							leftIcon={() => (
								<Icon
									name="money"
									size={24}
									color={"#c4c4c4"}
								/>
							)}
							wider
							placeholder={strings.priceD}
							keyboardType="numeric"
							name="price_d"
							required
							rightIcon={() => (
								<FontAwesome
									name="asterisk"
									size={12}
									color={Colors.pink}
								/>
							)}
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({
									...this.setState,
									[key]: val
								})
							}
							leftIcon={() => (
								<Icon name="name" size={24} color={"#c4c4c4"} />
							)}
							wider
							placeholder={strings.enterTitle}
							name="title"
							required
							rightIcon={() => (
								<FontAwesome
									name="asterisk"
									size={12}
									color={Colors.pink}
								/>
							)}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							flex: 1
						}}
					>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18,
								marginBottom: 15,
								marginTop: 15
							}}
						>
							{strings.additionalFields}
						</Text>
					</View>
					<View style={{ alignItems: "center", paddingTop: 15 }}>
						{filters &&
							filters.map((el, index) => {
								switch (el.type) {
									case "input":
										return (
											<RoundInput
												onTextChange={(key, val) =>
													this.setState({
														...this.setState,
														filters: [
															...filters,
															{
																...filters[
																	index
																],
																value: val
															}
														]
													})
												}
												style={{
													borderColor: Colors.gray,
													borderWidth: 1,
													borderRadius: 30,
													width:
														Dimensions.get("window")
															.width - 60,
													paddingLeft: 30,
													height: 50,
													marginTop: 0,
													padding: 0
												}}
												containerStyle={{
													paddingLeft: 30,
													paddingRight: 30,
													marginBottom: 15,
													width:
														Dimensions.get("window")
															.width - 60
												}}
												main
												placeholder={el.name}
												name={`${el.id}`}
											/>
										);
										break;
									case "select":
										return (
											<DefaultPicker
												rightIcon={() => (
													<Icon
														name="chevrondown"
														size={10}
														color={Colors.pink}
													/>
												)}
												selectedValue={
													el.value
														? el.value
														: el.name
												}
												placeholder={el.name}
												data={
													el.childs
														? el.childs.map(e => ({
																label: e.name,
																value: e.value
														  }))
														: []
												}
												onValueChange={(val, i) => {
													let {
														filters: f
													} = this.state;
													f[index].value = val;
													this.setState({
														...this.state,
														filters: f
													});
												}}
												style={{
													backgroundColor:
														Colors.white,
													borderColor: Colors.gray,
													borderWidth: 1,
													shadowColor: Colors.gray,
													shadowRadius: 2,
													shadowOffset: {
														width: 0,
														height: 0
													},
													borderRadius: 30,
													marginBottom: 15
												}}
												small
											/>
										);
										break;
									default:
										return null;
										break;
								}
							})}
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							flex: 1
						}}
					>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18,
								marginBottom: 15,
								marginTop: 15
							}}
						>
							{strings.description}
						</Text>
					</View>
					<RoundInput
						simple
						multiline
						numberOfLines={10}
						placeholder={strings.yourDescription}
						onTextChange={(key, val) =>
							this.setState({
								...this.setState,
								[key]: val
							})
						}
						name="content"
					/>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							flex: 1
						}}
					>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18,
								marginBottom: 15,
								marginTop: 15
							}}
						>
							{strings.addPhoto}
						</Text>
					</View>
					<MultiImagePicker {...{ photos: gallery, add, remove }} />
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							flex: 1
						}}
					>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18,
								marginBottom: 15,
								marginTop: 15
							}}
						>
							{strings.yourContacts}
						</Text>
					</View>
					<DefaultPicker
						rightIcon={() => (
							<Icon
								name="chevrondown"
								size={10}
								color={Colors.pink}
							/>
						)}
						selectedValue={
							city_id === -1 ? "" : cities[city_id].label
						}
						placeholder={strings.cityOfService}
						data={cities}
						onValueChange={(val, index) => {
							this.setState({
								...this.state,
								city_id: index - 1
							});
							api.category
								.subCategories(cities[index - 1].id)
								.then(res => {
									console.warn(cities[index - 1]);
									let normData = res.data.data.map(e => ({
										value: e.id,
										label: e.name,
										...e
									}));
									this.setState({
										...this.state,
										regions: normData
									});
								});
						}}
						style={{
							backgroundColor: Colors.white,
							borderColor: Colors.gray,
							borderWidth: 1,
							shadowColor: Colors.gray,
							shadowRadius: 2,
							shadowOffset: { width: 0, height: 0 },
							borderRadius: 30
						}}
						small
					/>
					{regions && regions.length > 0 && (
						<DefaultPicker
							rightIcon={() => (
								<Icon
									name="chevrondown"
									size={10}
									color={Colors.pink}
								/>
							)}
							selectedValue={
								region === -1 ? "" : regions[region].label
							}
							placeholder={strings.chooseArea}
							data={regions}
							onValueChange={(val, index) => {
								this.setState({
									...this.state,
									region: index - 1
								});
							}}
							style={{
								backgroundColor: Colors.white,
								borderColor: Colors.gray,
								borderWidth: 1,
								shadowColor: Colors.gray,
								shadowRadius: 2,
								shadowOffset: { width: 0, height: 0 },
								borderRadius: 30,
								marginTop: 10
							}}
							small
						/>
					)}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							flex: 1
						}}
					>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18,
								marginBottom: 15,
								marginTop: 15
							}}
						>
							{strings.address}
						</Text>
					</View>
					<View style={{}}>
						<TouchableWithoutFeedback
							onPress={() => {
								this.props.navigation.navigate("PickLocation", {
									pickLocation
								});
							}}
						>
							<View style={{ padding: 15, flexDirection: "row" }}>
								<Icon
									name="adress"
									size={18}
									color={Colors.darkGray}
								/>
								<Text
									style={{
										marginLeft: 15,
										fontSize: 16,
										color: Colors.darkGray
									}}
								>
									{strings.indicateOnTheMap}
								</Text>
								{isMine !== null && !isMine && (
									<View
										style={{
											flex: 1,
											alignItems: "flex-end"
										}}
									>
										<Icon
											name="ok"
											size={18}
											color={"green"}
										/>
									</View>
								)}
							</View>
						</TouchableWithoutFeedback>
					</View>
					<View style={{ marginLeft: -15, paddingBottom: 15 }}>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({
									...this.setState,
									[key]: val
								})
							}
							leftIcon={() => (
								<Icon
									name="phone-1"
									size={24}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder="+998 99 123 45 67"
							wider
							keyboardType="phone-pad"
							name="phone"
							required
							rightIcon={() => (
								<FontAwesome
									name="asterisk"
									size={12}
									color={Colors.pink}
								/>
							)}
							value={this.state.phone}
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({
									...this.setState,
									[key]: val
								})
							}
							leftIcon={() => (
								<Icon name="mail" size={18} color="#c4c4c4" />
							)}
							value={this.state.email}
							simple
							placeholder={strings.email}
							wider
							keyboardType="email-address"
							name="email"
							required
							rightIcon={() => (
								<FontAwesome
									name="asterisk"
									size={12}
									color={Colors.pink}
								/>
							)}
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({
									...this.setState,
									[key]: val
								})
							}
							leftIcon={() => (
								<Icon
									name="responsible-person"
									size={24}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder={strings.responsiblePerson}
							name="responsible_person"
							wider
						/>
					</View>
					<View
						style={{
							justifyContent: "center",
							alingItems: "center",
							flexDirection: "row"
						}}
					>
						<RoundButton
							animated
							status={status}
							color={Colors.blue}
							fill
							text={strings.publish}
							bold
							wider
							large
							onPress={this.request}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ cities, categories, user }) => ({
	cities,
	categories,
	user
});

export default connect(mapStateToProps)(AddProduct);

/*selectedValue={
									subcategories[i].value === -1
										? ""
										: subcategories[i].data[
												subcategories[i].value
										  ]
								}
								placeholder={"Выберите подкатегорию"}
								data={subcategories[i].data}
								onValueChange={(val, index) => {
									let subs = this.state.subcategories;
									subs[i].value = index - 1;
									this.setState({
										...this.state,
										subcategories: subs
									});
									api.category
										.subCategories(categories[category_id])
										.then(res => {
											this.setState({
												...this.state,
												subcategories: [
													...subcategories,
													{
														value: -1,
														data: res.data.data
													}
												]
											});
										});
								}}*/
