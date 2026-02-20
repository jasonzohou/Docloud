"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Image from "next/image";
import logoImg from "../../assets/logotype.png";


interface PDFDocument {
  id: number;
  file: string;
  title: string;
  created_at: string;
}

export default function Dashboard() {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocuments = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch (err) {
      console.error("Erreur chargement documents", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const token = localStorage.getItem("access");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setTitle("");
        setFile(null);
        fetchDocuments();
      }
    } catch (err) {
      alert("Erreur lors de l'upload");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce document ?")) return;
    const token = localStorage.getItem("access");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchDocuments();
  };

  return (
    <div className={styles.dashboard_container}>
      <header className={styles.topbar}>
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
        <button onClick={() => { localStorage.clear(); window.location.href = "/"; }} className={styles.logout_btn}>
          Log Out
        </button>
      </header>

      <main className={styles.content}>
        <section className={styles.upload_box}>
          <h2>Uploader un nouveau PDF</h2>
          <form onSubmit={handleUpload} className={styles.upload_form}>
            <input 
              type="text" 
              placeholder="Titre du document" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input_text}
            />
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className={styles.input_file}
            />
            <button type="submit" disabled={isLoading} className={styles.btn_upload}>
              {isLoading ? "Envoi..." : "Ajouter au Cloud"}
            </button>
          </form>
        </section>

        <section className={styles.list_section}>
          <h3>Mes Documents ({documents.length})</h3>
          <div className={styles.grid}>
            {documents.map((doc) => (
              <div key={doc.id} className={styles.doc_card}>
                <div className={styles.logo_wrapper}>
                    <Image 
                    src={logoImg} 
                    alt="DoCloud Logo" 
                    width={30} 
                    height={30}
                    />  
                </div>
                <div className={styles.doc_info}>
                  <p className={styles.doc_title}>{doc.title}</p>
                  <span className={styles.doc_date}>{new Date(doc.created_at).toLocaleDateString()}</span>
                </div>
                <div className={styles.doc_actions}>
                  <a href={doc.file} target="_blank" rel="noreferrer" className={styles.btn_view}>Ouvrir</a>
                  <button onClick={() => handleDelete(doc.id)} className={styles.btn_delete}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
