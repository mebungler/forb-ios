import React, { Component } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import { populateServices } from "../actions/thunk";
import ServiceItem from "./ServiceItem";
import { connect } from "react-redux";
import Layout from "../constants/Layout";
import strings from "../localization/Strings";

const { width, height } = Layout;

class Services extends Component {
	state = { loading: false };
	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		this.props.dispatch(
			populateServices(() =>
				this.setState({ ...this.state, loading: false })
			)
		);
	}
	render() {
		let { loading } = this.state;
		let { services } = this.props;
		return (
			<FlatList
				contentContainerStyle={{ paddingBottom: 30 }}
				style={{
					backgroundColor: Colors.lightGray,
					padding: 7.5,
					flex: 1
				}}
				data={services}
				numColumns={2}
				renderItem={ServiceItem}
				keyExtractor={e => e.id}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => {
					if (!loading && services.length <= 0) {
						return (
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									width,
									height: height - 120
								}}
							>
								<Text
									style={{
										color: Colors.gray,
										fontSize: 18
									}}
								>
									{strings.servicesDoNotExist}
								</Text>
							</View>
						);
					} else
						return (
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									width,
									height: height - 120
								}}
							>
								<ActivityIndicator size="large" />
							</View>
						);
				}}
			/>
		);
	}
}

const mapStateToProps = ({ services }) => ({ services });

export default connect(mapStateToProps)(Services);
