import React, { Component } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableWithoutFeedback,
	Text,
	Dimensions
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import RoundButton from "../components/RoundButton";
import api from "../api/api";
import DefaultPicker from "../components/DefaultPicker";
import RoundInput from "../components/RoundInput";
import strings from "../localization/Strings";

class Filter extends Component {
	componentDidMount() {
		let categoryId = this.props.navigation.getParam("categoryId");
		api.category.filters(categoryId).then(res => {
			this.setState({ ...this.state, filters: res.data.data });
		});
	}
	state = {
		withPhoto: false,
		searchInText: false,
		price: 0,
		tile: this.props.navigation.getParam("isTile"),
		filters: [],
		values: {},
		status: "idle"
	};
	changeOrientation = tile => {
		let changeOrientation = this.props.navigation.getParam(
			"changeOrientation"
		);
		this.setState({ ...this.state, tile });
		changeOrientation(tile);
	};
	render() {
		let {
			withPhoto,
			searchInText,
			price,
			tile,
			filters,
			values,
			status
		} = this.state;
		let filter = this.props.navigation.getParam("filter");
		let { changeOrientation } = this;
		return (
			<View style={{ flex: 1 }}>
				<Header back name={strings.filter} />
				<ScrollView style={{ padding: 15 }}>
					<CheckBox
						checked={searchInText}
						containerStyle={{
							backgroundColor: "transparent",
							borderWidth: 0,
							padding: 0,
							margin: 0,
							justifyContent: "flex-start",
							paddingBottom: 15
						}}
						iconType="font-awesome"
						checkedIcon="check-square-o"
						title={strings.searchText}
						checkedColor={Colors.pink}
						uncheckedIcon="square-o"
						textStyle={{
							color: Colors.black,
							fontWeight: "400"
						}}
						onPress={() =>
							this.setState({
								...this.state,
								searchInText: !this.state.searchInText
							})
						}
					/>
					<CheckBox
						checked={withPhoto}
						containerStyle={{
							backgroundColor: "transparent",
							borderWidth: 0,
							padding: 0,
							margin: 0,
							justifyContent: "flex-start"
						}}
						iconType="font-awesome"
						checkedIcon="check-square-o"
						title={strings.onlyPhoto}
						checkedColor={Colors.pink}
						uncheckedIcon="square-o"
						textStyle={{
							color: Colors.black,
							fontWeight: "400"
						}}
						onPress={() =>
							this.setState({
								...this.state,
								withPhoto: !this.state.withPhoto
							})
						}
					/>
					<View style={{ alignItems: "center", paddingTop: 15 }}>
						{filters &&
							filters.map((el, index) => {
								switch (el.type) {
									case "input":
										return (
											<RoundInput
												onTextChange={(key, val) => {
													let filters = this.state;
													filters[index].value = val;
													this.setState({
														...this.setState,
														filters
													});
												}}
												style={{
													borderColor: Colors.gray,
													borderWidth: 1,
													borderRadius: 30,
													width:
														Dimensions.get("window")
															.width - 60,
													paddingLeft: 30,
													marginBottom: 15,
													height: 50
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
													filters[index].value
														? filters[index].value
														: filters[index].name
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
							justifyContent: "space-evenly",
							padding: 15
						}}
					>
						<TouchableWithoutFeedback
							onPress={() => changeOrientation(true)}
						>
							<View style={{ alignItems: "center" }}>
								<Icon
									name="tile"
									size={30}
									color={tile ? Colors.blue : Colors.darkGray}
								/>
								<Text
									style={{
										color: tile
											? Colors.blue
											: Colors.darkGray,
										fontSize: 20
									}}
								>
									{strings.list}
								</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							onPress={() => changeOrientation(false)}
						>
							<View style={{ alignItems: "center" }}>
								<Icon
									name="list"
									color={
										!tile ? Colors.blue : Colors.darkGray
									}
									size={30}
								/>
								<Text
									style={{
										color: !tile
											? Colors.blue
											: Colors.darkGray,
										fontSize: 20
									}}
								>
									{strings.tile}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</ScrollView>
				<View style={{ padding: 15, alignItems: "center" }}>
					<RoundButton
						text={strings.showAds}
						color={Colors.blue}
						status={status}
						fill
						mediumSize
						big
						animated
						onPress={() => {
							this.setState({ ...this.state, status: "rotate" });
							api.product
								.postSearch({
									filters: filters ? filters : [],
									photo: withPhoto ? 1 : 0
								})
								.then(res => {
									filter(res.data.data);
									this.setState({
										...this.state,
										status: "idle"
									});
									this.props.navigation.goBack();
								});
						}}
					/>
				</View>
			</View>
		);
	}
}

export default Filter;
