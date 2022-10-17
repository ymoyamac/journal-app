import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const primaryTheme = createTheme({
    palette: {
        primary: {
            main: "#262254"
        },
        secondary: {
            main: "#543884"
        },
        error: {
            main: red.A200
        }
    }
})