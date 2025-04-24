import { View, Text, Image , TextInput, Platform,
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import styles from "../../assets/styles/home.styles";
import COLORS from "../../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function home() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fecthDevices = async () => {};
    if(!loading){
      setLoading(true);
      setDevices([{
          id: 1,
          name: "Curtain 1",
          percent: 0,
          light: '900' // very bright
      },
      {
          id: 2,
          name: "Curtain 2",
          percent: 80,
          light: '3' // night
      },
      {
          id: 3,
          name: "Curtain 3",
          percent: 50,
          light: '124' // cloudy
      },
      {
          id: 4,
          name: "Curtain 4",
          percent: 20,
          light: '400' // sunny
      }
    ]);
    }
  const statusImage = (light) => {
    if(light < 10){
        return require("../../assets/images/moon-i-2.png")
    }else if(light < 200){
        return require("../../assets/images/clouds.png")
    }else if(light < 500){
      return require("../../assets/images/day.png")
    }else if(light < 800) {
      return require("../../assets/images/bright.png")
    }else{
      return require("../../assets/images/v-bright.png")
    }
  }
  const state = (percent) =>{
      if( percent < 10){ 
          return "Close"
      }else if(percent < 40){
          return "Small Open"
      }else if(percent < 70){
          return "Half Open"
      }else{
          return "Full Open"
      }    
  }
  const renderItem = ({ item }) => (
    <Link
        href={{ pathname: "/(devices)", params: { id: item.id } }}
        asChild
    >
      <TouchableOpacity>
        <View style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
                <Text >{item.name}</Text>
            </View>
            
           
            <View style={styles.deviceImageContainer}>
                <Image source={statusImage(item.light)} style={styles.deviceImage} contentFit='cover'/>
            </View>
            <View style={styles.deviceDetails}>
                <Text style={styles.deviceStatus}>Status: {state(item.percent)}  -  {item.percent}%</Text>
                <Text style={styles.deviceLight}>Light: {item.light}</Text> 
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
                keyExtractor = {(item) => item.id.toString()}
                contentContainerStyle = {styles.listContainer}
                showVerticalScrollIndicator = {false}
            />
        </View>
    )
}