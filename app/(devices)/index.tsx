import { View, Text, Image , TextInput, Platform,
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/device.styles"
import COLORS from './../../constants/colors';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DeviceRemote() {
  const [devideID, setdevideID] = useState("");
  const [deviceName, setdeviceName] = useState("Curtain 1");
  const [deviceLight, setdeviceLight] = useState(0);
  const [devicePercent, setdevicePercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [openTime,setOpenTime] =useState(new Time())
  const [isOpenTime,setIsOpenTime] =useState(false)

  const [closeTime,setCloseTime] =useState(new Time())
  const [isCloseTime,setIsCloseTime] =useState(false)

  const [showPicker, setShowPicker] = useState(false);


  const router = useRouter();

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