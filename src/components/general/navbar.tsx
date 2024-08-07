'use client'
import Icon from "./icon";
import Logo from "./logo";
import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/general/navbar.module.css"
import { Libre_Franklin } from "next/font/google";

export default function Navbar(){
    //The menu state is used to control if the side-nav is open or closed
    const [menu, setMenu] = useState<boolean>(false);

    const handleMenu = () => {
        setMenu(!menu);
    }

    const closeSidenav = () => {
        setMenu(false)
    }

    return(
        <nav className={styles.nav}>
            <button title="menu" className={styles.menuIcon} onClick={handleMenu}>
                <Icon /> 
            </button>
            {/* <Link className={styles.link} href="/">
                <Logo />
                <div className={styles.highlight}></div>
            </Link> */}

            <p className={styles.link} onClick={handleMenu}>
                <Logo />
                {/* <div className={styles.highlight}></div> */}
            </p>

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
                    <p className={styles.link} onClick={handleMenu}>
                        <Logo/>
                    </p>
                </header>

                <section className={styles.sidelinkContainer}>
                    <h3>Driver </h3>
                    <Link onClick={closeSidenav} className={styles.sidelink} href="/dashboard/driver">
                        <p>Create Route</p>
                        <div className={styles.highlight}></div>
                    </Link>

                    <Link onClick={closeSidenav} className={styles.sidelink} href="/dashboard/driver/routes">
                        <p>View Route</p>
                        <div className={styles.highlight}></div>
                    </Link>

                    <h3>Passenger </h3>
                    <Link onClick={closeSidenav} className={styles.sidelink} href="/dashboard/rider">
                        <p>Book ride</p>
                        <div className={styles.highlight}></div>
                    </Link>
                </section>

                <div className={`${styles.darknav} ${menu && styles.reveal}`}></div>
            </div>
        </nav>
    )
}