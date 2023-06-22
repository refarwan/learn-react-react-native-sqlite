import { openDatabase, enablePromise } from "react-native-sqlite-storage"

enablePromise(true)

export const getDBConnection = async () => {
    return openDatabase({ name: "sqlite.db", createFromLocation: 1 }, () => { }, error => { console.log(error) })
};