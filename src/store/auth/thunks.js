import { async } from "@firebase/util"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase"
import { clearNotesAfterLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"

export function checkingAuthentication(email, password) {
    return async(dispatch) => {
        dispatch(checkingCredentials())
    }
}

export function startGoogleSignIn() {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        console.log(result)
        if (!result.ok) {
            return dispatch(logout(result.errorMessage))
        }
        dispatch(login(result))
    }
}

export function startCreatingUserWithEmailPassword({ email, password, displayName }) {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
        if (!ok) {
            return dispatch(logout({ errorMessage }))
        }
        dispatch(login({ uid, displayName, email, photoURL }))
    }
}

export function startLoginWithEmailPassword({ userEmail, password }) {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, email, displayName, photoURL, errorMessage } = await loginWithEmailPassword({ userEmail, password })
        if (!ok) {
            return dispatch(logout({ errorMessage }))
        }
        dispatch(login({ uid, email, displayName, photoURL }))
    }
}

export function startLogOut() {
    return async(dispatch) => {
        await logoutFirebase()
        dispatch(clearNotesAfterLogout())
        dispatch(logout())
    }
}