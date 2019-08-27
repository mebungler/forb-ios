import React, { Component } from "react";
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	Image,
	TouchableWithoutFeedback,
	Linking
} from "react-native";
import Colors from "../constants/Colors";
import Icon from "../services/IconService";
import { CheckBox } from "react-native-elements";
import logoText from "../assets/images/logoText.png";
import paynet from "../assets/images/paynet.png";
import payme from "../assets/images/payme.png";
import upay from "../assets/images/upay.png";
import money from "../assets/images/money.png";
import click from "../assets/images/click.png";
import Layout from "../constants/Layout";
import RoundButton from "../components/RoundButton";
import strings from "../localization/Strings";
import api from "../api/api";
import StorageService from "../services/StorageService";

let { width } = Layout;

class Payment extends Component {
	state = {
		balance: "150 000 сум",
		currentBalance: "100 000 сум",
		bonuses: "3",
		cashbacks: "0",
		payment: 0,
		payments: [],
		paymentType: 4
	};
	componentDidMount() {
		api.main.getTariff().then(res => {
			this.setState({ ...this.state, payments: res.data });
		});
	}
	render() {
		let {
			balance,
			currentBalance,
			bonuses,
			cashbacks,
			payment,
			payments,
			paymentType
		} = this.state;
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text
					style={{
						margin: 15,
						fontWeight: "bold",
						fontSize: 20,
						color: Colors.black
					}}
				>
					{strings.paymentAmount}
				</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{payments.map((e, i) => {
						return (
							<TouchableWithoutFeedback
								onPress={() =>
									this.setState({
										...this.state,
										payment: i
									})
								}
							>
								<View
									style={[
										{
											width: width - width / 3,
											height: 320,
											borderRadius: 20,
											borderColor: Colors.blue,
											borderWidth:
												payment === i ? 0.5 : 0,
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: Colors.white,
											margin: 7.5,
											marginLeft: i === 0 ? 15 : 7.5
										},
										payment === i
											? {}
											: {
													shadowOpacity: 1,
													shadowColor: Colors.gray,
													shadowOffset: { height: 5 }
											  }
									]}
								>
									<CheckBox
										checked={payment === i}
										containerStyle={{
											backgroundColor: "transparent",
											borderWidth: 0,
											padding: 0,
											margin: 0,
											justifyContent: "flex-start"
										}}
										iconType="material-community"
										checkedIcon="circle-slice-8"
										checkedColor={Colors.blue}
										uncheckedIcon="checkbox-blank-circle-outline"
										textStyle={{
											color: Colors.black,
											fontWeight: "400"
										}}
										onPress={() =>
											this.setState({
												...this.state,
												payment: i
											})
										}
									/>
									<Text
										style={{
											fontWeight: "bold",
											color: Colors.black,
											marginTop: 15
										}}
									>
										{e.price}
									</Text>
									<Text
										style={{
											fontWeight: "bold",
											color: Colors.black,
											marginBottom: 30,
											fontSize: 18
										}}
									>
										{e.name}
									</Text>
									<Text
										style={{
											fontWeight: "100",
											color: Colors.black,
											marginBottom: 30
										}}
									>
										{e.note}
									</Text>
									<Image
										source={money}
										style={{ width: 140, height: 140 }}
									/>
								</View>
							</TouchableWithoutFeedback>
						);
					})}
				</ScrollView>
				<Text
					style={{
						margin: 15,
						fontWeight: "bold",
						fontSize: 20,
						color: Colors.black
					}}
				>
					{strings.paymentMethod}
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						borderColor: Colors.darkGray,
						padding: 15
					}}
				>
					<Image source={payme} style={{ width: 140, height: 40 }} />
					<CheckBox
						checked={paymentType === 4}
						containerStyle={{
							backgroundColor: "transparent",
							borderWidth: 0,
							padding: 0,
							margin: 0,
							justifyContent: "flex-start"
						}}
						iconType="material-community"
						checkedIcon="circle-slice-8"
						checkedColor={Colors.blue}
						uncheckedIcon="checkbox-blank-circle-outline"
						textStyle={{
							color: Colors.black,
							fontWeight: "400"
						}}
						onPress={() =>
							this.setState({
								...this.state,
								paymentType: 4
							})
						}
					/>
				</View>
				<View style={{ padding: 15, flexDirection: "row" }}>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<Icon name="money" size={18} />
					</View>
					<View style={{ paddingLeft: 15 }}>
						<Text
							style={{
								fontWeight: "100",
								color: Colors.darkGray
							}}
						>
							{strings.totalAmount}
						</Text>
						<Text style={{ fontWeight: "bold", fontSize: 18 }}>
							{payments.length > 0 && payments[payment].price}
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						marginBottom: 30
					}}
				>
					<RoundButton
						fill
						color={Colors.pink}
						bold
						big
						medium
						fillSize
						text={strings.cancel}
						onPress={this.props.navigation.goBack}
					/>
					<RoundButton
						fillSize
						fill
						medium
						color={Colors.blue}
						bold
						big
						onPress={() =>
							Linking.openURL(
								`http://forb.uz/payment?id=${
									payments[payment].id
								}&token=${StorageService.getState().token}`
							)
						}
						text={strings.pay}
					/>
				</View>
			</ScrollView>
		);
	}
}

