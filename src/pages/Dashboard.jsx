import { Link } from "react-router-dom";
import KartuStatistik from "../components/KartuStatistik";
import DaftarTugas from "../components/DaftarTugas";
import BunnyIcon from "../components/KelinciIkon";
export default function Dashboard({ daftarTugas, statistik, onUbahStatus, onHapus, onUbahTugas }) {
  const prioritas = [...daftarTugas].filter(t => !t.selesai).sort((a,b) => ({Tinggi:0,Sedang:1,Rendah:2}[a.prioritas || "Sedang"] - ({Tinggi:0,Sedang:1,Rendah:2}[b.prioritas || "Sedang"])));
  return <div className="page">
    <section className="welcome-section"><div><p className="eyebrow">TO-DO LIST</p><h1>Halo, selamat datang thump! <BunnyIcon className="task-bunny" /></h1><p className="page-subtitle">Atur prioritasmu dan selesaikan satu per satu.</p></div><Link to="/tugas" className="button button-primary">＋ Buat tugas</Link></section>
    <section className="stats-grid"><KartuStatistik label="Total tugas" nilai={statistik.total} keterangan="Semua tugasmu" simbol="📑" warna="purple" /><KartuStatistik label="Belum selesai" nilai={statistik.belumSelesai} keterangan="Masih perlu dikerjakan" simbol="◷" warna="orange" /><KartuStatistik label="Selesai" nilai={statistik.selesai} keterangan="Berhasil diselesaikan" simbol="✓" warna="green" /></section>
    <section className="content-panel progress-panel"><div className="progress-top"><div><h2>Progres produktivitasmu</h2><p>Pelan-pelan, yang penting terus berjalan!</p></div><strong>{statistik.persentase}%</strong></div><div className="progress-track"><span style={{width:`${statistik.persentase}%`}} /></div><div className="progress-foot"><span>{statistik.selesai} dari {statistik.total} tugas selesai</span><span>{statistik.terlambat ? `⚠ ${statistik.terlambat} terlambat` : "✨ Tidak ada tugas terlambat"}</span></div></section>
    <section className="content-panel dashboard-list"><div className="section-heading"><div><h2>⭐ Fokus berikutnya</h2><p>Tugas aktif dengan prioritas tertinggi.</p></div><Link to="/tugas" className="text-link">Lihat semua →</Link></div><DaftarTugas daftarTugas={prioritas.slice(0,3)} onUbahStatus={onUbahStatus} onHapus={onHapus} onUbahTugas={onUbahTugas} pesanKosong="Semua tugas sudah selesai. Hebat!" /></section>
    <section className="content-panel"><div className="section-heading"><div><h2>Tugas terbaru</h2><p>Aktivitas yang baru kamu catat.</p></div><Link to="/tugas" className="text-link">Lihat semua →</Link></div><DaftarTugas daftarTugas={[...daftarTugas].slice(0,4)} onUbahStatus={onUbahStatus} onHapus={onHapus} onUbahTugas={onUbahTugas} pesanKosong="Belum ada tugas. Yuk, buat tugas pertamamu!" /></section>
  </div>;
}
