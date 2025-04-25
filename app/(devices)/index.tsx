import { View, Text, Image , TextInput, Platform, Pressable, Button, 
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/device.styles"
import COLORS from './../../constants/colors';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function DeviceRemote() {
    const [devideID, setdevideID] = useState("");
    const [deviceName, setdeviceName] = useState("Curtain 1");
    const [deviceLight, setdeviceLight] = useState(0);
    const [devicePercent, setdevicePercent] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [sliderState ,setSliderState] = useState(0);

    const [openTime,setOpenTime] =useState(new Date())
    const [isOpenTime,setIsOpenTime] =useState(false)

    const [closeTime,setCloseTime] =useState(new Date())
    const [isCloseTime,setIsCloseTime] =useState(false)

    const [showPicker, setShowPicker] = useState(false);

    const[isAutoMode,setIsAutoMode] = useState(false);


    const router = useRouter();

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangeOpenTime = (e, selectedTime) => {
        setOpenTime(selectedTime);
        
    }
    const handleOpenTime = () => {};

    const onChangeCloseTime = (e, selectedTime) => {
        setCloseTime(selectedTime);
        
    }

    const handleCloseTime = () => {};

    const handleAutoMode = () => {};
  
    const  handleResetDevice = () => {};

    const  handleDeleteDevice = () => {};

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
                                    maximumValue={1}
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
                            disabled = {!!isLoading}  >
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
                                            onchange = {onChangeOpenTime}
                                            is24Hour = {true}
                                            style = {[styles.input,backgroundColor = "#fff"]}
                                        />
                                        <TouchableOpacity
                                            style = {{paddingLeft: 120}}
                                            onPress={(() => {
                                                handleOpenTime,
                                                setIsOpenTime(!isOpenTime)})}
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
                                            onchange = {onChangeCloseTime}
                                            is24Hour = {true}
                                            style = {[styles.input,backgroundColor = "#fff"]}
                                        />
                                        <TouchableOpacity
                                            style = {{paddingLeft: 120}}
                                            onPress={(() => {
                                                handleCloseTime,
                                                setIsCloseTime(!isCloseTime)})}
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
                                            onPress={(() => {
                                                handleAutoMode,
                                                setIsAutoMode(!isAutoMode)})}
                                            >
                                            {isAutoMode ? 
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
                        {/* RESET BUTTON */}   
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {handleResetDevice}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>RESET DEVICE</Text>
                            )}
                        </TouchableOpacity>
                        {/* DELETE BUTTON */}   
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {handleDeleteDevice}
                            disabled = {!!isLoading}  >
                            {isLoading ? (
                                <ActivityIndicator  color = "#fff" />
                            ) : (
                                <Text style = {styles.buttonText}>DELETE DEVICE</Text>
                            )}
                        </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
)
}