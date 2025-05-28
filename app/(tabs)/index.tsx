import { View, Text, Image , TextInput, Platform,RefreshControl,
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter, Link , useSegments} from "expo-router";
import styles from "../../assets/styles/home.styles";
import COLORS from "../../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {useAuthStore} from "../../store/authStore"
export default function home() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const {token} = useAuthStore();

    const segments = useSegments();

    const fetchDevices = async (refresh = false) => {
        try {
          if(refresh) setRefreshing(true);
          else setLoading(true);
          const response = await fetch("https://back-endcurtainapp.onrender.com/api/user/getDevices",{
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
          })
          const data = await response.json();
          if(!response.ok) throw new Error(data.message|| "Failed to fetch Device");

          setDevices(data);

        } catch (error) {
            console.log("Error fetching Device", error);
        } finally{
          if(refresh) setRefreshing(false);
          else setLoading(false);
        }
    };


    useEffect( () =>{
      fetchDevices();
    },[segments])
  
  const statusImage = (light) => {
    if(light < 10){
        return require("../../assets/images/v-bright.png")
    }else if(light < 200){
        return require("../../assets/images/bright.png")
    }else if(light < 500){
      return require("../../assets/images/day.png")
    }else if(light < 800) {
      return require( "../../assets/images/clouds.png")
    }else{
      return require( "../../assets/images/moon-i-2.png")
    }
  }
  const state = (percent) =>{
      if( percent < 10){ 
          return "Close"
      }else if(percent < 40){
          return "Small Open"
      }else if(percent < 80){
          return "Half Open"
      }else{
          return "Full Open"
      }    
  }
  const weather = (light) => {
    if(light < 10){
        return "Very Bright Weather"
    }else if(light < 200){
        return "Sunny Weather"
    }else if(light < 500){
      return "Normal Weather"
    }else if(light < 800) {
      return "Dim Weather"
    }else{
      return "Night"
    }
  }
  const renderItem = ({ item }) => (
    <Link
        href={{ pathname: "/(devices)", params: { deviceId: item.deviceId } }}
        asChild
    >
      <TouchableOpacity>
        <View style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
                <Text >{item.deviceName}</Text>
            </View>
            <View style={styles.deviceImageContainer}>
                <Image source={statusImage(item.light)} style={styles.deviceImage} contentFit='cover'/>
            </View>
            <View style={styles.deviceDetails}>
                <Text >Status: {state(item.percent)} - Open percent: {item.percent}%</Text>
                <Text >Weather: {weather(item.light)}</Text>
                {/* <Text >Light: {item.light}</Text>  */}
            </View>
        </View>
      </TouchableOpacity>
    </Link>
    );


    return (
        <View style = {styles.container}>
            <FlatList
                data = {devices}
                renderItem = {renderItem}
                keyExtractor = {(item) => item._id}
                contentContainerStyle = {styles.listContainer}
                showVerticalScrollIndicator = {false}
                refreshControl = {
                  <RefreshControl
                    refreshing = {refreshing}
                    onRefresh = {() => fetchDevices(true)}
                    colors ={[COLORS.primary]}
                    tintColor = {COLORS.primary}
                  />
                }
                ListHeaderComponent = {
                  <View style = {styles.header}>
                    <Text style = {styles.headerTitle}>☀️Smart Curtain☁️</Text>
                  </View>
                }
                ListEmptyComponent = {
                  <View style = {styles.emptyContainer}>
                    <MaterialCommunityIcons name="curtains" size={70} color={COLORS.textSecondary} />
                    <Text style = {styles.emptyText}>No Devices Found</Text>
                    <Text style = {styles.emptySubtext}>Add your first Device Below</Text>
                  </View>
                }
            />
        </View>
    )
}