import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LocationView from "react-native-location-view";
import Colors from "../constants/Colors";
import strings from "../localization/Strings";

class PickLocation extends Component {
	render() {
		let pickLocation = this.props.navigation.getParam("pickLocation");
		return (
			<View style={{ flex: 1 }}>
				<LocationView
					apiKey={"AIzaSyDk8lB-DDvFkXMdIExxQZWHSm7fKQ63hlk"}
					initialLocation={{
						latitude: 41.303624,
						longitude: 69.241629,
						latitudeDelta: 0.006866,
						longitudeDelta: 0.004757
					}}
					markerColor={Colors.pink}
					actionButtonStyle={{ backgroundColor: Colors.blue }}
					onLocationSelect={e => {
						pickLocation(e, false);
						this.props.navigation.goBack();
					}}
					actionText={strings.confirm}
				/>
			</View>
		);
	}
}

export default PickLocation;
