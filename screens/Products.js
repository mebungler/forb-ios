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

import {
	populateProducts,
	populateFavorites,
	populateCities
} from "../actions/thunk";
import { favoritesLoaded, productsLoaded } from "../actions/actions";
import strings from "../localization/Strings";
import StorageService from "../services/StorageService";

export const data = [];
const { width, height } = Layout;

class Products extends Component {
	state = {
		loading: false,
		search: [],
		searching: false,
		pageIndex: 1,
		isTile: false,
		refreshing: false
	};
	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		let categoryId = this.props.navigation.getParam("categoryId");
		this.props.dispatch(favoritesLoaded(StorageService.getFavorites()));
		this.props.dispatch(
			populateProducts(categoryId, () => {
				this.setState({ ...this.state, loading: false });
				this.props.dispatch(populateCities());
			})
		);
	}

	updateFavorites = () => {
		this.props.dispatch(favoritesLoaded(StorageService.getFavorites()));
		StorageService.saveChanges();
		this.setState({ ...this.state, searching: true }, () =>
			this.setState({ ...this.state, searching: false })
		);
	};

	refresh = () => {
		this.setState({ ...this.state, refreshing: true });
		let categoryId = this.props.navigation.getParam("categoryId");
		this.props.dispatch(
			populateProducts(categoryId, () => {
				this.setState({ ...this.state, refreshing: false });
			})
		);
	};

	loadMore = () => {
		this.setState(
			{ ...this.state, pageIndex: this.state.pageIndex + 1 },
			() => {
				api.product.getProducts(this.state.pageIndex).then(res => {
					this.props.dispatch(
						productsLoaded([
							...this.props.products,
							...res.data.data
						])
					);
				});
			}
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

	openModal = () => {
		let { changeOrientation, filter } = this;
		let { isTile } = this.state;
		let categoryId = this.props.navigation.getParam("categoryId");
		let params = { changeOrientation, isTile };
		if (categoryId || categoryId !== "") {
			params = { changeOrientation, categoryId, isTile };
		}
		params = { ...params, filter };
		this.props.navigation.navigate("Filter", params);
	};

	changeOrientation = val => {
		this.setState({ ...this.state, searching: true, isTile: val }, () =>
			this.setState({ ...this.state, searching: false })
		);
	};

	filter = data => {};

	pickCity = e => {
		this.setState({ ...this.state, loading: true });
		api.product.postSearch({ city_id: e }).then(res => {
			this.setState({
				...this.state,
				search: res.data.data,
				searching: true,
				loading: false
			});
		});
	};

	render() {
		let { products, favorites, navigation, cities } = this.props;
		let { loading, searching, search, isTile } = this.state;
		let {
			updateFavorites,
			search: searchFunc,
			openModal,
			changeOrientation,
			pickCity,
			filter
		} = this;
		return (
			<React.Fragment>
				<Header
					name={strings.productsAndServices}
					main
					openDrawer={navigation.openDrawer}
					{...{
						search: searchFunc,
						openModal,
						cities,
						pickCity
					}}
				/>
				<FlatList
					key={isTile ? "h" : "v"}
					extraData={loading}
					showsVerticalScrollIndicator={false}
					style={{
						backgroundColor: Colors.lightGray,
						paddingBottom: 30
					}}
					onEndReached={this.loadMore}
					onEndReachedThreshold={0.5}
					initialNumToRender={20}
					onRefresh={this.refresh}
					refreshing={this.state.refreshing}
					contentContainerStyle={{ paddingBottom: 30 }}
					numColumns={isTile ? 1 : 2}
					data={searching ? search : products}
					renderItem={({ item }) => (
						<ProductItem
							full
							{...{
								item,
								updateFavorites,
								isFavorite: StorageService.isFavorite(item),
								horizontal: isTile
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
										{strings.adsDoNotExist}
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

const mapStateToProps = ({ products, favorites, cities }) => ({
	products,
	favorites,
	cities
});

export default connect(mapStateToProps)(Products);
