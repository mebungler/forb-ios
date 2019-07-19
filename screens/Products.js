import React, { Component } from "react";
import {
	StyleSheet,
	View,
	FlatList,
	TouchableWithoutFeedback,
	Text,
	ActivityIndicator
} from "react-native";
import Colors from "../constants/Colors";
import Icon from "../services/IconService";
import ProductItem from "./ProductItem";
import Header from "../components/Header";
import { connect } from "react-redux";
import Layout from "../constants/Layout";
import api from "../api/api";

import { populateProducts, populateFavorites } from "../actions/thunk";
import { favoritesLoaded } from "../actions/actions";

import StorageService from "../services/StorageService";

export const data = [];
const { width, height } = Layout;

class Products extends Component {
	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		let categoryId = this.props.navigation.getParam("categoryId");
		this.props.dispatch(favoritesLoaded(StorageService.getFavorites()));
		this.props.dispatch(
			populateProducts(categoryId, () =>
				this.setState({ ...this.state, loading: false })
			)
		);
	}
	state = { loading: false, search: [], searching: false };

	updateFavorites = () => {
		this.props.dispatch(favoritesLoaded(StorageService.getFavorites()));
		StorageService.saveChanges();
		this.setState({ ...this.state, searching: true }, () =>
			this.setState({ ...this.state, searching: false })
		);
	};

	search = query => {
		this.setState({ ...this.state, loading: true });
		api.product.search(query).then(res => {
			this.setState({
				...this.state,
				search: res.data.data,
				searching: true,
				loading: false
			});
		});
	};

	render() {
		let { products, favorites, navigation } = this.props;
		let { loading, searching, search } = this.state;
		let { updateFavorites } = this;
		return (
			<React.Fragment>
				<Header
					name="Товары и услуги"
					main
					openDrawer={navigation.openDrawer}
					{...{ search: this.search }}
				/>
				<FlatList
					extraData={loading}
					showsVerticalScrollIndicator={false}
					style={{
						backgroundColor: Colors.lightGray,
						paddingBottom: 30
					}}
					contentContainerStyle={{ paddingBottom: 30 }}
					numColumns={2}
					data={searching ? search : products}
					renderItem={({ item }) => (
						<ProductItem
							{...{
								item,
								updateFavorites,
								isFavorite: StorageService.isFavorite(item)
							}}
						/>
					)}
					ListEmptyComponent={() => {
						if (
							(!loading && products.length <= 0) ||
							(!loading && searching && search.length <= 0)
						) {
							return (
								<View
									style={{
										justifyContent: "center",
										alignItems: "center",
										width,
										height: height - 200
									}}
								>
									<Text
										style={{
											color: Colors.gray,
											fontSize: 18
										}}
									>
										Объявления не существует
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
										height: height - 200
									}}
								>
									<ActivityIndicator size="large" />
								</View>
							);
					}}
					keyExtractor={e => e.id}
				/>
				<View
					style={{
						position: "absolute",
						flexDirection: "row",
						justifyContent: "flex-end",
						alignItems: "flex-end",
						bottom: 15,
						right: 15
					}}
				>
					<TouchableWithoutFeedback
						onPress={() =>
							this.props.navigation.navigate("AddProduct")
						}
					>
						<View
							style={{
								width: 50,
								height: 50,
								backgroundColor: Colors.pink,
								borderRadius: 25,
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Icon
								name="plus_ad"
								size={25}
								color={Colors.white}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ products, favorites }) => ({ products, favorites });

export default connect(mapStateToProps)(Products);
