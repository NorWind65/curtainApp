import { StyleSheet, Text, View } from 'react-native'
import { Link } from "expo-router";
import React from 'react';
import COLORS from "../constants/colors";


const index = () => {
  return (
    <View>
      <Text>Map Sites</Text>
        <Text>AUTH</Text>
      <Link href="/(auth)"> - Login Page</Link>
      <Link href="/(auth)/signup"> - Signup Page</Link>
        <Text>TABS</Text>
      <Link href="/(tabs)"> - Home Page</Link>
      <Link href="/(tabs)/profile"> - Profile Page</Link>
      <Link href="/(tabs)/addDevices"> - Add Devices Page</Link>
        <Text >DEVICES</Text>
      <Link href="/(devices)"> - Devices Page</Link>
        <Text >SUB TABS</Text>
      <Link href="/(subtabs)/changeInfo"> - Change Info Page</Link>
      <Link href="/(subtabs)/setting"> - Settings Page</Link>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})