import styles from "./styles/Navbar.module.css"

export default function Navbar() {
    return (
        <div className={styles.navContainer}>
            <div className={styles.logoBox}>
                <img src="/logoReadi.png" alt="Logo da UniReadi" />
                <h3>UniReadi</h3>
            </div>

            <div className={styles.linkPages}>
                <a href="/">Home</a>
                <a href="">login</a>
            </div>
        </div>
    )
}