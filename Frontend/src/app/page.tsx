"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import logoImg from "./assets/logotype.png";


export default function Home() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    setHasToken(!!token && token !== "undefined");
  }, []);

  return (
    <div className={styles.page_container}>
      <header className={styles.topbar_container}>
        <div className={styles.logo_section}>
          <div className={styles.logo_wrapper}>
            <Image 
              src={logoImg} 
              alt="DoCloud Logo" 
              width={60} 
              height={60}
            />
          </div>
          <h1 className={styles.logo_text}>DoCloud</h1>
        </div>

        <nav className={styles.links_section}>
          {!hasToken ? (
            <>
              <Link href="/pages/login" className={styles.link_secondary}>Connexion</Link>
              <Link href="/pages/register" className={styles.link_primary}>S'inscrire</Link>
            </>
          ) : (
            <Link href="/pages/dashboard" className={styles.link_primary}>
              Aller au Dashboard
            </Link>
          )}
        </nav>
      </header>

      <main className={styles.hero_section}>
        <div className={styles.hero_content}>
          <h1>Gérez vos documents PDF en toute simplicité.</h1>
          <p>
            Une solution légère et sécurisée pour uploader, consulter et organiser 
            vos fichiers PDF en un seul endroit.
          </p>
          <div className={styles.cta_group}>
            <Link href="/pages/register" className={styles.link_primary_large}>Commencer Mainteant</Link>
          </div>
        </div>
        <div className={styles.hero_visual}>
            <div className={styles.mockup_box}>
                <div className={styles.file_item}>PDF_Rapport_2024.pdf</div>
                <div className={styles.file_item}>Contrat_Client_V2.pdf</div>
                <div className={styles.file_item_active}>Facture_Janvier.pdf</div>
            </div>
        </div>
      </main>

      <section id="features" className={styles.features_container}>
        <h2>Conçu pour la productivité</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.card_icon}>🔒</div>
            <h3>Sécurité JWT</h3>
            <p>Vos documents sont protégés par une authentification robuste.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>☁️</div>
            <h3>Accès Cloud</h3>
            <p>Retrouvez vos PDF n'importe où, n'importe quand.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>⚡</div>
            <h3>Rapidité</h3>
            <p>Upload et suppression instantanés pour une gestion fluide.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>© 2026 DoCloud - Projet Fullstack</footer>
    </div>
  );
}
