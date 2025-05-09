import { View, Text, Image , TextInput, Platform, Alert,
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import styles from "../../assets/styles/profile.styles";
import COLORS from "../../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore";
export default function profile() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {clearStorage, logout, user} = useAuthStore();

  const router = useRouter();

  // Test UI to-do fix API
  const Handlelogout = () => {
    //clearStorage();
    logout();
  }

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Logout", onPress: () => Handlelogout(), style: "destructive" }
      ]
    );
  }


  return (
    <View style = {styles.container}>
      {/* PROFILE INFO */}
      <View style = {styles.profileHeader}>
        <Image 
          source = {require("../../assets/images/moon-icon.png")}
          style = {styles.profileImage}
        />
        <View style = {styles.profileInfo}>
          {user ?
            (<Text style = {styles.username}>
              {user.username}
            </Text>): <Text>ABCXYZ</Text>
          }
           {user ?
            (<Text style = {styles.email}>
              {user.email}
            </Text> ): <Text>ABCXYZ</Text>
          }
            
        </View>
      </View>
      {/* CHANGES INFO */}
      <TouchableOpacity style = {styles.logoutButton} onPress = {() => router.push("/(subtabs)/changeInfo")}>
        <Ionicons 
          name = "key-outline"
          size = {20}
          color = {COLORS.white}
          style = {styles.logoutIcon}
        />
        <Text style = {styles.logoutText}>
          Change Infomation
        </Text>
      </TouchableOpacity>
      {/* LOGOUT BUTTONS */}
      <TouchableOpacity style = {styles.logoutButton} onPress = {confirmLogout}>
        <Ionicons 
          name = "log-out-outline"
          size = {20}
          color = {COLORS.white}
          style = {styles.logoutIcon}
        />
        <Text style = {styles.logoutText}>
          Logouts
        </Text>
      </TouchableOpacity>
    </View>
  )
}