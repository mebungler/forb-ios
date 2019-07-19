import React, { useEffect } from "react";
import {
	View,
	Dimensions,
	StyleSheet,
	TouchableWithoutFeedback,
	Text,
	Animated
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { scaleTime, scaleLinear } from "d3-scale";
import * as shape from "d3-shape";
import Colors from "../constants/Colors";
import Cursor from "./Cursor";

const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get("window");
const height = 240;
const strokeWidth = 2;
const padding = strokeWidth / 2;
const CURSOR_RADIUS = 8;
const STROKE_WIDTH = CURSOR_RADIUS / 2;
const getDomain = domain => [Math.min(...domain), Math.max(...domain)];

export default ({ data }) => {
	const animateChart = (e, index) => {};
	const scaleX = scaleTime()
		.domain(getDomain(data.map(d => d.date)))
		.range([0, width - 30]);
	const scaleY = scaleLinear()
		.domain(getDomain(data.map(d => d.value)))
		.range([height - padding, padding]);
	const d = shape
		.line()
		.x(p => scaleX(p.date))
		.y(p => scaleY(p.value))
		.curve(shape.curveBasis)(data)
		.toString();
	return (
		<>
			<View style={styles.container}>
				<Svg style={StyleSheet.absoluteFill}>
					<Defs>
						<LinearGradient
							id="gradient"
							x1="50%"
							y1="0%"
							x2="50%"
							y2="100%"
						>
							<Stop offset="0%" stopColor="#cee3f9" />
							<Stop offset="80%" stopColor="#ddedfa" />
							<Stop offset="100%" stopColor="#feffff" />
						</LinearGradient>
					</Defs>
					<Path
						d={`${d}L ${width - 30} ${height} L 0 ${height}`}
						fill="url(#gradient)"
					/>
					<Path
						fill="transparent"
						stroke="#3977e3"
						{...{ d, strokeWidth }}
					/>
				</Svg>
			</View>
			<View
				style={{
					paddingLeft: 15,
					paddingRight: 15,
					paddingTop: 15,
					flexDirection: "row",
					justifyContent: "space-evenly",
					width: width
				}}
			>
				{data.map((e, index) => {
					return (
						<TouchableWithoutFeedback
							onPress={() => animateChart(e, index)}
						>
							<Text style={{ color: Colors.black }}>
								{e.date}
							</Text>
						</TouchableWithoutFeedback>
					);
				})}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: width - 30,
		height
	}
});
