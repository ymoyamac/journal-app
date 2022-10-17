import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";

export function NoteView() {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight="light">28th August 2022</Typography>
        </Grid>
        <Grid item>
            <Button color="primary" sx={{ padding: 2 }}>
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
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="What happened today?"
                minRows={5}
                sx={{ border: "none", mb: 1 }}
            />
        </Grid>

        <ImageGallery />
    </Grid>
  )
}
