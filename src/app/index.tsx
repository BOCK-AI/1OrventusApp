import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { splashStyles } from '@/styles/splashStyles';
import { commonStyles } from '@/styles/commonStyles';
import CustomText from '@/components/shared/CustomText';
import { useUserStore } from '@/store/userStore';
import { tokenStorage } from '@/store/storage';
import { resetAndNavigate } from '@/utils/Helpers';
import { refresh_tokens } from '@/service/apiInterceptors';
import {jwtDecode} from 'jwt-decode';
import { logout } from '@/service/authService';

interface DecodedToken {
    exp: number;
}

const Main = () => {
    const [loaded] = useFonts({
        Bold: require('../assets/fonts/NotoSans-Bold.ttf'),
        Regular: require('../assets/fonts/NotoSans-Regular.ttf'),
        Medium: require('../assets/fonts/NotoSans-Medium.ttf'),
        Light: require('../assets/fonts/NotoSans-Light.ttf'),
        SemiBold: require('../assets/fonts/NotoSans-SemiBold.ttf')
    });

    const { user } = useUserStore()

    const [hasNavigated, setHasNavigated] = useState(false)

    const tokenCheck = async () => {

        const access_token = tokenStorage.getString('access_token') as string;
        const refresh_token= tokenStorage.getString('access_token') as string;

        if(access_token){
        
            const decodedAccessToken = jwtDecode<DecodedToken>(access_token);
            const decodedRefreshToken = jwtDecode<DecodedToken>(access_token);

            const currentTime = Date.now() / 1000;
            if(decodedAccessToken?.exp < currentTime || decodedRefreshToken.exp < currentTime){
                logout();                
                Alert.alert('Error', 'Session expired, please login again');
            }
            if(decodedAccessToken?.exp < currentTime ){
                try{
                    refresh_tokens()
                }catch(error){
                    console.log('Error refreshing token', error);
                    Alert.alert('Error', 'Session expired, please login again');
                }
            }
            
            if(user){
                resetAndNavigate({ pathname: '/customer/home' });
            }else{
                resetAndNavigate({ pathname: './captain/home' });
            }

            return;
        }

        resetAndNavigate({ pathname: './role' });
    }

    useEffect(() => {
        if (loaded && !hasNavigated) {
            const timeoutId = setTimeout(() => {
                tokenCheck()
                setHasNavigated(true)
            }, 1000);
            return () => clearTimeout(timeoutId)
        }
    }, [loaded, hasNavigated])

    return (
        <View style={commonStyles.container}>
            <Image
                source={require("@/assets/images/icon.png")}
                style={splashStyles.img}
            />
            <CustomText variant='h5' fontFamily='Medium' style={splashStyles.text}>
                Made in 🇮🇳
            </CustomText>
        </View>
    );
};

export default Main; 