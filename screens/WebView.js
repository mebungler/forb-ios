import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import strings from "../localization/Strings";

class Web extends Component {
	render() {
		let url = this.props.navigation.getParam("url");
		let title = this.props.navigation.getParam("title");
		let source = this.props.navigation.getParam("source");
		if (!title) {
			title = strings.refill;
		}
		console.warn(source);
		console.warn(!url);
		return (
			<React.Fragment>
				<Header back name={title} noMenu />
				<WebView
					style={{ flex: 1 }}
					source={!url ? { html: source } : { uri: url }}
				/>
			</React.Fragment>
		);
	}
}

export default Web;
