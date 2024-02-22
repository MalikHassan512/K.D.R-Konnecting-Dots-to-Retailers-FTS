import {StyleSheet, View, TextInput, Pressable} from "react-native";
import {EvilIcons} from '@expo/vector-icons';
import TextKdr from "../Text";
import {SimpleLineIcons} from '@expo/vector-icons';

export default function SearchInput({
                                        navigation,
                                        style,
                                        hideRightIcon,
                                        search,
                                        setSearch,
                                        onPress,
                                        editable,
                                        handleLocationSearch,
                                        ...props
                                    }) {

    return (
        <Pressable onPress={() => {
            if (editable === false) {
                onPress();
            }
        }} style={[styles.container, style]}>
            <EvilIcons name="search" size={24} color="#AAAAAA"/>
            <TextInput style={[styles.input]} placeholder={"Search"}
                       value={search}
                       onChangeText={
                           (text) => {
                               setSearch(text);
                           }
                       }
                       editable={editable}
                       {...props}

            />
            {hideRightIcon ? null :
                <>
                    <TextKdr style={styles.line}>|</TextKdr>
                    <SimpleLineIcons name="cursor" size={15} style={{padding:8}} color="#AAAAAA" onPress={handleLocationSearch}/>
                </>
            }
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingVertical: 5,
    }, input: {
        flex: 1,
        marginHorizontal: 10,

    },
    line: {
        marginHorizontal: 5,
        color: "#AAAAAA"
    },
    cursor: {
        marginHorizontal: 2,
        marginTop: 3,
    },
    inputContainer: {
        flex: 1,

    }

});