import { getApiClient } from "@/services/axios"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

export default function ProcessDash() {
    return <h3>ProcessDash Coordinator</h3>
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

    if(result.data.role != "coordinator"){
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