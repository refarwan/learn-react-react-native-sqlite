import { SQLiteDatabase } from "react-native-sqlite-storage"
import peopleModel from "../models/people"

export const getAllPeoples = async (db: SQLiteDatabase): Promise<peopleModel[]> => {
    try {
        const peopleItems: peopleModel[] = []
        const results = await db.executeSql(`SELECT * FROM people`)
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

export const searchPeoples = async (db: SQLiteDatabase, search: String): Promise<peopleModel[]> => {
    try {
        const peopleItems: peopleModel[] = []
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