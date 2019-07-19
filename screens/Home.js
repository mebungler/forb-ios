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

const images = [
	"https://cdn.pixabay.com/photo/2018/12/09/11/24/sale-3864703_960_720.jpg",
	"/uploads/ads/51/original/1562860036.jpg",
	"/uploads/ads/51/original/1562947116.jpg",
	"/uploads/ads/51/original/1563123932.jpg",
	"/uploads/ads/51/original/1563153995.jpeg"
];

const cats = [
	{ photo: "https://i.ibb.co/hXRVQqQ/car.png", name: "Transport" },
	{
		photo: "https://i.ibb.co/M8JHGCC/construction.png",
		name: "Construction"
	},
	{ photo: "https://i.ibb.co/p4RgnkL/electro.png", name: "Electronics" },
	{ photo: "https://i.ibb.co/ZMfDWkT/exchange.png", name: "Exchange" },
	{ photo: "https://i.ibb.co/FKhqSTX/food.png", name: "Food" },
	{ photo: "https://i.ibb.co/8b3QNSL/metall.png", name: "Metall" },
	{ photo: "https://i.ibb.co/M5QdVmv/packing.png", name: "Packing" },
	{ photo: "https://i.ibb.co/VWzQWRB/paper.png", name: "Paper" },
	{ photo: "https://i.ibb.co/rkdzm9P/plastic.png", name: "Plastic" },
	{ photo: "https://i.ibb.co/DwL7ckp/polyg.png", name: "Polygraphic" },
	{ photo: "https://i.ibb.co/JkSDLg3/real-estate.png", name: "Real estate" },
	{ photo: "https://i.ibb.co/ZTjwyMX/service.png", name: "Service" },
	{ photo: "https://i.ibb.co/86CvTPp/wood.png", name: "Wood" },
	{ photo: "https://i.ibb.co/pZwWZYJ/work.png", name: "Job" }
];

class Home extends Component {
	state = { banner: [], loading: false };
	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		api.main.getBanner().then(res => {
			this.setState({
				...this.state,
				banner: res.data.map(e => e.photo)
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
				<Header name="Выберите категорию" />
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
											Категории не существует
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
