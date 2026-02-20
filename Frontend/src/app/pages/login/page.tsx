"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";
import logoImg from "../../assets/logotype.png";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Identifiants invalides");
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      
      window.location.href = "/pages/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page_full}>
      <div className={styles.login_card}>
        <div className={styles.header_section}>
        <div className={styles.logo_wrapper}>
          <Image 
            src={logoImg} 
            alt="DoCloud Logo" 
            width={60} 
            height={60}
          />
            </div>
          <h1 className={styles.brand_name}>DoCloud</h1>
          <p className={styles.subtitle}>Heureux de vous revoir !</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error_message}>{error}</div>}

          <button 
            type="submit" 
            className={styles.btn_primary}
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className={styles.footer_text}>
          Pas encore de compte ?{" "}
          <Link href="/pages/register" className={styles.link}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
