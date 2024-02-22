import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import ButtonKdr from "../../components/Button/Buttonkdr";
import TextInputKdr from "../../components/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextKdr from "../../components/Text";
import HEADINGS from "../../Styles/heading";
import TitleBar from "../../components/TitleBar/TitleBar";
import SessionContext from "../../context/Session/session";
import Urls from "../../other/Urls";
import Toast from "react-native-toast-message";
const Feedback = ({ navigation }) => {
  const [feedback, setFeedback] = useState("");
  const session = useContext(SessionContext)
  const showToast = (type,txt1,txt2) => {
    Toast.show({
        type: type,
        text1: txt1||"",
        text2: txt2||"",
    });

}
  const handleSubmit= async()=>{
    const data={feedback:feedback}
    console.log(JSON.stringify(data),"re");
     fetch(Urls.AddFeedback,
      {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
              'Authorization': 'Token ' + session.session.token

          },
          body: JSON.stringify(data)
      })
      
      
      .then((response) => {
        console.log(response.status);
        if(response.status===201){
          showToast("success", "Feedback Submitted.")
          setFeedback("")
        }else
        showToast("error", "Error while submitting feeback.")
 
      })
      .catch((error) => {
        console.log(feedback);
          console.log(error.message)
          showToast("error", "Error while submitting feeback.")
         })


}
  
  return (
    <View style={{ flex: 1 }}>
      <TitleBar title="Feedback" navigation={navigation} />

      <View style={{ paddingHorizontal: 10,paddingVertical:20 }}>
        <TextKdr style={{...HEADINGS.H3,marginLeft:10}}>Provide feedback here to improve app.</TextKdr>
        <TextInputKdr
          outlineStyle={[
            {
              minHeight: 120,
              maxHeight: 180,
              textAlignVertical: "top",
              marginTop: 5,
            },
          ]}
          containerStyle={{ marginTop: 10, flex: null }}
          error={""}
          // label={"Email"}
          placeholder={"Enter Your Message."}
          multiline={true}
          value={feedback}
          onChangeText={(e) => {
            setFeedback(e);
          }}
        />

        <ButtonKdr onPress={handleSubmit} text={"Submit"} />
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({});
