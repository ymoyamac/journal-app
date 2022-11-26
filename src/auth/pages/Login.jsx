import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

const INITIAL_STATE = {
  email: "yael_moya@correo.com",
  password: "123456"
}

export function Login() {

  const { status, errorMessage } = useSelector(state => state.auth)
  const { email, password, onInputChange, formState } = useForm(INITIAL_STATE)
  const dispatch = useDispatch()
  const isAuthenticated = useMemo(() => status === "checking", [status])

  function onSubmit(event) {
    event.preventDefault()
    dispatch(startLoginWithEmailPassword({ userEmail: email, password }))
  }
  
  function onGoogleSignIn() {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout
      title="Login"
    >
        
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container spacing={2} sx={{mb:2, mt:1}}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="Email"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
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
              />
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isAuthenticated}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthenticated}
                  onClick={onGoogleSignIn} 
                  variant="contained" 
                  fullWidth
                >
                  <Google />
                  <Typography sx={{ ml: 1 }} >Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={ RouterLink } color="inherit" to="/auth/register">
              Create New Account
            </Link>
          </Grid>
        </form>
    </AuthLayout>
  );
}