export default Payment;

/*<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						borderBottomWidth: 1,
						borderColor: Colors.darkGray,
						padding: 15
					}}
				>
					<Icon size={40} color={Colors.black} name="agent" />
					<CheckBox
						checked={paymentType === 0}
						containerStyle={{
							backgroundColor: "transparent",
							borderWidth: 0,
							padding: 0,
							margin: 0,
							justifyContent: "flex-start"
						}}
						iconType="material-community"
						checkedIcon="circle-slice-8"
						checkedColor={Colors.blue}
						uncheckedIcon="checkbox-blank-circle-outline"
						textStyle={{
							color: Colors.black,
							fontWeight: "400"
						}}
						onPress={() =>
							this.setState({
								...this.state,
								paymentType: 0
							})
						}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						borderBottomWidth: 1,
						borderColor: Colors.darkGray,
						padding: 15
					}}
				>
					<Image source={click} style={{ width: 110, height: 40 }} />
					<CheckBox
						checked={paymentType === 1}
						containerStyle={{
							backgroundColor: "transparent",
							borderWidth: 0,
							padding: 0,
							margin: 0,
							justifyContent: "flex-start"
						}}
						iconType="material-community"
						checkedIcon="circle-slice-8"
						checkedColor={Colors.blue}
						uncheckedIcon="checkbox-blank-circle-outline"
						textStyle={{
							color: Colors.black,
							fontWeight: "400"
						}}
						onPress={() =>
							this.setState({
								...this.state,
								paymentType: 1
							})
						}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						borderBottomWidth: 1,
						borderColor: Colors.darkGray,
						padding: 15
					}}
				>
					<Image source={paynet} style={{ width: 210, height: 40 }} />
					<CheckBox
						checked={paymentType === 2}
						containerStyle={{
							backgroundColor: "transparent",
							borderWidth: 0,
							padding: 0,
							margin: 0,
							justifyContent: "flex-start"
						}}
						iconType="material-community"
						checkedIcon="circle-slice-8"
						checkedColor={Colors.blue}
						uncheckedIcon="checkbox-blank-circle-outline"
						textStyle={{
							color: Colors.black,
							fontWeight: "400"
						}}
						onPress={() =>
							this.setState({
								...this.state,
								paymentType: 2
							})
						}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						borderBottomWidth: 1,
						borderColor: Colors.darkGray,
						padding: 15
					}}
				>
					<Image source={upay} style={{ width: 130, height: 40 }} />
					<CheckBox
						checked={paymentType === 3}
						containerStyle={{
							backgroundColor: "transparent",
							borderWidth: 0,
							padding: 0,
							margin: 0,
							justifyContent: "flex-start"
						}}
						iconType="material-community"
						checkedIcon="circle-slice-8"
						checkedColor={Colors.blue}
						uncheckedIcon="checkbox-blank-circle-outline"
						textStyle={{
							color: Colors.black,
							fontWeight: "400"
						}}
						onPress={() =>
							this.setState({
								...this.state,
								paymentType: 3
							})
						}
					/>
				</View>*/

// ************************************************************

/*<View
					style={{
						margin: 15,
						padding: 15,
						borderRadius: 20,
						shadowColor: Colors.gray,
						shadowOpacity: 1,
						backgroundColor: Colors.white,
						shadowOffset: { heigth: 5 }
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 15
						}}
					>
						<Text style={{ color: Colors.darkGray, fontSize: 18 }}>
							Баланс
						</Text>
						<Image
							style={{ height: 30, width: 100 }}
							source={logoText}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 30
						}}
					>
						<Text
							style={{
								color: Colors.pink,
								fontSize: 20,
								fontWeight: "bold",
								fontSize: 18
							}}
						>
							{balance}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 15
						}}
					>
						<Text
							style={{
								color: Colors.darkGray,
								fontSize: 18
							}}
						>
							Текущий счет
						</Text>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18
							}}
						>
							{currentBalance}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 15
						}}
					>
						<Text
							style={{
								color: Colors.darkGray,
								fontSize: 18
							}}
						>
							Бонусы
						</Text>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18
							}}
						>
							{bonuses}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 15
						}}
					>
						<Text
							style={{
								color: Colors.darkGray,
								fontSize: 18
							}}
						>
							Возвраты
						</Text>
						<Text
							style={{
								color: Colors.black,
								fontWeight: "bold",
								fontSize: 18
							}}
						>
							{cashbacks}
						</Text>
					</View>
				</View>
				<View
					style={{ flexDirection: "row", justifyContent: "center" }}
				>
					<RoundButton
						fill
						color={Colors.blue}
						big
						bold
						animated
						text="Пополнить счет"
					/>
				</View>*/
