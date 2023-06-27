import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import { getAllPeoples, searchPeoples, deletePeople } from './src/services/people'
import PeopleModel from './src/models/people'
import AddForm from './src/components/AddForm'
import EditForm from './src/components/EditForm'

function App(): JSX.Element {
  const [peoples, setPeoples] = useState<PeopleModel[]>([])

  const [searchValue, setSearchValue] = useState<String>("")
  const [searchStyle, setSearchStyle] = useState<Object[]>([style.searchInput])

  const [addFormShow, setAddFormShow] = useState<Boolean>(false)
  const [peopleEdit, setPeopleEdit] = useState<PeopleModel | null>(null)

  const getData = async () => {
    try {
      const peoplesData: PeopleModel[] = await getAllPeoples()
      setPeoples(peoplesData)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const searchFocus = () => {
    setSearchStyle([style.searchInput, style.seaechInputActive])
  }

  const searchBlur = () => {
    setSearchStyle([style.searchInput])
  }

  const search = async () => {
    try {
      const peoplesData: PeopleModel[] = await searchPeoples(searchValue)
      setPeoples(peoplesData)
    } catch (error) {
      console.error(error)
    }
  }

  const deletePeopleFunc = async (id: Number) => {
    try {
      await deletePeople(id)
      const peoplesData: PeopleModel[] = await getAllPeoples()
      setPeoples(peoplesData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={style.container}>
        <TextInput
          placeholder='Search People'
          returnKeyType='search'
          style={searchStyle}
          onChangeText={text => setSearchValue(text)}
          onFocus={searchFocus}
          onBlur={searchBlur}
          onSubmitEditing={search}
        />

        <ScrollView>

          {peoples.map((people, index) => (

            <View style={style.people} key={index}>
              <Text style={style.peopleName}>
                {people.name}
              </Text>
              <View style={style.buttonActionContainer}>
                <TouchableOpacity onPress={() => deletePeopleFunc(people.id)}>
                  <Text style={[style.buttonAction, { backgroundColor: "red" }]}>DELETE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setPeopleEdit(people)}>
                  <Text style={[style.buttonAction, { backgroundColor: "green" }]}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>

          ))}
        </ScrollView>



        <TouchableOpacity onPress={() => setAddFormShow(true)} style={style.buttonAddShape}>
          <Text style={style.buttonAddContent}>+</Text>
        </TouchableOpacity>
      </View>
      {
        addFormShow ? <AddForm setAddFormShow={setAddFormShow} callback={getData} /> : null
      }
      {
        peopleEdit !== null ? <EditForm name={peopleEdit.name} id={peopleEdit.id} setPeopleEdit={setPeopleEdit} callback={getData} /> : null
      }
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "#E0F2FE"
  },

  searchInput: {
    height: 40,
    fontSize: 16,
    textAlign: "center",
    margin: 20,
    marginBottom: 0,
  },

  seaechInputActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#94a3b8"
  },

  people: {
    margin: 20,
    marginTop: 0,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5
  },

  peopleName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },

  buttonActionContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
    marginTop: 20
  },

  buttonAction: {
    height: 40,
    width: 80,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    lineHeight: 40
  },

  buttonAddShape: {
    flex: 1,
    backgroundColor: "#0f766e",
    width: 50,
    height: 50,
    position: "absolute",
    right: 25,
    bottom: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    elevation: 5
  },

  buttonAddContent: {
    color: "white",
    fontSize: 30
  }
})

export default App;
