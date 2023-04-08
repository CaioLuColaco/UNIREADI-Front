import styles from "./styles/Sign.module.css"
import { useEffect, useState } from "react"
import api from "@/services/api"

export default function Sign(){
    const [overlay, setOverlay] = useState(`${styles.overlayImg}`)

    // Register Data
    const [nameRegister, setNameRegister] = useState("")
    const [courseRegister, setCourseRegister] = useState("")
    const [emailRegister, setEmailRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [roleRegister, setRoleRegister] = useState("student")
    const [alertRegister, setAlertRegister] = useState("")

    const handleRegisterSubmit = async () => {
        // Validation
        if(nameRegister == ""){
            setAlertRegister("Preencher nome!")
            return
        }

        if(courseRegister == ""){
            setAlertRegister("Preencher curso!")
            return
        }

        if(!emailRegister.includes("@")){
            setAlertRegister("Preencher com e-mail válido!")
            return
        }

        if(passwordRegister.length < 4){
            setAlertRegister("A senha deve ter mais que 3 caracteres")
            return
        }
        const data = {
            name: nameRegister,
            course: courseRegister,
            email: emailRegister,
            password: passwordRegister,
            role: roleRegister
        }

        await api.post('/auth/registerUser', data).then((res) => {
            if(res.status == 200){
                setAlertRegister("")
                setCourseRegister("")
                setEmailRegister("")
                setPasswordRegister("")
                setNameRegister("")
                setOverlay(`${styles.overlayImg} ${styles.rightAnimate}`)
            }
        }).catch((error) => console.log(error))

    }

    return (
        <>
            <div className={overlay}>
                <img src="/wallR.png" alt="wallpaper" />
            </div>

            <div className={styles.formsContainer}>

                <div className={styles.leftBox}>

                    <div className={styles.signupForm}>
                        <div className={styles.signupHeader}>
                            <h1>Entrar</h1>

                            <p>Escreva as suas informações e aperte o botão para entrar.</p>
                        </div>

                        <div className={styles.signupFields}>
                                <div >
                                    <h3>E-mail</h3>
                                    <input type="text" placeholder="Escreva aqui..."/>
                                </div>
                                <div >
                                    <h3>Senha</h3>
                                    <input type="password" placeholder="Escreva aqui..."/>
                                </div>

                            <button>Entrar</button>

                            <p className={styles.desktopVision}>Ainda não cadastrado? <a onClick={() => setOverlay(`${styles.overlayImg} ${styles.leftAnimate}`)}>Click here</a></p>
                            <p className={styles.phoneVision}>Already have registration? <a onClick={() => setOverlay(`${styles.overlayImg} ${styles.leftAnimate}`)}>Click here</a></p>
                        </div>

                    </div>

                </div>

                <div className={styles.rightBox}>

                    <div className={styles.signupForm}>

                        <div className={styles.signupHeader}>
                            <h1>Cadastro</h1>

                            <p>Escreva as suas informações para se cadastrar.</p>
                        </div>

                        <div className={styles.signupFields}>
                                <div>
                                    <h3>Nome</h3>
                                    <input type="text" placeholder="Escreva aqui..." onChange={(e) => setNameRegister(e.target.value)} value={nameRegister}/>
                                </div>

                                <div>
                                    <h3>Curso</h3>
                                    <input type="text" placeholder="Escreva aqui..." onChange={(e) => setCourseRegister(e.target.value)} value={courseRegister}/>
                                </div>

                                <div>
                                    <h3>Email</h3>
                                    <input type="email" placeholder="Escreva aqui..." onChange={(e) => setEmailRegister(e.target.value)} value={emailRegister}/>
                                </div>

                                <div>
                                    <h3>Senha</h3>
                                    <input type="password" placeholder="Escreva aqui..." onChange={(e) => setPasswordRegister(e.target.value)} value={passwordRegister}/>
                                </div>

                                <div>
                                    <h3>Cargo</h3>
                                    <select name="role" onChange={(e) => setRoleRegister(e.target.value)} value={roleRegister}>
                                        <option value="student">Aluno</option>
                                        <option value="coordinator">Coordenador</option>
                                    </select>
                                </div>

                            <button onClick={() => handleRegisterSubmit()}>Cadastrar</button>

                            <p className={styles.alertRegister}>{alertRegister}</p>

                            <p className={styles.desktopVision}>Já está cadastrado? <a onClick={() => setOverlay(`${styles.overlayImg} ${styles.rightAnimate}`)}>Click here</a></p>
                            <p className={styles.phoneVision}>Já está cadastrado? <a onClick={() => setOverlay(`${styles.overlayImg} ${styles.rightAnimate}`)}>Click here</a></p>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}