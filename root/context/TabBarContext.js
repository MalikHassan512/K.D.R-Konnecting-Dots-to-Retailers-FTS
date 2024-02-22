import {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";




const SessionContext = createContext({
    display: false,

    setSession: (session) => {
    },

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