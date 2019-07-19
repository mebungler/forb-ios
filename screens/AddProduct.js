import React, { Component } from "react";
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback
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
		email: "",
		city_id: -1,
		status: "idle",
		content: "",
		phone: ""
	};
	onChange = (index, item) => {
		let properties = [...this.state.properties];
		properties[index] = item;
		this.setState({ ...this.state, properties });
	};
	add = e => {
		this.setState({ ...this.state, gallery: [...this.state.gallery, e] });
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
		// this.setState({ ...this.state, status: "rotate" });
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
			price_d
		} = this.state;
		let { cities, categories } = this.props;
		let data = {
			title,
			content,
			email,
			phone,
			gallery: [...gallery.slice(1, gallery.length)],
			photo: gallery[0],
			property: properties.map(({ key, value }) => ({
				key,
				value
			})),
			type: discount ? 1 : 2,
			price,
			price_d,
			category_id:
				category_id === -1
					? null
					: parseInt(categories[category_id].value),
			city_id: city_id === -1 ? null : parseInt(cities[city_id].value),
			responsible_person
		};
		api.product
			.edit({ ...data, id: 24 })
			.then(res => {
				console.warn(res);
			})
			.catch(res => {
				console.warn(res);
			});
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
			status
		} = this.state;
		let { add, remove } = this;
		let { cities, categories } = this.props;
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
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
						placeholder={`Выберите рубрику `}
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
							width: width - 60
						}}
						onValueChange={(val, index) => {
							this.setState({
								...this.state,
								category_id: index - 1
							});
						}}
					/>
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
							title="Торг уместен"
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
							title="Окончательная цена"
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
							placeholder="Цена (суммы)"
							name="price"
							keyboardType="numeric"
							error={this.state.errors}
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
							placeholder="Цена (доллары)"
							keyboardType="numeric"
							name="price_d"
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
							placeholder="Ввести заголовок"
							name="title"
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
							Дополнительные поля
						</Text>
					</View>
					{properties &&
						properties.map(({ key, value }, index) => {
							return (
								<PropertyItem
									{...{ key, value, index }}
									border={key !== properties.length - 1}
									onChange={this.onChange}
								/>
							);
						})}
					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
							flexDirection: "row",
							paddingRight: 15
						}}
					>
						<TouchableWithoutFeedback
							onPress={() => {
								this.setState({
									...this.state,
									properties: [
										...this.state.properties,
										{ key: "", value: "" }
									]
								});
							}}
						>
							<Icon
								name="plus_ad"
								size={18}
								color={Colors.pink}
							/>
						</TouchableWithoutFeedback>
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
							Описание
						</Text>
					</View>
					<RoundInput
						simple
						multiline
						numberOfLines={10}
						placeholder="Ваше описание"
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
							Добавить фото
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
							Ваши контактные данные
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
						placeholder={"Город предоставления услугу"}
						data={cities}
						onValueChange={(val, index) => {
							this.setState({
								...this.state,
								city_id: index - 1
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
							simple
							placeholder="Почта (e-mail)"
							wider
							keyboardType="email-address"
							name="email"
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
							placeholder="Ответственное лицо"
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
							text="Опубликовать"
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

const mapStateToProps = ({ cities, categories }) => ({ cities, categories });

export default connect(mapStateToProps)(AddProduct);
