'use client'
import Icon from "./icon";
import Logo from "./logo";
import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/general/navbar.module.css"

export default function Navbar(){
    //The menu state is used to control if the side-nav is open or closed
    const [menu, setMenu] = useState<boolean>(false);

    const handleMenu = () => {
        setMenu(!menu);
    }

    return(
        <nav className={styles.nav}>
            <button title="menu" className={styles.menuIcon} onClick={handleMenu}>
                <Icon /> 
            </button>
            <Link className={styles.link} href="/">
                <Logo />
                <div className={styles.highlight}></div>
            </Link>

            <div className={styles.menu}>
                <Link className={styles.link} href="/signup">
                    <p>Sign Up</p>
                    <div className={styles.highlight}></div>
                </Link>

                <Link className={styles.link} href="/">
                    <p>Login</p>
                    <div className={styles.highlight}></div>
                </Link>
            </div>

            <div className={`${styles.sidenav} ${menu && styles.open}`}>
                <header>
                    <button title="menu" className={styles.menuIcon} onClick={handleMenu}>
                        <Icon /> 
                    </button>
                    <Link className={styles.link} href="/">
                        <Logo/>
                        <div className={styles.highlight}></div>
                    </Link>
                </header>

                <section className={styles.sidelinkContainer}>
                    <h3>Driver </h3>
                    <Link className={styles.sidelink} href="/">
                        <p>Dashboard</p>
                        <div className={styles.highlight}></div>
                    </Link>

                    <h3>Passenger </h3>
                    <Link className={styles.sidelink} href="/">
                        <p>Dashboard</p>
                        <div className={styles.highlight}></div>
                    </Link>
                </section>
            </div>
        </nav>
    )
}