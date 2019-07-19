import React from "react";
import { View } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

const Border = ({ style, fill }) => {
	return (
		<React.Fragment>
			<View
				style={[
					{
						height: 1,
						borderStyle: "dashed",
						borderColor: Colors.darkGray,
						borderWidth: 1
					},
					style,
					fill ? { flex: 1 } : { width: Layout.width - 30 }
				]}
			/>
			<View
				style={{
					width: Layout.width,
					height: 1,
					backgroundColor: Colors.lightGray,
					marginTop: -1
				}}
			/>
		</React.Fragment>
	);
};

export default Border;
