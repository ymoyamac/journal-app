
import { Link as RouterLink } from "react-router-dom";

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const FORM_DATA = {
  email: "",
  password: "",
  displayName: ""
}

const FORM_VALIDATIONS = {
  email: [(value) => value.includes("@"), "Email should have @ character"],
  password: [(value) => value.length >= 6, "Password must be longer than six characters"],
  displayName: [(value) => value.length >= 1, "Name is required"],
}

export function Register() {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)

  const isCheckingAuthentication = useMemo(() => status === "checking", [status])

  const {
    displayName,
    email,
    password, 
    onInputChange, 
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid
  } = useForm(FORM_DATA, FORM_VALIDATIONS)

  function onSubmit(event) {
    event.preventDefault()
    setFormSubmitted(true)
    if(!isFormValid) {
      return
    }
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout
      title="Register"
    >
      <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                label="Full Name"
                type="text"
                placeholder="Name"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="Email"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>
            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuthentication}>
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }} >Do you already have an account</Typography>
            <Link component={ RouterLink } color="inherit" to="/auth/login">
              Sign in
            </Link>
          </Grid>
        </form>
    </AuthLayout>
  );
}
