import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import { addPeople } from "../services/people"

const AddForm = ({ setAddFormShow, callback }: { setAddFormShow: Function, callback: Function }) => {
    const [name, setName] = useState<String>("")

    const add = async () => {
        const result = await addPeople(name)
        if (result) {
            callback()
            setAddFormShow(false)
        }
    }

    return (
        <View onTouchStart={() => setAddFormShow(false)} style={style.hover}>
            <View onTouchStart={event => event.stopPropagation()} style={style.popup}>
                <Text style={style.title}>Add People</Text>
                <TextInput onChangeText={text => setName(text)} placeholder="Name" style={style.input} />
                <TouchableOpacity onPressOut={add} style={style.buttonAdd}>
                    <Text style={style.textButtonAdd}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    hover: {
        flex: 1,
        backgroundColor: "rgba(10, 10, 10, .5)",
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: "center"
    },

    popup: {
        backgroundColor: "#f1f5f9",
        width: 320,
        padding: 20,
        borderRadius: 6
    },

    title: {
        fontSize: 25,
        textAlign: "center",
    },

    input: {
        borderColor: "#1e293b",
        borderWidth: 1,
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 6,
        marginVertical: 20
    },

    buttonAdd: {
        backgroundColor: "#047857",
        height: 40,
        borderRadius: 6
    },

    textButtonAdd: {
        textAlign: "center",
        lineHeight: 40,
        color: "#f1f5f9"
    }
})

export default AddForm