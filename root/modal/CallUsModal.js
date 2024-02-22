import {Component} from "react";
import {Modal, View, StyleSheet, Image, Platform, Linking} from "react-native";
import {Card, Circle} from "../Styles/ComponentStyling/KDRMaterial";
import FLEX_STYLE from "../Styles/FLEXSTYLE";
import MARGINS from "../Styles/MARGIN";
import COLOR from "../Styles/Color";
import {Feather, Ionicons} from "@expo/vector-icons";
import TextKdr from "../components/Text";
import HEADINGS from "../Styles/heading";
import ContactNumber from "../other/satticString";
import ButtonKdr from "../components/Button/Buttonkdr";
import PADDING from "../Styles/PADDINGS";


class CallUsModal extends Component {
    isIOS = Platform.OS === 'ios';

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
    }

    close() {
        console.log("closing");
        this.setState({isShow: false});

    }

    //check if platform is ios

    show() {
        console.log("showing");
        this.setState({isShow: true});
    }

    render() {
        return (

            <Modal
                animationType="slide"
                transparent={true}
                backdropOpacity={0.9}
                onRequestClose={() => {
                    this.close();
                }}
                visible={this.state.isShow}
            >
                <View style={[FLEX_STYLE.one, FLEX_STYLE.center]}>
                    <View
                        style={[Card(), styles.container, FLEX_STYLE.center, FLEX_STYLE.column, {width: "70%"}, this.props.style]}>
                        {
                            !this.isIOS ? null :
                                <View style={[FLEX_STYLE.row]}>
                                    <View style={[FLEX_STYLE.one]}></View>
                                    <Ionicons name="close" size={24} color="black" onPress={() => this.close()}/>
                                </View>
                        }


                        <View style={[Circle(90), styles.call, MARGINS.v4, FLEX_STYLE.center]}>
                            <Feather name="phone-call" size={24} color="black"/>
                        </View>
                        <View style={[FLEX_STYLE.row, FLEX_STYLE.center]}>
                            <TextKdr style={[MARGINS.v10, HEADINGS.H2]}>Call Us </TextKdr>
                            <TextKdr
                                style={[MARGINS.v20, HEADINGS.H3, {color: COLOR.primary}]}> {ContactNumber} </TextKdr>
                            <TextKdr style={[MARGINS.v10, HEADINGS.H2]}>?</TextKdr>
                        </View>
                        <ButtonKdr text={"Call Now"} onPress={() => {
                            Linking.openURL(`tel:${ContactNumber}`).then(r => this.close()).catch(e => console.log(e))

                        }} style={[PADDING.H24, PADDING.p0, MARGINS.v10]}
                                   innerStyle={[{flex: null}, FLEX_STYLE.center, FLEX_STYLE.row]}>
                            <Ionicons name="call-outline" size={18} style={[{marginRight: 10}]} color="white"/>
                        </ButtonKdr>

                    </View>

                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 100,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 15,


    },
    call: {
        backgroundColor: COLOR.gray_600,
    }
})

export default CallUsModal;