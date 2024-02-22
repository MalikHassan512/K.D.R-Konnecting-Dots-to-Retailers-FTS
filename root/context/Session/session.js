import {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SESSION_KEY = "SESSION"

const DEFAULT_SESSION = {
    profile: {
        id: null,
        email: null,
        Name: null,
        dp: null,
        username: null,
        dpUrl: null,
        address: {
            address: null,
            id: null,
            latitude: null,
            longitude: null,
            post_code: null,
            country: null,
            state: null,
            city: null,
        },
        phone: null,
        dob: null,
        DP: {
            id: null,
            fileUri: null,
            file: null,
            size: null,

        },
        date_joined: null,
        is_active: null
    },
    token: null
}


const OTHER_DATA = {
    cartCount: 0,
    FavCount: 0,
}
const SessionContext = createContext({
    session: DEFAULT_SESSION,
    other: OTHER_DATA,
    setOther: (data) => {
    },
    setSession: (session) => {
    },
    clearSession: () => {
    },
    loadSession: () => {
    }
});


function SessionProvider({children}) {
    const [session, setSession] = useState(DEFAULT_SESSION)
    const [otherData, setOtherData] = useState(OTHER_DATA)
    const setMainSession = async (session) => {
        try {
            await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session))
        } catch (e) {
            console.log(e)
        }
        setSession({...session})
    }
    const clearSession = () => {
        AsyncStorage.removeItem(SESSION_KEY).then(r => {
            console.log(r)
            setSession(DEFAULT_SESSION)
        }).catch(e => {
            console.log(e)
        })
    }

    // loading session from storage and returning a promise
    async function loadSession() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(SESSION_KEY).then((session) => {
                if (session) {
                    setSession(JSON.parse(session))
                    resolve(JSON.parse(session))
                } else {
                    setSession(DEFAULT_SESSION)
                    reject("No session")
                }
            }).catch(e => {
                setSession(DEFAULT_SESSION)
                reject(e)

            })
        })
    }


    let value = {
        session: session,
        setSession: setMainSession,
        clearSession: clearSession,
        loadSession: loadSession,
        other: otherData,
        setOther: setOtherData,
    }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}


export default SessionContext

export {
    SessionProvider
}