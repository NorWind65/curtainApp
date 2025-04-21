import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React from 'react'
import {Tabs} from "expo-router"
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TABicon = ({ focused, icon, title} : any) =>{
    if(focused){
        return (
            <ImageBackground 
                source = {images.highlight}
                className= 'flex flex-row w-full felx-1 min-w-[112px] 
                min-h-16 mt-4 justify-center items-center rounded-full 
                overflow-hidden'
            >
                <Image source = {icon} tintColor='#000000' className='size-5'/>
                <Text className= "text-black-200 text-base font-semibold"> {title} </Text>
            </ImageBackground>
        )
    }

    return (
        <View className =  "size-full justify-center items-center mt-4 rounded-full">
            <Image source ={icon} tintColor="#A8B5DB" className='size-5' />
        </View>
    )
}

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle:{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarStyle: {
                    backgroundColor: '#F8EEDF',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#FFF085'
                }
        }}
    >
        <Tabs.Screen 
            name='Devices'
            options={{
                titles: 'Devices',
                headerShown: false,
                tabBarIcon:({focused}) =>(
                    <TABicon 
                        focused = {focused}
                        icon = {icons.curtain}
                        title = "Devices"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                titles: 'profile',
                headerShown: false,
                tabBarIcon:({focused}) =>(
                    <TABicon 
                        focused = {focused}
                        icon = {icons.profile}
                        title = "Profiles"
                    />
                )
            }}
        />
       
    </Tabs>
       
  )
}

export default _layout

const styles = StyleSheet.create({})