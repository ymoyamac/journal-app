import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: "",
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.savedMessage = ""
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.savedMessage = ""
        },
        updatedNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map((note) => {
                if(note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })
            state.savedMessage = `Note ${action.payload.title} has been successfully updated`
        },
        setPhotoToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]
            state.isSaving = false
        },
        clearNotesAfterLogout: (state) => {
            state.isSaving = false
            state.savedMessage = ""
            state.notes = []
            state.active = null
        },
        deleteNoteById: (state, action) => {
            state.active = null
            state.notes = state.notes.filter(note => note.id !== action.payload)
        },
    }
});

export const {
    addNewEmptyNote,
    clearNotesAfterLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotoToActiveNote,
    setSaving,
    updatedNote
} = journalSlice.actions;