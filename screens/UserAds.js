import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ChatItem from "./ChatItem";
import api from "../api/api";

class UserAds extends Component {
	state = { products: [] };
	componentDidMount() {
		let user = this.props.navigation.getItem("user");
		api.product.userProducts(user.id).then(res => {
			this.setState({ ...this.state, products: res.data.data });
		});
	}
	render() {
		let user = this.props.navigation.getItem("user");
		let { products } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<ChatItem {...{ user }} />
				<FlatList
					keyExtractor={e => e.id.toString()}
					renderItem={({ item }) => (
						<ProductItem horizontal {...{ item }} />
					)}
					data={products}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		);
	}
}

export default UserAds;
