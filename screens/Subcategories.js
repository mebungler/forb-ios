import React, { Component } from "react";
import {
	StyleSheet,
	View,
	FlatList,
	Text,
	Dimensions,
	ActivityIndicator
} from "react-native";
import SubcategoryItem from "./SubcategoryItem";
import Colors from "../constants/Colors";
import api from "../api/api";
import strings from "../localization/Strings";
import NavigationService from "../services/NavigationService";

class Subcategories extends Component {
	state = { data: [] };
	componentDidMount() {
		this.populate();
	}
	populate = (id = this.props.navigation.getParam("item").id) => {
		this.setState({ data: [] });
		api.category.subCategories(id).then(res => {
			if (!res.data.data || res.data.data.length <= 0) {
				NavigationService.navigate("Products", { categoryId: id });
				return;
			}
			this.setState({
				...this.state,
				data: [{ name: strings.all, id: id }, ...res.data.data]
			});
		});
	};
	render() {
		let item = this.props.navigation.getParam("item");
		let { data } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={data}
					style={{
						backgroundColor: Colors.lightGray
					}}
					contentContainerStyle={{
						paddingBottom: 15
					}}
					renderItem={({ item: child }) => (
						<SubcategoryItem item={child} onPress={this.populate} />
					)}
					keyExtractor={e => e.id.toString()}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={() => (
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								flex: 1,
								height: Dimensions.get("window").height - 160
							}}
						>
							<ActivityIndicator size="large" />
						</View>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Subcategories;
