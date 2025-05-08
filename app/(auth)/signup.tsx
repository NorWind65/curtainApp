import { View, Text, Image , TextInput, Platform, Alert,
    TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/signup.styles"
import COLORS from './../../constants/colors';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";


export default function signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {user, isLoading, signup, clearStorage} = useAuthStore();


    const router = useRouter();

    const  handleSignUp = async () => { 
        const result = await signup(username, email, password);
        if(!result.success) {
            Alert.alert("Error", result.error);
        }
    };

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
                                placeholder = "Ex: Nguyễn Văn A"
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
                                placeholder = "Ex: NguyenVanA@gmail.com"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {email}
                                onChangeText = {setEmail}
                                keyboardType = "email-address"
                                autoCapitalize = "none"
                                />
                            </View>
                        </View>
                        {/* PASSWORD INPUT */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Password</Text>
                            <View style = {styles.inputContainer}>
                                <Ionicons 
                                name ='lock-closed-outline'
                                size = {20}
                                color = {COLORS.primary}
                                style = {styles.inputIcon}
                                />
                                <TextInput 
                                style = {styles.input}
                                placeholder = "*******"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {password}
                                onChangeText = {setPassword}
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
                        {/* SIGNUP BUTTON */}   
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {handleSignUp}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>
                        {/* FOOTER */}
                        <View style = {styles.footer}>
                            <Text style = {styles.footerText}>
                                Already have an account? 
                            </Text>
                            <TouchableOpacity onPress = {() => router.back()}>
                                <Text style = {styles.link}>
                                    Login 
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
  )
}