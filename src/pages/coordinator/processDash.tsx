import { getApiClient } from "@/services/axios"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import styles from '@/styles/CoordinatorDash.module.css'
import Navbar from "@/components/navbar"
import { useState } from "react"
import { api } from "@/services/api"

export default function ProcessDash({ user }: any) {

    const [dataUser, setDataUser] = useState(user)
    const [viewProcess, setViewProcess]: any = useState()
    const [vacancysView, setVacancysView] = useState(0)
    const [scholarshipsView, setScholarShipsView] = useState(0)

    const [nameProcess, setNameProcess] = useState("")
    const [descriptionProcess, setDescriptionProcess] = useState("")
    const [statusProcess, setStatusProcess] = useState("")
    const [vacancysProcess, setVacancysProcess] = useState(0)
    const [scholarShipsProcess, setScholarShipsProcess] = useState(0)
    const [beginDateProcess, setBeginDateProcess] = useState("")
    const [endDateProcess, setEndDateProcess] = useState("")

    const [alertRegister, setAlertRegister] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [editProcessId, setEditProcessId] = useState("")

    const getViewProcess = async (processId: string) => {
        await api.get(`/process/${processId}`).then((res) => {

            var vacancys = res.data.vacancys
            var scholarShips = res.data.scholarships

            const usersProcess = res.data.userProcess

            for(user of usersProcess){
                if(user.scholarAccept) {
                    scholarShips = scholarShips- 1
                }
                if(user.vacancyAccept){
                    vacancys = vacancys - 1
                }
            }

            setVacancysView(vacancys)
            setScholarShipsView(scholarShips)
            setViewProcess(res.data)

            window.scrollTo({ top: 1000, behavior: 'smooth' });

        }).catch((error) => console.log(error))
    }

    const updateVacancyView = async (accept: any, userProcessId: string) => {
        if(accept){
            await api.put(`userProcess/${userProcessId}`, {
                vacancyAccept: true
            }).then((res) => {
                setVacancysView(vacancysView - 1)
                getViewProcess(viewProcess.id)
            }).catch((error) => console.log(error))
        }else{
            await api.put(`userProcess/${userProcessId}`, {
                vacancyAccept: false
            }).then((res) => {
                setVacancysView(vacancysView + 1)
                getViewProcess(viewProcess.id)
            }).catch((error) => console.log(error))
        }
    }

    const updateScholarView = async (accept: any, userProcessId: string) => {
        if(accept){
            await api.put(`userProcess/${userProcessId}`, {
                scholarAccept: true
            }).then((res) => {
                setScholarShipsView(scholarshipsView - 1)
                getViewProcess(viewProcess.id)
            }).catch((error) => console.log(error))
        }else{
            await api.put(`userProcess/${userProcessId}`, {
                scholarAccept: false
            }).then((res) => {
                setScholarShipsView(scholarshipsView + 1)
                getViewProcess(viewProcess.id)
            }).catch((error) => console.log(error))
        }
    }


    const handleProcessRegister = async () => {
        if(nameProcess == "") {
            setAlertRegister("Preencher nome!")
            return
        }

        if(vacancysProcess == 0) {
            setAlertRegister("Preencher número de vagas!")
            return
        }
        
        if(vacancysProcess < scholarShipsProcess) {
            setAlertRegister("Número de vagas menor que o número de bolsas!")
            return
        }
        
        if(beginDateProcess == "") {
            setAlertRegister("Preencher data inicial!")
            return
        }

        if(endDateProcess == "") {
            setAlertRegister("Preencher data final!")
            return
        }
        

        await api.post('/process', {
            name: nameProcess,
            description: descriptionProcess? descriptionProcess : "",
            status: statusProcess,
            vacancys: vacancysProcess,
            scholarships: scholarShipsProcess,
            beginDate: beginDateProcess,
            endDate: endDateProcess,
            course: dataUser.course,
            creatorId: dataUser.id
        }).then((res) => {

            setAlertRegister("")
            setBeginDateProcess("")
            setDescriptionProcess("")
            setEndDateProcess("")
            setNameProcess("")
            setScholarShipsProcess(0)
            setStatusProcess("")
            setVacancysProcess(0)

            updateUser()

        }).catch((error) => {
            console.log(error)
        })
    }

    const handleEditProcess = async () => {
        if(nameProcess == "") {
            setAlertRegister("Preencher nome!")
            return
        }

        if(vacancysProcess == 0) {
            setAlertRegister("Preencher número de vagas!")
            return
        }
        
        if(vacancysProcess < scholarShipsProcess) {
            setAlertRegister("Número de vagas menor que o número de bolsas!")
            return
        }
        
        if(beginDateProcess == "") {
            setAlertRegister("Preencher data inicial!")
            return
        }

        if(endDateProcess == "") {
            setAlertRegister("Preencher data final!")
            return
        }

        await api.put(`/process/${editProcessId}`, {
            name: nameProcess,
            description: descriptionProcess? descriptionProcess : "",
            status: statusProcess,
            vacancys: vacancysProcess,
            scholarships: scholarShipsProcess,
            beginDate: beginDateProcess,
            endDate: endDateProcess,
            course: dataUser.course,
            creatorId: dataUser.id
        }).then((res) => {

            setAlertRegister("")
            setBeginDateProcess("")
            setDescriptionProcess("")
            setEndDateProcess("")
            setNameProcess("")
            setScholarShipsProcess(0)
            setStatusProcess("")
            setVacancysProcess(0)

            updateUser()

        }).catch((error) => {
            console.log(error)
        })
    }

    const getEdit = (findId: string) => {
        const editProcess = dataUser.createdProcess.find((obj: any) => obj.id == findId)
        setNameProcess(editProcess.name)
        setStatusProcess(editProcess.status)
        setBeginDateProcess(new Date(editProcess.beginDate).toISOString().substr(0, 10))
        setEndDateProcess(new Date(editProcess.endDate).toISOString().substr(0, 10))
        setDescriptionProcess(editProcess.description)
        setVacancysProcess(editProcess.vacancys)
        setScholarShipsProcess(editProcess.scholarships)

        setEditProcessId(findId)
        setIsEditing(true)
    }

    const cleanFields = () => {
        setAlertRegister("")
        setBeginDateProcess("")
        setDescriptionProcess("")
        setEndDateProcess("")
        setNameProcess("")
        setScholarShipsProcess(0)
        setStatusProcess("")
        setVacancysProcess(0)

        setIsEditing(false)
    }

    const updateUser = async () => await api.get(`/user/${user.id}`).then((res) => setDataUser(res.data)).catch((error) => console.log(error))

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
                <div className={styles.dashContainer}>

                    <div className={styles.viewMeProcess}>

                        <h2>Meus Processos</h2>

                        <div className={styles.processList}>

                            {dataUser.createdProcess.map((process: any) => {
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
                                            <button onClick={() => getEdit(process.id)} disabled={new Date()>new Date(process.endDate)? true : false}>Editar</button>
                                            <button onClick={() => getViewProcess(process.id)}>Inscritos</button>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                    <div className={styles.addProcess}>
                        <h2>Gerenciar Processos</h2>

                        <div className={styles.editorProcess}>
                            <div>
                                <h3 className={styles.editorLabel}>Nome</h3>
                                <input type="text" placeholder="Escreva aqui..." onChange={(e) => setNameProcess(e.target.value)} value={nameProcess}/>
                            </div>

                            <div>
                                <h3 className={styles.editorLabel}>Descrição</h3>
                                <input type="text" placeholder="Escreva aqui..." onChange={(e) => setDescriptionProcess(e.target.value)} value={descriptionProcess}/>
                            </div>

                            <div className={styles.editorDataNumbers}>
                                <div>
                                    <h3 className={styles.editorLabel}>Vagas</h3>
                                    <input type="number" placeholder="Escreva aqui..." min={1} onChange={(e) => setVacancysProcess(parseInt(e.target.value))} value={vacancysProcess}/>
                                </div>
                                <div>
                                    <h3 className={styles.editorLabel}>Bolsas</h3>
                                    <input type="number" placeholder="Escreva aqui..." min={0} max={vacancysProcess} onChange={(e) => setScholarShipsProcess(parseInt(e.target.value))} value={scholarShipsProcess}/>
                                </div>
                            </div>

                            <div className={styles.editorDataNumbers}>
                                <div>
                                    <h3 className={styles.editorLabel}>Inicio</h3>
                                    <input type="date" placeholder="Escreva aqui..." min={`${new Date().toISOString().substr(0, 10)}`} max={endDateProcess!=""? `${endDateProcess}` : "2100-04-01"} onChange={(e) => setBeginDateProcess(e.target.value)} value={beginDateProcess}/>
                                </div>
                                {beginDateProcess!="" && 
                                    <div>
                                        <h3 className={styles.editorLabel}>Fim</h3>
                                        <input type="date" placeholder="Escreva aqui..." min={`${beginDateProcess}`} onChange={(e) => setEndDateProcess(e.target.value)} value={endDateProcess}/>
                                    </div>
                                }
                            </div>

                            <div>
                                <h3 className={styles.editorLabel}>Status</h3>
                                <select name="status" onChange={(e) => setStatusProcess(e.target.value)} value={statusProcess}>
                                    <option value="aberto">Aberto</option>
                                    <option value="fechado">Fechado</option>
                                </select>
                            </div>
                            
                            <div className={styles.buttonsBox}>

                                {!isEditing && <button className={styles.registerButton} onClick={() => handleProcessRegister()}>Cadastrar</button>}
                                {isEditing && <button className={styles.editButton} onClick={() => handleEditProcess()}>Editar</button>}
                                <button className={styles.cleanButton} onClick={() => cleanFields()}>limpar</button>

                            </div>
                            <p className={styles.alertRegister}>{alertRegister}</p>
                        </div>
                    </div>
                </div>

            {viewProcess &&
                <div className={styles.viewSubscribeds}>

                    <h2>{viewProcess.name}</h2>

                    <div className={styles.listSubscribeds}>

                        {viewProcess.userProcess.map((userProcess: any) => {
                            return (
                                <div className={styles.subscribedCard} key={userProcess.user.id}>
                                    <div className={styles.fieldSubscribedCard}>
                                        <p>Nome</p>
                                        <p>{userProcess.user.name}</p>
                                    </div>
                                    <div className={styles.fieldSubscribedCard}>
                                        <p>Course</p>
                                        <p>{userProcess.user.course}</p>
                                    </div>
                                    <div className={styles.fieldSubscribedCard}>
                                        <p>Email</p>
                                        <p>{userProcess.user.email}</p>
                                    </div>
                                    <div className={styles.fieldSubscribedCard}>
                                        <p>Historico</p>
                                        <a href={`${userProcess.user.historic}`}><p>Acessar</p></a>
                                    </div>

                                    <div className={styles.fieldSubscribedCard}>
                                        <p>Vaga</p>
                                        <input type="checkBox" disabled={vacancysView==0? true : false} checked={userProcess.vacancyAccept==false? false : true} onChange={(e) => updateVacancyView(e.target.checked, userProcess.id)}/>
                                    </div>

                                    <div className={styles.fieldSubscribedCard}>
                                        <p>bolsa</p>
                                        <input type="checkBox" disabled={scholarshipsView==0 || userProcess.vacancyAccept==false? true : false} checked={userProcess.scholarAccept==false? false : true} onChange={(e) => updateScholarView(e.target.checked, userProcess.id)} />
                                    </div>

                                </div>
                            )
                        })
                    }

                        <div className={styles.Selections}>
                            <h4>Vagas disponíveis: {vacancysView}</h4>
                            <h4>Bolsas disponíveis: {scholarshipsView}</h4>
                        </div>

                    </div>
                </div>
            
            }
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

    if(result.data.role != "coordinator"){
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: { user: result.data }
    }
}