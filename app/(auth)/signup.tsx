import { View, Text, Image , TextInput, Platform,
    TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/signup.styles"
import COLORS from './../../constants/colors';
import { Link } from 'expo-router';


export default function signup() {
  return (
    <KeyboardAvoidingView
      style = {{flex: 1}}
      behavior = {Platform.OS === "ios" ? "padding" : "height"}
    >
        
    </KeyboardAvoidingView>
  )
}