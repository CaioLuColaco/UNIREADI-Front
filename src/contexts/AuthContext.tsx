import api from "@/services/api";
import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

export const AuthContext = createContext({} as any)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'uniReadiToken': token } = parseCookies()

        if(token) {
            api.post("/decodeToken", { token: token}).then((res) => setUser(res.data))
        }
    }, [])

    async function logIn(email: string, password: string) {
        const result = await api.post("/auth/loginUser", {
            email: email,
            password: password
        })

        const token = result.data.token

        setCookie(undefined, 'uniReadiToken', token, {
            maxAge: 60 * 60 * 1 // Token expires in one hour
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        setUser(result.data.user)

        if(result.data.user.role == "student"){
            Router.push("/student/processDash")
        }

        if(result.data.user.role == "coordinator"){
            Router.push("/coordinator/processDash")
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, logIn }}>
            {children}
        </AuthContext.Provider>
    )
}