import React, { Component } from "react";
import {
	StyleSheet,
	View,
	FlatList,
	ScrollView,
	ActivityIndicator,
	Text
} from "react-native";
import Header from "../components/Header";
import CategoryItem from "./CategoryItem";
import { connect } from "react-redux";
import Banner from "../components/Banner";
import { populateCategories } from "../actions/thunk";
import Colors from "../constants/Colors";
import api from "../api/api";
import strings from "../localization/Strings";

class Home extends Component {
	state = { banner: [], loading: false };
	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		api.main.getBanner().then(res => {
			this.setState({
				...this.state,
				banner: res.data
			});
			this.props.dispatch(
				populateCategories(() => {
					this.setState({ ...this.state, loading: false });
				})
			);
		});
	}
	render() {
		let { categories } = this.props;
		let { banner, loading } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<Header name={strings.chooseCategory} />
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{ backgroundColor: Colors.lightGray }}
				>
					{banner.length > 0 && (
						<Banner animated type="card" images={banner} />
					)}
					<FlatList
						data={categories}
						numColumns={3}
						renderItem={CategoryItem}
						keyExtractor={e => e.photo}
						showsVerticalScrollIndicator={false}
						style={{
							padding: 15,
							paddingBottom: 30,
							backgroundColor: Colors.lightGray
						}}
						ListEmptyComponent={() => {
							if (!loading && categories.length <= 0) {
								return (
									<View
										style={{
											justifyContent: "center",
											alignItems: "center",
											paddingTop: 30
										}}
									>
										<Text
											style={{
												color: Colors.gray,
												fontSize: 18
											}}
										>
											{strings.categoriesDoNotExist}
										</Text>
									</View>
								);
							} else
								return (
									<View
										style={{
											justifyContent: "center",
											alignItems: "center"
										}}
									>
										<ActivityIndicator size="large" />
									</View>
								);
						}}
					/>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(Home);
