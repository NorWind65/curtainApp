import { View, Text, Image , TextInput, Platform,
    TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from "react";
import { useRouter, Link } from "expo-router";
import styles from "../../assets/styles/login.styles";
import COLORS from "../../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";


export default function setting() {
    const [deviceID, setDeviceID] = useState("");
    const [deviceName, setDeviceName] = useState("");


    return (
        <View>
        <Text>setting Screen</Text>
        </View>
    )
}