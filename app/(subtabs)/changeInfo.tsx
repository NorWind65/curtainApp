import { View, Text, Image , TextInput, Platform,
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/signup.styles"
import COLORS from './../../constants/colors';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import {useAuthStore} from '../../store/authStore'
export default function changeInfo() { 
    
    const {user, token} = useAuthStore();
    
    const [username, setUsername] = useState(user?.username||"");
    const [email, setEmail] = useState(user?.email||"");
    const [oldPassword, setOldpassword] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
   
    
   

    const router = useRouter();

    return (
        <KeyboardAvoidingView
        style = {{flex: 1}}
        behavior = {Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style = {styles.container}>
                <View style ={styles.card}>
                    {/* HEADER */}
                    <View style = {styles.header}>
                        <Text style = {styles.title}>
                        ☀️Smart Curtain☁️
                        </Text>
                        <Text style = {styles.subtitle}>
                            Make your home smarter
                        </Text>
                    </View>
                    {/* FORM */}
                    <View style = {styles.formContainer}>
                        {/* USERNAME INPUT */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Full Name</Text>
                            <View style = {styles.inputContainer}>
                                <Ionicons 
                                name ='person-outline'
                                size = {20}
                                color = {COLORS.primary}
                                style = {styles.inputIcon}
                                />
                                <TextInput 
                                style = {styles.input}
                                placeholder = "Enter your new name"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {username}
                                onChangeText = {setUsername}
                                autoCapitalize = "none"
                                />
                            </View>
                        </View>
                         {/* EMAIL INPUT */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Email</Text>
                            <View style = {styles.inputContainer}>
                                <Ionicons 
                                name ='mail-outline'
                                size = {20}
                                color = {COLORS.primary}
                                style = {styles.inputIcon}
                                />
                                <TextInput 
                                style = {styles.input}
                                placeholder = "Enter your new email"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {email}
                                onChangeText = {setEmail}
                                keyboardType = "email-address"
                                autoCapitalize = "none"
                                />
                            </View>
                        </View>
                        {/*OLD PASSWORD INPUT */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Old Password</Text>
                            <View style = {styles.inputContainer}>
                                <Ionicons 
                                name ='lock-closed-outline'
                                size = {20}
                                color = {COLORS.primary}
                                style = {styles.inputIcon}
                                />
                                <TextInput 
                                style = {styles.input}
                                placeholder = "*********"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {oldPassword}
                                onChangeText = {setOldpassword}
                                secureTextEntry={!showPassword}
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
                        {/*NEW PASSWORD INPUT */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>New Password</Text>
                            <View style = {styles.inputContainer}>
                                <Ionicons 
                                name ='lock-closed-outline'
                                size = {20}
                                color = {COLORS.primary}
                                style = {styles.inputIcon}
                                />
                                <TextInput 
                                style = {styles.input}
                                placeholder = "*********"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {newPassword}
                                onChangeText = {setNewpassword}
                                secureTextEntry={!showPassword}
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
                        {/* Confirm BUTTON */}   
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {() => router.push("/(tabs)/profile")}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>Confirm</Text>
                            )}
                        </TouchableOpacity>
                        {/* Cancel BUTTON */}   
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {() => router.push("/(tabs)/profile")}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>Cancel</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
  )
}