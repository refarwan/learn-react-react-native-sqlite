import peopleModel from "../models/people"
import { getDBConnection } from "../configs/database"

import { SQLiteDatabase } from "react-native-sqlite-storage"

export const getAllPeoples = async (): Promise<peopleModel[]> => {
    try {
        const peopleItems: peopleModel[] = []
        const db = await getDBConnection()
        const results = await db.executeSql(`SELECT * FROM people ORDER BY id DESC`)
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                peopleItems.push(result.rows.item(index))
            }
        })
        return peopleItems
    } catch (error) {
        console.error(error)
        throw Error('Failed to get all peoples')
    }
}

export const searchPeoples = async (search: String): Promise<peopleModel[]> => {
    try {
        const peopleItems: peopleModel[] = []
        const db = await getDBConnection()
        const results = await db.executeSql(`SELECT * FROM people WHERE name LIKE "%${search}%"`)
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                peopleItems.push(result.rows.item(index))
            }
        })
        return peopleItems
    } catch (error) {
        console.error(error)
        throw Error('Failed to search peoples')
    }
}

export const addPeople = async (name: String): Promise<Boolean> => {
    try {
        const db = await getDBConnection()
        await db.executeSql(`INSERT INTO people (name) VALUES ("${name}")`)
        return true
    } catch (error) {
        console.error(error)
        throw Error("Failed to add people")
    }
}

export const deletePeople = async (id: Number): Promise<void> => {
    try {
        const db = await getDBConnection()
        await db.executeSql(`DELETE FROM people WHERE id = ${id}`)
    } catch (error) {
        console.error(error)
        throw Error("Failed to delete people")
    }
}

export const editPeople = async (id: Number, newName: String): Promise<Boolean> => {
    try {
        const db = await getDBConnection()
        await db.executeSql(`UPDATE people SET name = "${newName}" WHERE id = ${id}`)
        return true
    } catch (error) {
        console.error(error)
        throw Error("Failed to update people")
    }
}