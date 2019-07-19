import React, { Component, PropTypes } from "react";
import { View, Text, Dimensions } from "react-native";

class DefaultText extends Component {
    render() {
        let { width } = Dimensions.get("window");
        let {
            icon: Icon,
            editIcon: EditIcon,
            name,
            text,
            style,
            editable
        } = this.props;
        return (
            <View
                style={[
                    { flexDirection: "row" },
                    style,
                    editable && {
                        width: width - 60,
                        marginBottom: 15,
                        marginTop: 15
                    }
                ]}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 24
                    }}
                >
                    <Icon />
                </View>
                <View
                    style={{
                        marginLeft: 15,
                        justifyContent: "space-between",
                        flexDirection: "row",
                        flex: 1
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontWeight: "100",
                                color: "#c4c4c4",
                                fontSize: 14
                            }}
                        >
                            {name}
                        </Text>
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                fontSize: 16
                            }}
                        >
                            {text}
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {editable && <EditIcon />}
                    </View>
                </View>
            </View>
        );
    }
}

export default DefaultText;
