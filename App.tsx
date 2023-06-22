import React, { useCallback, useEffect, useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import { getDBConnection } from './src/configs/database'
import { getAllPeoples, searchPeoples, deletePeople } from './src/services/people'
import peopleModel from './src/models/people'
import AddForm from './src/components/AddForm'

function App(): JSX.Element {
  const [addFormShow, setAddFormShow] = useState<Boolean>(false)
  const [peoples, setPeoples] = useState<peopleModel[]>([])
  const [searchValue, setSearchValue] = useState<String>("")

  const getData = async () => {
    try {
      const peoplesData: peopleModel[] = await getAllPeoples()
      setPeoples(peoplesData)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const search = async () => {
    try {
      const db = await getDBConnection();
      const peoplesData: peopleModel[] = await searchPeoples(db, searchValue)
      setPeoples(peoplesData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log("Screen Rendered")
  }, [])

  const deletePeopleFunc = async (id: Number) => {
    try {
      const db = await getDBConnection();
      await deletePeople(db, id)
      const peoplesData: peopleModel[] = await getAllPeoples()
      setPeoples(peoplesData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={style.container}>
        <View style={style.searchContainer}>
          <TextInput onChangeText={text => setSearchValue(text)} placeholder='Search name' style={style.searchInput} />
          <TouchableOpacity onPress={search} style={style.searchButton}>
            <Text style={style.searchTextButton}>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>

          {peoples.map((people, index) => (

            <View style={{ flex: 1, marginBottom: 20, borderWidth: 1, padding: 10 }} key={index}>
              <Text>
                {people.name}
              </Text>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 10, gap: 10 }}>
                <TouchableOpacity style={{ width: 100 }} onPress={() => deletePeopleFunc(people.id)}>
                  <Text style={{ backgroundColor: "red", height: 30, lineHeight: 30, color: "white", textAlign: "center" }}>DELETE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 100 }}>
                  <Text style={{ backgroundColor: "green", height: 30, lineHeight: 30, color: "white", textAlign: "center" }}>Edit</Text>
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
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20
  },

  searchContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },

  searchInput: {
    flex: 1,
    borderColor: "#1e293b",
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 6
  },

  searchButton: {
    backgroundColor: "#047857",
    height: 40,
    width: 80,
    borderRadius: 6
  },

  searchTextButton: {
    lineHeight: 40,
    fontSize: 16,
    textAlign: "center",
    color: "#f1f5f9"
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
    borderRadius: 25
  },

  buttonAddContent: {
    color: "white",
    fontSize: 30
  }
})

export default App;
