import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,
    clearStorage: async () => {
        try {
            await AsyncStorage.clear(); 
            set({ user: null, token: null });
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    },
    signup: async (username, email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://back-endcurtainapp.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);
            
            set({ user: data.user, token: data.token, isLoading: false });

            return {success: true };
        } catch (error) { 
            set({ isLoading: false });
            return { success: false, error: error.message };
           
        }
    },

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://back-endcurtainapp.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token, isLoading: false });
            
            return {success: true };
        }
        catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    },

    checkAuth: async () => {
        try {
            const storedUserJson = await AsyncStorage.getItem('user');
            const token = await AsyncStorage.getItem('token');
            const user = storedUserJson ? JSON.parse(storedUserJson) : null;
            set({ user, token });
        } catch (error) {
           console.error('Error checking auth:', error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            set({ user: null, token: null });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    },
    addDevice: async(deviceId, password, token) => {
         set({ isLoading: true });
        try {
            const response = await fetch('https://back-endcurtainapp.onrender.com/api/user/addDevice', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    deviceId,
                    password
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            
            set({ isLoading: false });
            
            return {success: true };
        }
        catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    }

    sendCMD: async(deviceId, cmd, token) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://back-endcurtainapp.onrender.com/api/user/sendCmd', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    deviceId,
                    cmd
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            
            set({ isLoading: false });
            
            return {success: true };
        }
        catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    }

    updateTimeOC: async(deviceId, timeOC, token) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://back-endcurtainapp.onrender.com/api/user/updateTimeOC', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    deviceId,
                    timeOC
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            
            set({ isLoading: false });
            
            return {success: true };
        }
        catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    }
}));
