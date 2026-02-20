"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Image from "next/image";
import logoImg from "../../assets/logotype.png";
import trashBlack from "../../assets/black_poubelle.png";
import trashRed from "../../assets/red_poubelle.png";
import searchIcon from "../../assets/loupe.png";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.dashboard_container}>
      <header className={styles.topbar}>
        <div className={styles.logo_section}>
          <div className={styles.logo_wrapper}>
            <Image src={logoImg} alt="DoCloud Logo" width={60} height={60} />
          </div>
          <h1 className={styles.logo_text}>DoCloud</h1>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.href = "/"; }} className={styles.logout_btn}>
          Log Out
        </button>
      </header>

      <main className={styles.content}>
        <div className={styles.actions_bar}>
            <div className={styles.search_container}>
                <div className={styles.search_wrapper}>
                    <Image 
                    src={searchIcon} 
                    alt="Search" 
                    width={18} 
                    height={18} 
                    className={styles.search_icon}
                    />
                    <input
                    type="text"
                    placeholder="Rechercher un document..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.search_input}
                    />
                </div>
            </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className={styles.btn_new_doc}
          >
            + Nouveau document
          </button>
        </div>

        <section className={styles.list_section}>
          <h3>Mes Documents ({filteredDocuments.length})</h3>
          <div className={styles.grid}>
            {filteredDocuments.map((doc) => (
            <a key={doc.id} href={doc.file} target="_blank" rel="noreferrer" className={styles.doc_card_link}>
                <div className={styles.doc_card}>
                  <div className={styles.doc_icon_wrapper}>
                    <Image src={logoImg} alt="PDF Icon" width={30} height={30} />  
                  </div>
                  <div className={styles.doc_info}>
                    <p className={styles.doc_title}>{doc.title}</p>
                    <span className={styles.doc_date}>{new Date(doc.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.doc_actions}>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(doc.id); }} 
                      className={styles.btn_delete}
                    >
                        <Image 
                        src={trashBlack} 
                            alt="Supprimer" 
                            className={styles.trash_default}
                            width={24}
                            height={24}
                        />
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* --- MODALE D'UPLOAD --- */}
        {isModalOpen && (
          <div className={styles.modal_overlay} onClick={() => setIsModalOpen(false)}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modal_header}>
                <h2>Uploader un PDF</h2>
                <button className={styles.close_btn} onClick={() => setIsModalOpen(false)}>&times;</button>
              </div>
              <form onSubmit={handleUpload} className={styles.upload_form_vertical}>
                <div className={styles.input_group}>
                  <label>Titre du document</label>
                  <input 
                    type="text" 
                    placeholder="FileName" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input_text}
                  />
                </div>
                <div className={styles.input_group}>
                  <label>Fichier PDF</label>
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className={styles.input_file_custom}
                    required
                  />
                </div>
                <button type="submit" disabled={isLoading} className={styles.btn_submit_upload}>
                  {isLoading ? "Envoi en cours..." : "Enregistrer dans le Cloud"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
