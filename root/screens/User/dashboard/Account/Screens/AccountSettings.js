import {FlatList, StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import SettingButton from "../../../../../components/Settings/SettingButton";
import {useContext} from "react";
import SessionContext from "../../../../../context/Session/session";
import settingNavigationData, {SettingToArray} from "../other/SettingNavigationData";


export default function AccountSettings({navigation, ...props}) {
    const session = useContext(SessionContext);

    return (
        <View style={[styles.container]}>
            <TitleBar title="Settings" navigation={navigation}/>
            <FlatList data={SettingToArray(settingNavigationData(navigation,session))}
                      contentContainerStyle={{
                          paddingHorizontal: 15,
                          marginTop: 20,
                          paddingBottom: 30,
                      }}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item, index}) => {
                          if (item.isTitle) {
                              return <TextKdr style={[HEADINGS.H3, {marginVertical: 4}]}>{item.title}</TextKdr>
                          }
                          return <SettingButton
                              icon={item.icon}
                              title={item.title}
                              description={item.description}
                              onPress={item?.onPress}
                              metaDescription={item.metaDescription}
                              screenName={item.screenName}
                              navigation={navigation}
                          />
                      }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
