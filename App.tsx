import React, { useCallback, useEffect, useState } from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'

import { getDBConnection } from './src/configs/database'
import { addPeople, getAllPeoples, searchPeoples } from './src/services/people'
import peopleModel from './src/models/people'

function App(): JSX.Element {
  const [peoples, setPeoples] = useState<peopleModel[]>([])
  const [searchValue, setSearchValue] = useState<String>("")
  const [newPeople, setNewPeople] = useState<String>("")

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const peoplesData: peopleModel[] = await getAllPeoples(db)
      setPeoples(peoplesData)
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    loadDataCallback()
  }, [loadDataCallback])

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

  const add = async () => {
    try {
      const db = await getDBConnection();
      await addPeople(db, newPeople)
      const peoplesData: peopleModel[] = await getAllPeoples(db)
      setPeoples(peoplesData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      <TextInput onChangeText={text => setSearchValue(text)} style={{ borderWidth: 1, borderRadius: 6, paddingHorizontal: 15 }} />
      <TouchableOpacity onPress={search}>
        <Text style={{ color: "white", height: 40, backgroundColor: "blue", lineHeight: 40, textAlign: "center", borderRadius: 6 }}>Search</Text>
      </TouchableOpacity>
      {peoples.map((people, index) => (
        <Text key={index}>
          {people.name}
        </Text>
      ))}

      <TextInput onChangeText={text => setNewPeople(text)} style={{ borderWidth: 1, borderRadius: 6, paddingHorizontal: 15 }} />
      <TouchableOpacity onPress={add}>
        <Text style={{ color: "white", height: 40, backgroundColor: "blue", lineHeight: 40, textAlign: "center", borderRadius: 6 }}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App;
