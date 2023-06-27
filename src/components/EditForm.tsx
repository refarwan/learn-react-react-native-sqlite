import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import { editPeople } from "../services/people"

const EditForm = ({ name, id, setPeopleEdit, callback }: { name: string, id: number, setPeopleEdit: Function, callback: Function }) => {
    const [newName, setNewName] = useState<string>(name)

    const edit = async () => {
        const result = await editPeople(id, newName)
        if (result) {
            callback()
            setPeopleEdit(null)
        }
    }

    return (
        <View onTouchStart={() => setPeopleEdit(null)} style={style.hover}>
            <View onTouchStart={event => event.stopPropagation()} style={style.popup}>
                <Text style={style.title}>Edit People</Text>
                <TextInput onChangeText={text => setNewName(text)} value={newName} placeholder="Name" style={style.input} />
                <TouchableOpacity onPressOut={edit} style={style.buttonAdd}>
                    <Text style={style.textButtonAdd}>Save</Text>
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

export default EditForm