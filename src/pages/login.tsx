import Head from 'next/head'
import styles from '@/styles/Login.module.css'
import Sign from '@/components/sign'

export default function Login() {
    return (
        <>
            <Head>
                <title>UniReadi - Login</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>

                <Sign/>

            </main>
        </>
    )
}