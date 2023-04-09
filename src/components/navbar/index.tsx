import Link from "next/link"
import styles from "./styles/Navbar.module.css"

export default function Navbar() {
    return (
        <div className={styles.navContainer}>
            <div className={styles.logoBox}>
                <img src="/logoReadi.png" alt="Logo da UniReadi" />
                <h3>UniReadi</h3>
            </div>

            <div className={styles.linkPages}>
                <Link href="/" className={styles.links}>Home</Link>
                <Link href="/login" className={styles.links}>login</Link>
            </div>
        </div>
    )
}