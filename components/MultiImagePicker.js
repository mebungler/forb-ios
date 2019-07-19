import React, { Component } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableWithoutFeedback,
	Image
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";

class MultiImagePicker extends Component {
	pickImage = async () => {
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true
		}).then(image => {
			this.props.add(image.path);
		});
	};
	render() {
		let { photos, add = () => {}, remove = () => {} } = this.props;
		return (
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{photos.map((e, i) => {
					return (
						<View
							style={{
								margin: 15,
								marginLeft: 2.5,
								marginRight: 2.5
							}}
						>
							<Image
								source={{ uri: e }}
								style={{
									width: 100,
									height: 100,
									borderRadius: 20
								}}
							/>
							<View
								style={{
									justifyContent: "flex-start",
									alignItems: "flex-end",
									padding: 5,
									marginTop: -105
								}}
							>
								<TouchableWithoutFeedback
									onPress={() => remove(i)}
								>
									<Icon
										name="cancel"
										size={25}
										color={Colors.white}
									/>
								</TouchableWithoutFeedback>
							</View>
						</View>
					);
				})}
				<TouchableWithoutFeedback onPress={this.pickImage}>
					<View
						style={{
							height: 100,
							width: 100,
							borderRadius: 20,
							borderStyle: "dashed",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#f7f7f7",
							borderWidth: 1,
							margin: 15,
							marginLeft: 2.5,
							marginRight: 10,
							borderColor: "#d7d7d7"
						}}
					>
						<Icon name="change-photo" color="#d7d7d7" size={30} />
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		);
	}
}

export default MultiImagePicker;
