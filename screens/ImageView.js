import React, { Component } from "react";
import {
	StyleSheet,
	View,
	ActivityIndicator,
	TouchableWithoutFeedback
} from "react-native";
import { urlResolve } from "../api/api";
import ImageViewer from "react-native-image-zoom-viewer";
import Feather from "react-native-vector-icons/Feather";

class ImageView extends Component {
	state = {
		imageIndex: parseInt(this.props.navigation.getParam("imageIndex"))
	};
	render() {
		let images = this.props.navigation.getParam("images");
		return (
			<View
				style={{
					flex: 1,
					...StyleSheet.absoluteFillObject,
					backgroundColor: "black"
				}}
			>
				<ImageViewer
					imageUrls={
						images
							? images.map((el, index) => ({
									url: urlResolve(el)
							  }))
							: []
					}
					enableSwipeDown
					loadingRender={() => <ActivityIndicator size="large" />}
					renderHeader={() => (
						<View
							style={{
								justifyContent: "flex-start",
								alignItems: "flex-start",
								margin: 15
							}}
						>
							<TouchableWithoutFeedback
								onPress={() => {
									this.setState({
										...this.state,
										imageIndex: null
									});
									this.props.navigation.goBack();
								}}
							>
								<Feather name="x" color="white" size={25} />
							</TouchableWithoutFeedback>
						</View>
					)}
					onSwipeDown={() => {
						this.setState({ ...this.state, imageIndex: null });
						this.props.navigation.goBack();
					}}
					index={this.state.imageIndex ? this.state.imageIndex : 0}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default ImageView;
