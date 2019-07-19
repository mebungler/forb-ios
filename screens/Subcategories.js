import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";
import SubcategoryItem from "./SubcategoryItem";
import Colors from "../constants/Colors";

class Subcategories extends Component {
	render() {
		let item = this.props.navigation.getParam("item");
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={[{ name: "Все", id: item.id }, ...item.childs]}
					style={{ backgroundColor: Colors.lightGray }}
					renderItem={SubcategoryItem}
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
							<Text
								style={{
									color: Colors.gray,
									fontSize: 18
								}}
							>
								Категории не существует
							</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Subcategories;
