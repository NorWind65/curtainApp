import { StyleSheet, Text, View } from 'react-native'
import { Link } from "expo-router";
import React from 'react';
import COLORS from "../constants/colors";


const index = () => {
  return (
    <View>
      <Text>Home</Text>
        
      <Link href="/(auth)"> Login Page</Link>
      <Link href="/(auth)/signup"> Signup Page</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})