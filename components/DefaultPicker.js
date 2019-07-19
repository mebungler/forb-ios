import React, { Component, PropTypes } from "react";
import { View, Text, TouchableHighlight, Dimensions } from "react-native";
import Picker from "react-native-picker-select";
import Colors from "../constants/Colors";

let { width } = Dimensions.get("window");
class DefaultSelect extends Component {
    render() {
        let {
            leftIcon: LeftIcon = null,
            rightIcon: RightIcon = () => {
                return null;
            },
            name,
            description,
            data = [
                { label: "first", value: "first" },
                { label: "second", value: "second" }
            ],
            placeholder = "",
            selectedValue,
            onValueChange = () => {},
            style,
            fill,
            horizontal,
            small
        } = this.props;
        return (
            <Picker
                placeholder={{ value: "", label: placeholder }}
                items={data}
                {...{ onValueChange }}
            >
                <View
                    style={[
                        {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 15
                        },
                        style,
                        !fill && { width: width - 60 }
                    ]}
                >
                    {LeftIcon && (
                        <View style={{ alignItems: "center", flex: 0.2 }}>
                            <LeftIcon />
                        </View>
                    )}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-start",
                            marginLeft: 10,
                            flexDirection: horizontal ? "row" : "column"
                        }}
                    >
                        <Text
                            style={{
                                color: small ? Colors.black : Colors.pink,
                                fontSize: small ? 14 : 18,
                                fontWeight: "400"
                            }}
                        >
                            {selectedValue === "" ||
                            placeholder === selectedValue
                                ? placeholder
                                : selectedValue}
                        </Text>
                        {description && (
                            <Text
                                style={{
                                    fontWeight: "100",
                                    fontSize: 18,
                                    color: Colors.darkGray
                                }}
                            >
                                {description}
                            </Text>
                        )}
                    </View>
                    <TouchableHighlight
                        underlayColor="#fe0000"
                        style={{ padding: 5 }}
                    >
                        <RightIcon />
                    </TouchableHighlight>
                </View>
            </Picker>
        );
    }
}

export default DefaultSelect;
