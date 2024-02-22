import {StyleSheet, View, ScrollView} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import COLOR from "../../../../../Styles/Color";
import PADDINGS from "../../../../../Styles/PADDINGS";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import React, {useCallback, useContext, useEffect, useState} from "react";
import PlansComponent from "../Components/PlansComponent";
import DummyData from "../other/dummyData";
import Urls from "../../../../../other/Urls";
import SessionContext from "../../../../../context/Session/session";
import { BackHandler } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";

function getColor(isMonthly) {
    return isMonthly ? [{
        backgroundColor: COLOR.black,
    }, {
        color: COLOR.white,
    }] : [{
        backgroundColor: COLOR.white,
    }, {
        color: COLOR.black,
    }]
}

export default function Plans({navigation, ...props}) {
    let session = useContext(SessionContext)
    const [isMonthly, setIsMonthly] = React.useState(true)
    const [packages, setPackages] = React.useState([{
        subscription_type: "Monthly",
    },{
        subscription_type: "Yearly",
    }])
    let data = isMonthly ? packages[0] : packages[1]
    const getSubscriptionPackages = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+session.session.token,

            }
        }
        fetch(Urls.listSubscriptionPackages, options).then(res => res.json()).then(res => {
            setPackages(res.results)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const route = useRoute();
  useEffect(() => {
        getSubscriptionPackages().then(r => console.log(r))
    }, [])
    function isSixMonthsPassed(dateJoined) {
        const dateParts = dateJoined.split(" @ ")[0].split(" ");
        const monthAbbreviation = dateParts[0];
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);
        const timeParts = dateJoined.split(" @ ")[1].split(":");
        let hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const ampm = dateJoined.split(" ")[3];
    
        if (ampm === "PM" && hours !== 12) {
            hours += 12;
        } else if (ampm === "AM" && hours === 12) {
            hours = 0;
        }
        const monthMap = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        const joinedDate = new Date(year, monthMap[monthAbbreviation] - 1, day, hours, minutes);
        const today = new Date();
    
        // Calculate the difference in months
        const diffMonths = (today.getFullYear() - joinedDate.getFullYear()) * 12 + (today.getMonth() - joinedDate.getMonth());
    
        return diffMonths >= 6;
    }
    

    

 
    
    const [isUser6MonthsOld, setIsUser6MonthsOld] = useState(false)
    let checkIfUserIs6MonthsOld = () => {
        if (isSixMonthsPassed(session.session.profile.date_joined)) {
            setIsUser6MonthsOld(true);
        } else {
            setIsUser6MonthsOld(false);
        }
    };
    
    useEffect(()=>{
        checkIfUserIs6MonthsOld()
    },[])
      
  useFocusEffect(
    useCallback(() => {
        console.log(isUser6MonthsOld);
        if (isUser6MonthsOld&&route.name === 'Plans') {
          const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'YES',
                onPress: () => BackHandler.exitApp(),
              },
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
          return () => {
            backHandler.remove();
          };
        }
    }, [checkIfUserIs6MonthsOld])
  )
    return (
        <View style={[styles.container]}>
           {!isUser6MonthsOld&& <TitleBar navigation={navigation} title={"Plans"}/>}
            <ScrollView contentContainerStyle={[styles.contentContainer, PADDINGS.H20]}>
                <View style={[styles.card, PADDINGS.v28]}>
                    <TextKdr style={[HEADINGS.H2]}>Pick a plan</TextKdr>
                    <TextKdr style={[HEADINGS.p1]}>You can choose your preferred premium plan from here. Check out the
                        yearly prices, you always get discount there. </TextKdr>
                </View>
                <View style={[PADDINGS.p0, FLEX_STYLE.rowCenter, FLEX_STYLE.spaceBetween]}>
                    <ButtonKdr onPress={() => setIsMonthly(true)} style={[styles.button, getColor(isMonthly)[0]]}
                               textStyle={[{color: COLOR.black}, getColor(isMonthly)[1]]} text={"Monthly"}/>
                    <ButtonKdr onPress={() => setIsMonthly(false)} style={[styles.button, getColor(!isMonthly)[0]]}
                               textStyle={[{color: COLOR.black}, getColor(!isMonthly)[1]]} text={"Yearly"}/>
                </View>
                <PlansComponent navigation={navigation} isMonthly={isMonthly} {...data}/>
                <ButtonKdr  onPress={() => {
                        session.clearSession();
                        navigation.reset({
                            index: 0,
                            routes: [{name: "WelcomeScreen"}],
                        });

                    }} style={[styles.button, {backgroundColor:COLOR.gray_900}]}
                               textStyle={[{color: COLOR.black}, getColor(isMonthly)[1]]} text={"Log out"}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
    },
    card: {
        borderRadius: 10,
        backgroundColor: COLOR.gray_600,
        padding: 20,
        marginVertical: 30,
    },
    button: {
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        borderWidth: 1,
        backgroundColor: COLOR.white,

        borderColor: COLOR.black,
    },
    contentContainer: {}
});