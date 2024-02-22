import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons"; // Import icons from Expo Icons
import TextKdr from "../Text";
import HEADINGS from "../../Styles/heading";
import { StyleSheet } from "react-native";
function PasswordValidation({ password,setIsValid=()=>{} }) {
  const [passwordValData, setPasswordValidation] = useState({
    digit_8: false,
    one_upper_lower: false,
    one_number: false,
  });

  function checkPassword(password) {
    let data = { ...passwordValData };
    data.digit_8 = password.length >= 8;
    data.one_upper_lower = /[A-Z]/.test(password) && /[a-z]/.test(password);
    data.one_number = /\d/.test(password);
    setPasswordValidation(data);
    setIsValid( data.digit_8&&data.one_upper_lower&&data.one_number)
  }

  // Check the password when it changes
  useEffect(() => {
    checkPassword(password);
  }, [password]);

  return (
    <View style={{width:"100%",paddingHorizontal:5}}>
      <View style={styles.textContainer}>
        {passwordValData.digit_8 ? (
          <Entypo name="check" size={22} color="green" /> // Checkmark icon
        ) : (
          <Entypo name="cross" size={22} color="red" /> // Cross icon
        )}
        <TextKdr style={{ ...HEADINGS.H4 }}>Minimum 8 characters</TextKdr>
      </View>
      <View style={styles.textContainer}>
        {passwordValData.one_number ? (
          <Entypo name="check" size={22} color="green" />
        ) : (
          <Entypo name="cross" size={22} color="red" />
        )}
        <TextKdr style={{ ...HEADINGS.H4 }}>At least 1 number(0-9)</TextKdr>
      </View>
      <View style={styles.textContainer}>
        {passwordValData.one_upper_lower ? (
          <Entypo name="check" size={22} color="green" />
        ) : (
          <Entypo name="cross" size={22} color="red" />
        )}
        <TextKdr style={{ ...HEADINGS.H4 }}>
          At least one upper and one lower case
        </TextKdr>
      </View>
   
    </View>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    gap:10,
  },
  iconStyle:{
    fontWeight:"bold"
  }
});

export default PasswordValidation;
