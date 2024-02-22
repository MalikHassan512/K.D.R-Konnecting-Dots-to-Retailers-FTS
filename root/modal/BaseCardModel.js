import {Component} from "react";
import {Modal, View, StyleSheet, Image} from "react-native";
import {Card} from "../Styles/ComponentStyling/KDRMaterial";
import PADDING from "../Styles/PADDINGS";
import FLEX_STYLE from "../Styles/FLEXSTYLE";
import TextKdr from "../components/Text";
import {SafeAreaView} from "react-native-safe-area-context";


class BaseCardModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
    }

    close() {
        this.setState({isShow: false});
    }

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
                    <View style={[Card(), styles.container, {width: "80%"}, this.props.style]}>
                        {this.props.children}
                    </View>

                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 100,
    }
})

export default BaseCardModel;