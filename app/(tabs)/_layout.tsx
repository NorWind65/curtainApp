import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Tablayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                headerTitleStyle: {
                    fontWeight: "600",
                    color: COLORS.textPrimary,
                },
                headerShownVisible: false,
                tabBarStyle: {
                    backgroundColor: COLORS.cardBackground,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    paddingTop: 5,
                    paddingBottom: insets.bottom,
                    height: 60 + insets.bottom,
                }

            }}
        >
            <Tabs.Screen name="index" 
                options={{ 
                    title: 'Home',
                    tabBarIcon: ({ color,size }) => (<Ionicons name="home-outline" color={color} size={size} /> )
                }} 
            />
            <Tabs.Screen name="addDevices"
                options={{     
                    title: 'Add Devices',
                    tabBarIcon: ({ color,size }) => (<Ionicons name="add-circle-outline" color={color} size={size} /> )
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: 'Profile',
                    tabBarIcon: ({ color,size }) => (<Ionicons name="person-outline" color={color} size={size} /> )
                }} 
            />
        </Tabs>
    ) 
}