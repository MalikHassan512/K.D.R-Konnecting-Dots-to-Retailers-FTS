import {Modal, Pressable, StyleSheet, View} from "react-native";
import COLOR from "../../../../../Styles/Color";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import MARGINS from "../../../../../Styles/MARGIN";
import {useEffect, useState} from "react";

export default function Trial({navigation,session,style, ...props}) {
    const [isVisible, setIsVisible] = useState(true);
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
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
   
      >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style={[styles.container,styles.card,style]}>
            <TextKdr style={[HEADINGS.H2,MARGINS.v10]}>Trial {
                isUser6MonthsOld?
                    "Expired":
                    "Started"
            }</TextKdr>
            {
                !isUser6MonthsOld?
                    <TextKdr style={[HEADINGS.p,MARGINS.v0]}>Trial Started
                        You can enjoy a trial period of 6 months. Select a plan to enjoy all services.
                        Explore Plans</TextKdr>:
                    <TextKdr style={[HEADINGS.p,MARGINS.v0]}>Trial Expired. You can't upload more products/services and
                        your existing products/services won't be displayed to other users. Buy a subscription to continue.</TextKdr>


            }
            <Pressable onPress={()=>{
                setIsVisible(false);
                navigation.navigate("Plans")}}>
                <TextKdr style={[HEADINGS.p,MARGINS.v22,{color:COLOR.primary,    textDecorationLine: 'underline',}]}>Explore Plans</TextKdr>
            </Pressable>

        </View>
      </View>
      </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
     flex:1
    },
    card: {
        borderRadius: 10,
        backgroundColor: COLOR.gray_600,
        padding: 20,
        marginVertical: 30,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        height:"50%",
        // backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
});