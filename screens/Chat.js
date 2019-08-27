import React, { Component, PropTypes } from "react";
import Header from "../components/Header";
import SingleChat from "./SingleChat";
import { FlatList, Text, View, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { populateMessages } from "../actions/thunk";
import { connect } from "react-redux";
import { routeChange } from "../actions/actions";
import strings from "../localization/Strings";

class Chat extends Component {
	componentDidMount() {
		let user = this.props.navigation.getParam("user");
		this.props.dispatch(populateMessages(user.id));
		this.props.dispatch(
			routeChange({
				...this.props.route,
				getter_id: user.user_id,
				chat_id: user.id,
				stay: true
			})
		);
	}
	render() {
		let user = this.props.navigation.getParam("user");
		let { messages, user: localUser } = this.props;
		return (
			<>
				<Header
					{...{ user }}
					description={user.online ? strings.online : null}
					back
				/>
				<FlatList
					style={{
						backgroundColor: Colors.lightGray,
						transform: [{ scaleY: -1 }]
					}}
					data={messages}
					keyExtractor={e => e.id.toString()}
					renderItem={({ item }) => (
						<SingleChat {...{ item, user: localUser }} />
					)}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={() => (
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								transform: [{ scaleY: -1 }],
								marginTop:
									Dimensions.get("window").height / 2 - 40
							}}
						>
							<Text style={{ color: Colors.darkGray }}>
								{strings.correspendenceDoesNotExist}
							</Text>
						</View>
					)}
				/>
			</>
		);
	}
}

const mapStateToProps = ({ messages, user }) => ({ messages, user });

export default connect(mapStateToProps)(Chat);
