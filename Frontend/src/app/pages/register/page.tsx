"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./register.module.css";
import logoImg from "../../assets/logotype.png";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
    console.log("Ma variable API :", process.env.NEXT_PUBLIC_API_URL);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Gestion des erreurs spécifiques de Django (ex: username déjà pris)
        const errorMsg = data.username ? "Ce nom d'utilisateur est déjà utilisé." : 
                         data.email ? "Cet email est déjà utilisé." : 
                         "Une erreur est survenue lors de l'inscription.";
        throw new Error(errorMsg);
      }

      window.location.href = "/pages/login?registered=true";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page_full}>
      <div className={styles.register_card}>
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
          <p className={styles.subtitle}>Créez votre espace de stockage PDF</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@email.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className={styles.error_message}>{error}</div>}

          <button type="submit" className={styles.btn_primary} disabled={isLoading}>
            {isLoading ? "Création..." : "S'inscrire"}
          </button>
        </form>

        <p className={styles.footer_text}>
          Vous avez déjà un compte ?{" "}
          <Link href="/pages/login" className={styles.link}>Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
}