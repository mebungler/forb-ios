import React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";

export default ({ iconName, text, notifications, onPress }) => {
    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            <View
                style={{
                    flexDirection: "row",
                    margin: 15,
                    marginTop: 7.5,
                    marginBottom: 7.5
                }}
            >
                <View
                    style={{
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Icon name={iconName} size={20} color={Colors.white} />
                </View>
                <Text style={{ fontSize: 18, color: Colors.white }}>
                    {text}
                </Text>
                <View style={{ alignItems: "flex-end", flex: 1 }}>
                    {notifications > 0 && (
                        <View
                            style={{
                                backgroundColor: Colors.pink,
                                borderRadius: 10,
                                width: 20,
                                height: 20,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.white,
                                    fontWeight: "100"
                                }}
                            >
                                {notifications}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
