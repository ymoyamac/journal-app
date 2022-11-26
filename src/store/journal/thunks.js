import { async } from "@firebase/util"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase"
import { fileUplaod, loadNotes } from "../../helpers"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotoToActiveNote, setSaving, updatedNote } from "./journalSlice"

export function startNewNote() {
    return async(dispatch, getState) => {
        dispatch(savingNewNote())
        const { uid } = getState().auth
        const newNote = {
            title: "",
            body: "",
            imageUrls: [],
            date: new Date().getTime()
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)
        newNote.id = newDoc.id
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}

export function startLodingNotes() {
    return async(dispatch, getState) => {
        const { uid } = getState().auth
        if(!uid) {
            throw new Error("This user does not exit")
        }
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export function startSaveNote() {
    return async(dispatch, getSate) => {
        dispatch(setSaving())
        const { uid } = getSate().auth
        const { active:note } = getSate().journal

        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })
        dispatch(updatedNote(note))
    }
}

export function startUploadingFiles(files = []) {
    return async(dispatch) => {
        dispatch(setSaving())
        const fileUploadPromise = []
        for (const file of files) {
            fileUploadPromise.push(fileUplaod(file))
        }
        const photosUrls = await Promise.all(fileUploadPromise)
        dispatch(setPhotoToActiveNote(photosUrls))
    }
}

export function startDeletingNote() {
    return async(dispatch, getState) => {
        const { uid } = getState().auth
        const { active:note } = getState().journal
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id))
    }
}