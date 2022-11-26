import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useRef } from "react"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"

import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

export function NoteView() {

    const dispatch = useDispatch()
    const { active: currentNote, savedMessage, isSaving } = useSelector(state => state.journal)
    const { title, body, date, onInputChange, formState } = useForm(currentNote)

    const dateString = useMemo(() => {
        return new Date(date).toUTCString()
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if(savedMessage.length > 3) {
            Swal.fire("Note has been successfully updated", savedMessage, "success")
        }
    }, [savedMessage])

    function onSaveNote() {
        dispatch( startSaveNote() )
    }

    function onFileInputChange({target:{files}}) {
        if(files === 0) {
            return
        }
        dispatch(startUploadingFiles(files))
    }

    function onDeleteNote() {
        dispatch(startDeletingNote())
    }

    return (
        <Grid className="animate__animated animate__fadeIn animate__faster" container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: "none" }}
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadFileOutlined />
                </IconButton>
                <Button
                    disabled={isSaving}
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save Note
                </Button>
            </Grid>
            <Grid container sx={{ mt: 2, mb: 2 }}>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Type your title"
                    label="Title"
                    sx={{ border: "none", mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                    sx={{ border: "none", mb: 1 }}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    onClick={onDeleteNote}
                    sx={{mt: 2}}
                    color="error"
                >
                    <DeleteOutline />
                    Delete
                </Button>

            </Grid>

            <ImageGallery images={currentNote.imageUrls}/>
        </Grid>
    )
}
