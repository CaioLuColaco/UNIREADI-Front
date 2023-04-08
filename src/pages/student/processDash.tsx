import { AuthContext } from "@/contexts/AuthContext"
import { getApiClient } from "@/services/axios"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { useContext } from "react"

export default function ProcessDash() {
    const { user } = useContext(AuthContext)
    console.log(user)
    return (
        <>
            <h3>ProcessDash Student</h3>
            <h2>Olá {user?.name}</h2>
        </> 
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getApiClient(ctx)
    const { ['uniReadiToken']: token} = parseCookies(ctx)

    if(!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    const result = await apiClient.post('/decodeToken', {token: token})

    if(result.data.role == "coordinator"){
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}