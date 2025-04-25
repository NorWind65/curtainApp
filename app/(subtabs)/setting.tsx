import { View, Text, Image , TextInput, Platform, Pressable, Button, 
    TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
  import React from 'react'
  import { useState, useEffect } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import styles from "../../assets/styles/device.styles"
  import COLORS from './../../constants/colors';
  import { Link } from 'expo-router';
  import { useRouter } from "expo-router";

export default function setting() {
    const [deviceID, setDeviceID] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();

    const handleUpButton = () => {};
    
    const handleStopButton = () => {};

    const handleDownButton = () => {};
    
    const handleConfirmDevice = () => {};



    return (
        <KeyboardAvoidingView
        style = {{flex: 1}}
        behavior = {Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                {/* HEADER */}
                <View style = {styles.header}>
                        <Text style = {styles.title}>
                        Setting Device
                        </Text>
                </View>
                <View style = {styles.formContainer}>
                    <View style = {styles.card}> 
                        {/* TUTORIAL */}
                        <Text style = {styles.label}>Open and Close fully your devices with below buttons 3 or more times</Text>
                        {/* UP BUTTON */}
                        <TouchableOpacity 
                        onPress={() => {}}
                        style={styles.settingButton}>
                            <Ionicons 
                                name="arrow-up-circle" 
                                size={120} 
                                color="green" 
                            />
                        </TouchableOpacity>

                        {/* STOP BUTTON */}
                        <TouchableOpacity 
                        onPress={() => {}}
                        style={styles.settingButton}>
                            <Ionicons 
                                name="stop-circle" 
                                size={120} 
                                color= "#fcba03"
                            />
                        </TouchableOpacity>

                        {/* DOWN BUTTON */}
                        <TouchableOpacity 
                        onPress={() => {}}
                        style={styles.settingButton}>
                            <Ionicons 
                                name = "arrow-down-circle" 
                                size = {120} 
                                color = "red"
                            />
                        </TouchableOpacity>

                        
                        {/* SAVE BUTTON */}
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {handleConfirmDevice}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>CONFIRM DEVICE</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}