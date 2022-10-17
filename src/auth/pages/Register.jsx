
import { Link as RouterLink } from "react-router-dom";

import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export function Register() {
  return (
    <AuthLayout
      title="Register"
    >
      <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                label="Full Name"
                type="text"
                placeholder="Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
              />
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" fullWidth>
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
