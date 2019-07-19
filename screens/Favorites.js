import React, { Component } from "react";

import { StyleSheet, View, FlatList, Text } from "react-native";
import ProductItem from "./ProductItem";
import { connect } from "react-redux";
import Colors from "../constants/Colors";

import { populateFavorites } from "../actions/thunk";

import Layout from "../constants/Layout";

const { width, height } = Layout;

class Favorites extends Component {
	componentDidMount() {
		this.props.dispatch(populateFavorites());
	}
	updateFavorites = () => this.props.dispatch(populateFavorites());
	render() {
		let { favorites } = this.props;
		let { updateFavorites } = this;
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					contentContainerStyle={{ paddingBottom: 30 }}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					data={favorites}
					renderItem={({ item }) => (
						<ProductItem
							{...{
								item,
								isFavorite:
									favorites.filter(e => e.id === item.id)
										.length > 0,
								updateFavorites
							}}
						/>
					)}
					keyExtractor={e => e.id}
					ListEmptyComponent={() => (
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								width,
								height: height - 120
							}}
						>
							<Text style={{ color: Colors.gray, fontSize: 24 }}>
								Нет избранных
							</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ favorites }) => ({ favorites });

export default connect(mapStateToProps)(Favorites);
