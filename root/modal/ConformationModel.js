import {Component} from "react";
import {Modal, View, StyleSheet, Image, Platform, Linking, Pressable} from "react-native";
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


class ConformationModel extends Component {
    isIOS = false;

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
    }

    close() {
        this.setState({isShow: false});

    }

    //check if platform is ios

    open() {
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
                        style={[Card(), FLEX_STYLE.center, FLEX_STYLE.column, {width: "70%"}, styles.container, this.props.style]}>
                        <TextKdr style={[HEADINGS.H1, PADDING.v12, {
                            fontSize: 15,
                        }]}>
                            {this.props?.title}
                        </TextKdr>
                        <View style={{
                            borderBottomColor: COLOR.gray_600,
                            borderBottomWidth: 1,
                            flex: 1,
                            width: "100%",
                        }}/>

                        <View style={[FLEX_STYLE.row, FLEX_STYLE.center, PADDING.v18]}>
                            <TextKdr style={[MARGINS.v18, HEADINGS.p,MARGINS.H10]}>{this.props.message}</TextKdr>
                        </View>
                        <View style={[FLEX_STYLE.row, FLEX_STYLE.center, {
                            width: "100%",
                            borderTopColor: COLOR.gray_600,
                            borderTopWidth: 1,
                        }]}>
                            <Pressable
                                onPress={() => this.close()}
                                style={[{
                                    flex: 1,
                                    borderRightWidth: 1,
                                    padding: 8,
                                    borderRightColor: COLOR.gray_600,
                                }, FLEX_STYLE.center]}>
                                <TextKdr>
                                    No
                                </TextKdr>
                            </Pressable>
                            <Pressable
                                onPress={() => this.props.onPressYes()}
                                style={[{flex: 1, padding: 8,}, FLEX_STYLE.center]}>
                                <TextKdr>
                                    Yes
                                </TextKdr>
                            </Pressable>

                        </View>

                    </View>

                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 100,
        padding: 0,
        borderRadius: 15,


    },
    call: {
        backgroundColor: COLOR.gray_600,
    }
})

export default ConformationModel;