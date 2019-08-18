import React, { Component, PropTypes } from "react";
import Header from "../components/Header";
import SingleChat from "./SingleChat";
import { FlatList } from "react-native";
import Colors from "../constants/Colors";
import { populateMessages } from "../actions/thunk";
import { connect } from "react-redux";
import { routeChange } from "../actions/actions";
import strings from "../localization/Strings";

// const messages = [
// 	{
// 		user: {
// 			photo:
// 				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png"
// 		},
// 		isLeft: true,
// 		messages: ["Hi! How are you?"],
// 		time: "7:52"
// 	},
// 	{
// 		isLeft: false,
// 		messages: [
// 			"Hi! I am fine what about you?I really need hands of help for that! Will you help me? Plz Plz Plz. I have write to you till this shitty line ends goes to next line so I keep writing!"
// 		],
// 		time: "7:53"
// 	},
// 	{
// 		user: {
// 			photo:
// 				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png"
// 		},
// 		isLeft: true,
// 		messages: [
// 			"Hey! Can you finish that project for me. ",
// 			"I really need hands of help for that! Will you help me? Plz Plz Plz. I have write to you till this shitty line ends goes to next line so I keep writing!"
// 		],
// 		time: "7:52"
// 	}
// ];

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
				/>
			</>
		);
	}
}

const mapStateToProps = ({ messages, user }) => ({ messages, user });

export default connect(mapStateToProps)(Chat);
