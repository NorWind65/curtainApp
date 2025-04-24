import { View, Text, Image , TextInput, Platform,
    TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import styles from "../../assets/styles/login.styles";
import COLORS from "../../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";



export default function addDevices() {
    const [deviceID, setDeviceID] = useState("");
    const [devicePassword, setDevicePassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
     
    const handleAddDevice = () => {};

    return (
        <KeyboardAvoidingView
            style = {{flex: 1}}
            behavior = {Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style = {styles.container}>
                {/* ILLUSTRATION */}
                <View style ={styles.topIllustration}>
                    <Image 
                        source ={require("../../assets/images/sun.png")}
                        style= {styles.illustrationImage}
                        resizeMode= "contain"
                    />
                </View>
                {/* CARD */}
                <View style = {styles.card}>
                    {/* FORM */}
                    <View style = {styles.formContainer}>
                
                        {/* DEVICE ID */}
                        <View style= {styles.inputGroup}>
                            <Text style = {styles.label}>Device ID</Text>
                            <View style = {styles.inputContainer}>
                                <MaterialCommunityIcons 
                                name ='curtains-closed'
                                size = {20}
                                color = {COLORS.textSecondary}
                                style = {styles.inputIcon}
                                />
                                <TextInput 
                                style = {styles.input}
                                placeholder = "Enter your deviced ID"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {deviceID}
                                onChangeText = {setDeviceID}
                                keyboardType = "default"
                                autoCapitalize = "none"
                                />
                            </View>
                        </View>
                        {/* DEVICE PASSWORD */}
                        <View style= {styles.inputGroup}>
                            <Text style = {styles.label}>Device Password</Text>
                            <View style = {styles.inputContainer}>
                                <Ionicons 
                                    name ='lock-closed-outline'
                                    size = {20}
                                    color = {COLORS.textSecondary}
                                    style = {styles.inputIcon}
                                />
                                <TextInput 
                                    style = {styles.input}
                                    placeholder = "Enter your device password"
                                    placeholderTextColor = {COLORS.placeholderText}
                                    value = {devicePassword}
                                    onChangeText = {setDevicePassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize = "none"
                                />
                                <TouchableOpacity
                                    onPress= {() => setShowPassword(!showPassword)}
                                    style = {styles.eyeIcons}
                                >
                                    <Ionicons 
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size = {20}
                                        color = {COLORS.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* ADD DEVICES BUTTON */}
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {handleAddDevice}
                            disabled= {!!isLoading}  
                            >
                            {isLoading ? (
                                <ActivityIndicator color ="#fff" />
                            ) : (
                                // TEST FRONTEND - REMOVE AFTER BACKEND
                                <Link href="/(subtabs)/setting" asChild> 
                                <Text style={styles.buttonText}>ADD DEVICES</Text>
                                </Link>
                            )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}