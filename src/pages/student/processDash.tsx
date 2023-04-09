import { getApiClient } from "@/services/axios"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import { useContext, useEffect, useState } from "react"
import styles from "@/styles/StudentDash.module.css"
import { api } from "@/services/api"
import Navbar from "@/components/navbar"

export default function ProcessDash({ user, allProcess }: any) {

    const [userData, setUserData] = useState(user)
    const [historicUrl, setHistoricUrl] = useState(user.historic)

    const [userNameEditor, setUserNameEditor] = useState(user.name)
    const [userCourseEditor, setUserCourseEditor] = useState(user.course)

    const inscribeUser = async (processId: string) => {
        if(userData.historic == "") {
            console.log("Para se inscrever precisa anexar o historico!")
            window.scrollTo({ top: 1000, behavior: 'smooth' })
            return
        }

        await api.post('/userProcess', {
            userId: user.id,
            processId: processId
        }).then((res) => {
            updateUser()
        }).catch((error) => console.log(error))
    }

    const updateUser = async () => {
        await api.get(`/user/${userData.id}`).then((res) => setUserData(res.data)).catch((error) => console.log(error))
    }

    const handleRegisterHistoric = async () => {
        await api.put(`/user/${userData.id}`, {historic: historicUrl}).then((res) => updateUser()).catch((error) => console.log(error))
    }

    return (
        <>
            <Head>
                <title>UniReadi - Dash</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar/>

                <div className={styles.firstView}>

                    <div className={styles.meProcess}>
                        <h2>Meus Processos</h2>

                        {userData.userProcess.map((process: any) => {
                            return (
                                <div className={styles.processCard} key={process.process.id} style={{backgroundColor: "#798842", color: "white"}}>

                                    <div className={styles.cardContent}>

                                        <h3>{process.process.name}</h3>

                                        <div className={styles.dataProcessCard}>
                                            <div className={styles.dataValue}>
                                                <h4>{process.process.vacancys}</h4>
                                                <p>Vagas</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.process.scholarships}</h4>
                                                <p>Bolsas</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.process.course}</h4>
                                                <p>Curso</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.process?.beginDate?.slice(8,10)}/{process.process?.beginDate?.slice(5,7)} - {process.process?.endDate?.slice(8,10)}/{process.process?.endDate?.slice(5,7)}</h4>
                                                <p>Periodo</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.process.status}</h4>
                                                <p>Status</p>
                                            </div>
                                        </div>
                                    </div>
                                        
                                </div>
                            )
                        })
                        
                        }

                    </div>

                    <div className={styles.allProcess}>
                        <h2>Processos Disponíveis</h2>

                        {allProcess.map((process: any) => {
                            return (
                                <div className={styles.processCard} key={process.id}>

                                    <div className={styles.cardContent}>

                                        <h3>{process.name}</h3>

                                        <div className={styles.dataProcessCard}>
                                            <div className={styles.dataValue}>
                                                <h4>{process.vacancys}</h4>
                                                <p>Vagas</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.scholarships}</h4>
                                                <p>Bolsas</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.course}</h4>
                                                <p>Curso</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.beginDate.slice(8,10)}/{process.beginDate.slice(5,7)} - {process.endDate.slice(8,10)}/{process.endDate.slice(5,7)}</h4>
                                                <p>Periodo</p>
                                            </div>
                                            <div className={styles.dataValue}>
                                                <h4>{process.status}</h4>
                                                <p>Status</p>
                                            </div>
                                        </div>
                                    </div>

                                        <div className={styles.cardEditButton}>
                                            <button onClick={() => inscribeUser(process.id)} disabled={process.status=="fechado" || new Date()>new Date(process.endDate) ? true : false}>Inscrever</button>
                                        </div>

                                </div>
                                    
                            )
                            })
                        }
                    </div>

                </div>

                <div className={styles.secondView}>
                    <h2>Dados Pessoais</h2>

                    <div className={styles.datasContainer}>
                        <div className={styles.signupFields}>
                                <div>
                                    <h3>Nome</h3>
                                    <input type="text" disabled placeholder="Escreva aqui..." value={userNameEditor} onChange={(e) => setUserNameEditor(e.target.value)}/>
                                </div>

                                <div>
                                    <h3>Curso</h3>
                                    <input type="text" disabled placeholder="Escreva aqui..." value={userCourseEditor} onChange={(e) => setUserCourseEditor(e.target.value)}/>
                                </div>

                                <div>
                                    <h3>Email</h3>
                                    <input type="email" disabled onChange={(e) => console.log(e.target.value)} value={userData.email}/>
                                </div>

                                <div>
                                    <h3>Cargo</h3>
                                    <input type="text" disabled value={userData.role}/>
                                </div>

                                <div>
                                    <h3>Historico Escolar</h3>
                                    <input type="text" disabled={userData.historic==""? false : true} placeholder="Digite aqui a URL" onChange={(e) => setHistoricUrl(e.target.value)} value={historicUrl}/>
                                </div>

                                <button onClick={() => handleRegisterHistoric()}>Cadastrar Historico</button>

                        </div>
                    </div>
                </div>

            </main>
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

    if(result.data.role != "student"){
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    const allProcess = await api.get("/process")

    return {
        props: { 
            user: result.data, 
            allProcess: allProcess.data
        }
    }
}