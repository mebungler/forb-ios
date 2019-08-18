import React, { Component } from "react";

import { StyleSheet, View, FlatList, Text } from "react-native";
import ProductItem from "./ProductItem";
import { connect } from "react-redux";
import Colors from "../constants/Colors";

import { favoritesLoaded } from "../actions/actions";

import StorageService from "../services/StorageService";

import Layout from "../constants/Layout";

import strings from "../localization/Strings";
const { width, height } = Layout;

class Favorites extends Component {
	componentDidMount() {
		this.props.dispatch(favoritesLoaded(StorageService.getFavorites()));
	}
	updateFavorites = () =>
		this.props.dispatch(favoritesLoaded(StorageService.getFavorites()));
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
								{strings.noFavorites}
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
