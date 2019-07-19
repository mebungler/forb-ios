import React, { Component, PropTypes } from "react";
import Header from "../components/Header";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import ChatItem from "./ChatItem";
import AuthPrompt from "../components/AuthPrompt";
import { populateChats } from "../actions/thunk";
import { connect } from "react-redux";
import api from "../api/api";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

const { width, height } = Layout;

class Chats extends Component {
	state = { loading: false };
	componentDidMount() {
		this.props.dispatch(
			populateChats(() =>
				this.setState({ ...this.state, loading: false })
			)
		);
	}
	render() {
		let { chats, authenticated } = this.props;
		let { loading } = this.state;
		if (!authenticated) {
			return <AuthPrompt />;
		}
		return (
			<React.Fragment>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 30 }}
					data={chats}
					renderItem={ChatItem}
					keyExtractor={item => {
						return item.id.toString();
					}}
					ListEmptyComponent={() => {
						if (!loading && chats.length <= 0) {
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
										Переписки не существует
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
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ chats, user }) => ({
	chats,
	authenticated: Object.keys(user).length > 0
});

export default connect(mapStateToProps)(Chats);
