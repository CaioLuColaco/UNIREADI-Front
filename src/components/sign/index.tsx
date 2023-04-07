import styles from "./styles/Sign.module.css"
import { useEffect, useState } from "react"

export default function Sign(){
    const [overlay, setOverlay] = useState(`${styles.overlayImg}`)

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
                                    <input type="text" placeholder="Escreva aqui..."/>
                                </div>

                                <div>
                                    <h3>Curso</h3>
                                    <input type="text" placeholder="Escreva aqui..."/>
                                </div>

                                <div>
                                    <h3>Cargo</h3>
                                    <input type="password" placeholder="Escreva aqui..."/>
                                </div>

                                <div>
                                    <h3>Email</h3>
                                    <input type="email" placeholder="Escreva aqui..."/>
                                </div>

                                <div>
                                    <h3>Cargo</h3>
                                    <select name="role" id="">
                                        <option value="student">Aluno</option>
                                        <option value="coordinator">Coordenador</option>
                                    </select>
                                </div>



                            <button>Login</button>

                            <p className={styles.desktopVision}>Já está cadastrado? <a onClick={() => setOverlay(`${styles.overlayImg} ${styles.rightAnimate}`)}>Click here</a></p>
                            <p className={styles.phoneVision}>Já está cadastrado? <a onClick={() => setOverlay(`${styles.overlayImg} ${styles.rightAnimate}`)}>Click here</a></p>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}