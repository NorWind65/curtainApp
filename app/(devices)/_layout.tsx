import { Tabs } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Devicelayout() {
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
                    title: 'device',
                    tabBarIcon: ({ color,size }) => (<MaterialCommunityIcons name="curtains-closed" color={color} size={size} /> )
                }} 
            />
            <Tabs.Screen name="setting"
                options={{     
                    title: 'Setting',
                    tabBarIcon: ({ color,size }) => (<Ionicons name="settings-outline" color={color} size={size} /> )
                }}
            />
        </Tabs>
    ) 
}