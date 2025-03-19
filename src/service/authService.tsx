import { useRiderStore } from "@/store/riderStore"
import { useUserStore } from "@/store/userStore"
import { tokenStorage } from "@/store/storage"
import { resetAndNavigate } from "@/utils/Helpers"
import { Alert } from "react-native"
import axios from "axios"
import { BASE_URL } from "./config"

export const signin = async (payload: {
    role: 'customer' | 'rider',
    phone: string,
},
    updateAccessToken: () => void,
) => {
    const { setUser } = useUserStore.getState()
    const { setUser: setRiderUser } = useRiderStore.getState()

    try {
        const res = await axios.post(`${BASE_URL}/auth/signin`, payload)
        if (res.data.role === 'customer') {
            setUser(res.data.user)
            resetAndNavigate('/customer/home')
        } else {
            setRiderUser(res.data.user)
        }

        tokenStorage.set('access_token', res.data.access_token)
        tokenStorage.set('refresh_token', res.data.refresh_token)

        if (res.data.role === 'customer') {
            resetAndNavigate('/customer/home')
        }
        else {
            resetAndNavigate('/rider/home')
        }
        updateAccessToken()
    } catch (error: any) {
        Alert.alert('Error', error.message)
        console.log(error)
    }
}

export const logout = async (disconnect?: () => void) => {
    if (disconnect) {
        disconnect();
    }
    const { clearData } = useUserStore.getState()
    const { clearRiderData } = useRiderStore.getState()

    tokenStorage.clearAll()
    clearRiderData
    clearData
    resetAndNavigate('/role')
}