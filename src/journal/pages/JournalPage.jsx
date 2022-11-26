import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothigSelectedView } from '../views'

export function JournalPage() {

  const dispatch = useDispatch()
  const state = useSelector(state => state.journal)

  function onClickNewNote() {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {
        (!!state.active) ? (<NoteView />) : (<NothigSelectedView />)
      }
      <IconButton
        onClick={onClickNewNote}
        disabled={state.isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity:0.9},
          position: "fixed",
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
