import { View, Text, Image , TextInput, Platform, Pressable, Button, Alert, 
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/device.styles"
import COLORS from './../../constants/colors';
import { Link } from 'expo-router';
import { useRouter, useLocalSearchParams ,useSegments} from "expo-router";
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAuthStore} from "../../store/authStore"

export default function DeviceRemote() {
    const [device, setDevice] = useState(null);
    const [deviceName, setdeviceName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sliderState ,setSliderState] = useState(0);
    
    const [openTime,setOpenTime] =useState(new Date())
    const [isOpenTime,setIsOpenTime] =useState(false)

    const [closeTime,setCloseTime] =useState(new Date())
    const [isCloseTime,setIsCloseTime] =useState(false)

    const [showPicker, setShowPicker] = useState(false);

    const[autoMode,setAutoMode] = useState(false);

    const {deviceId} = useLocalSearchParams();
 
    const router = useRouter();
    const {token , user} = useAuthStore();


    const fetchDeviceID = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/user/getDevice/?deviceId=${deviceId}`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to fetch Device");
            await setdeviceName(data?.deviceName)
            await setSliderState(data?.percent);
            await setIsCloseTime(data?.isCloseTime);
            await setIsOpenTime(data?.isOpenTime);
            await setAutoMode(data?.autoMode);
            if(data?.OpenTime) {    
                const openTime = new Date();
                openTime.setHours(data?.OpenTime?.h);
                openTime.setMinutes(data?.OpenTime?.m);
                await setOpenTime(openTime);
            }
            if(data?.CloseTime) {
                const closeTime = new Date();
                closeTime.setHours(data?.CloseTime?.h);
                closeTime.setMinutes(data?.CloseTime?.m);
                await setCloseTime(closeTime);
            }
           
            
        } catch (error) {
            console.log("Error fetching Device", error);
        } finally{
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        fetchDeviceID();
    },[deviceId])

    const handleupdateDeviceName = async () => {
       
        try {
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/user/updateDeviceName`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    deviceId,
                    deviceName
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to update Device Name");
            console.log("Device Name updated successfully");
        } catch (error) {
            console.log("Error updating Device Name", error);
        } finally{
            setIsLoading(false);
        }
    };

    const handleupdatePercent = async () => {
        console.log("Slider Value", parseInt(sliderState));
        const percent = parseInt(sliderState);
        try {   
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/device/updatePercent/?deviceId=${deviceId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    percent
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to update Percent");
            console.log("Percent updated successfully");  
            setSliderState(percent);
        } catch (error) {
            console.log("Error updating Percent", error);
           
        }finally{
            setIsLoading(false);
        }
    };

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangeOpenTime = async (e, selectedTime) => {
        setOpenTime(selectedTime);
        try {   
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/device/updateOpenTime/?deviceId=${deviceId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isOpenTime,
                    openTime: {
                        h: selectedTime.getHours(),
                        m: selectedTime.getMinutes()
                    }
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to update Open Time");
            console.log("Open Time updated successfully");
            setOpenTime(selectedTime);
        } catch (error) {
            console.log("Error updating Open Time", error);

        }finally{
            setIsLoading(false);
        }
    }

    const handleOpenTime =async () => {
        console.log("Open Time", openTime.getHours(), openTime.getMinutes());
        try {   
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/device/updateOpenTime/?deviceId=${deviceId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isOpenTime : !isOpenTime,
                    openTime: {
                        h: openTime.getHours(),
                        m: openTime.getMinutes()
                    }
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to update Open Time");
            console.log("Open Time updated successfully");
        } catch (error) {
            console.log("Error updating Open Time", error);
        } finally{
            setIsLoading(false);
        }
        setIsOpenTime(!isOpenTime);

    };

    const onChangeCloseTime = async (e, selectedTime) => {
        setCloseTime(selectedTime);
        try {   
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/device/updateCloseTime/?deviceId=${deviceId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isCloseTime,
                    closeTime: {
                        h: selectedTime.getHours(),
                        m: selectedTime.getMinutes()
                    }
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to update Close Time");
            console.log("Close Time updated successfully");
            setCloseTime(selectedTime);
        } catch (error) {
            console.log("Error updating Close Time", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseTime = async () => {
        console.log("Close Time", closeTime.getHours(), closeTime.getMinutes());
        try {   
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/device/updateCloseTime/?deviceId=${deviceId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isCloseTime : !isCloseTime,
                    closeTime: {
                        h: closeTime.getHours(),
                        m: closeTime.getMinutes()
                    }
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to update Close Time");
            console.log("Close Time updated successfully");
        } catch (error) {
            console.log("Error updating Close Time", error);
        } finally{
            setIsLoading(false);
        }   
        setIsCloseTime(!isCloseTime);
    };

    const handleAutoMode = async () => {  
        console.log("Auto Mode", autoMode);
        try {
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/device/updateAutoMode/?deviceId=${deviceId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    autoMode: !autoMode
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to update Auto Mode");
            console.log("Auto Mode updated successfully");
            setAutoMode(!autoMode);
        } catch (error) {
            console.log("Error updating Auto Mode", error);
        } finally{
            setIsLoading(false);
        }
        setAutoMode(!autoMode);
        // console.log("Auto Mode", autoMode);
        
    };

    const confirmRemoveDevice = () => {
    Alert.alert(
      "Remove Device",
      "Are you sure you want to remove this device?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Remove", onPress: () => handleRemoveDevice(), style: "destructive" }
      ]
    );
  }
    const  handleRemoveDevice = async () => {
       try {
            setIsLoading(true);
            const response = await fetch(`https://back-endcurtainapp.onrender.com/api/user/removeDevice/`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    deviceId
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message|| "Failed to remove Device");
            console.log("Remove Device successfully");
    } catch (error) {
        console.log("Error removing Device", error);
       }finally {
            setIsLoading(false);
            router.push("/(tabs)/");
       }
        
    };

    const handleBackToHome = () => {
        router.push("/(tabs)/");
    }

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
                    </View>
                    {/* FORM */}
                    <View style = {styles.formContainer}>
                        {/* DEVICE NAME INPUT */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Device Name</Text>
                            <View style = {styles.inputContainer}>
                                <TextInput 
                                style = {styles.input}
                                placeholder = "Enter your Device Name"
                                placeholderTextColor = {COLORS.placeholderText}
                                value = {deviceName}
                                onChangeText = {setdeviceName}
                                autoCapitalize = "none"
                                />
                                <TouchableOpacity
                                    style = {styles.eyeIcons}
                                    onPress ={handleupdateDeviceName}
                                    >
                                    <Ionicons 
                                        name= "checkmark-circle-outline" 
                                        size = {20}
                                        color = {COLORS.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* OPEN/CLOSE INPUT */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Open Percent</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ width: 40, fontSize:10, textAlign: 'left' }}>Full Close</Text>
                                <Slider  
                                    style={{ flex: 1, height: 40 }}
                                    value={sliderState}
                                    onValueChange={(value) => setSliderState(value)}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor="#fcba03"
                                    maximumTrackTintColor={COLORS.textSecondary}
                                />
                                <Text style={{ width: 40, fontSize:10, textAlign: 'right' }}>Full Open</Text>
                            </View>
                            {/* <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>
                                {sliderState.toString().slice(0, 4)}
                            </Text> */}
                            <TouchableOpacity
                            style = {[ styles.button, 
                                   { height: 30,
                                    width: 120,}]}
                            disabled = {!!isLoading}  
                            onPress = {handleupdatePercent}
                            >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>CONFIRM</Text>
                            )}
                        </TouchableOpacity>
                        </View>
                        {/* OPEN TIME PICKER */}
                        <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Open Time</Text> 
                            <View style = {styles.inputGroup}>
                                <View style = {styles.inputContainer}>
                                        <DateTimePicker
                                            mode = 'time'
                                            value = {openTime}
                                            onChange = {onChangeOpenTime}
                                            is24Hour = {true}
                                            style = {[styles.input,backgroundColor = "#fff"]}
                                        />
                                        <TouchableOpacity
                                            style = {{paddingLeft: 120}}
                                            onPress={handleOpenTime}
                                            >
                                            {isOpenTime ? 
                                            <Ionicons 
                                                name= "checkmark-circle" 
                                                size = {40}
                                                color = "green"
                                            />
                                             :<Ionicons 
                                                name= "checkmark-circle-outline" 
                                                size = {40}
                                                color = {COLORS.primary}
                                            />
                                            }
                                        </TouchableOpacity>
                                </View>
                            </View>
                        </View>  

                         {/* CLOSE TIME PICKER */}
                         <View style = {styles.inputGroup}>
                            <Text style = {styles.label}>Close Time</Text> 
                            <View style = {styles.inputGroup}>
                                <View style = {styles.inputContainer}>
                                        <DateTimePicker
                                            mode = 'time'
                                            value = {closeTime}
                                            onChange = {onChangeCloseTime}
                                            is24Hour = {true}
                                            style = {[styles.input,backgroundColor = "#fff"]}
                                        />
                                        <TouchableOpacity
                                            style = {{paddingLeft: 120}}
                                            onPress={handleCloseTime}
                                            >
                                            {isCloseTime ? 
                                            <Ionicons 
                                                name= "checkmark-circle" 
                                                size = {40}
                                                color = "green"
                                            />
                                             :<Ionicons 
                                                name= "checkmark-circle-outline" 
                                                size = {40}
                                                color = {COLORS.primary}
                                            />
                                            }
                                        </TouchableOpacity>
                                </View>
                            </View>
                        </View>  
                         {/* AUTOMATIC BUTTON */}
                        <View style = {styles.inputGroup}>
                            <View style = {styles.inputContainer}>
                                <Text
                                style = {{
                                    flex:1,
                                    fontSize: 18,
                                    marginBottom: "auto",
                                    marginLeft: 10,
                                    color: COLORS.textPrimary,
                                    fontWeight: "700",
                                    
                                }}>
                                Automatic Open/Close Mode
                                </Text>
                                <TouchableOpacity
                                            style = {{paddingLeft: 100}}
                                            onPress={handleAutoMode}
                                            >
                                            {autoMode ? 
                                            <Ionicons 
                                                name= "checkmark-circle" 
                                                size = {40}
                                                color = "green"
                                            />
                                             :<Ionicons 
                                                name= "checkmark-circle-outline" 
                                                size = {40}
                                                color = {COLORS.primary}
                                            />
                                            }
                                </TouchableOpacity>
                            </View>
                        </View>                       
                        {/* HOME BUTTON */}   
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {handleBackToHome}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>HOME PAGE 🏠︎</Text>
                            )} 
                        </TouchableOpacity>
                        {/* Remove BUTTON */}   
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {confirmRemoveDevice}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>REMOVE DEVICE ❌ </Text>
                            )}
                        </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
)
}