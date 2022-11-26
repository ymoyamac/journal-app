import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase"

export async function loadNotes(uid) {
    if(!uid) {
        throw new Error("This user does not exit")
    }
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const notes = []
    docs.forEach((doc) => {
        notes.push({id: doc.id, ...doc.data()})
    })
    console.log(notes)
    return notes
}