import { useMemo, useState } from "react";
import FormTugas from "../components/FormTugas";
import DaftarTugas from "../components/DaftarTugas";
export default function Tugas({ daftarTugas, onTambah, onUbahStatus, onHapus, onUbahTugas, onHapusSelesai, onEkspor, onImpor }) {
  const [filter, setFilter] = useState("Semua"); const [cari, setCari] = useState(""); const [urut, setUrut] = useState("Terbaru");
  const tugasTersaring = useMemo(() => {
    let hasil = daftarTugas.filter(t => {
      if (filter === "Belum selesai" && t.selesai) return false;
      if (filter === "Selesai" && !t.selesai) return false;
      if (filter === "Favorit" && !t.favorit) return false;
      if (filter === "Terlambat" && (t.selesai || !t.tanggal || t.tanggal >= new Date().toISOString().slice(0,10))) return false;
      return `${t.judul} ${t.deskripsi || ""} ${t.kategori}`.toLowerCase().includes(cari.toLowerCase());
    });
    return hasil.sort((a,b) => {
      if (urut === "Prioritas") return ({Tinggi:0,Sedang:1,Rendah:2}[a.prioritas || "Sedang"] - ({Tinggi:0,Sedang:1,Rendah:2}[b.prioritas || "Sedang"]));
      if (urut === "Tenggat") return (a.tanggal || "9999").localeCompare(b.tanggal || "9999");
      if (urut === "A-Z") return a.judul.localeCompare(b.judul);
      return (b.id || 0) - (a.id || 0);
    });
  }, [daftarTugas, filter, cari, urut]);
  return <div className="page"><section className="page-header"><p className="eyebrow">PENGELOLAAN</p><h1>Daftar Tugas</h1><p className="page-subtitle">Semua rencana dan pekerjaanmu ada di satu tempat.</p></section>
    <div className="tasks-layout"><section className="content-panel tasks-panel"><div className="section-heading filter-heading"><div><h2>Semua aktivitas</h2><p>{tugasTersaring.length} dari {daftarTugas.length} tugas ditampilkan</p></div><select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter tugas"><option>Semua</option><option>Belum selesai</option><option>Selesai</option><option>Favorit</option><option>Terlambat</option></select></div>
      <div className="task-toolbar"><input className="task-search" value={cari} onChange={e => setCari(e.target.value)} placeholder="⌕ Cari judul, deskripsi, kategori..." aria-label="Cari tugas" /><select className="filter-select" value={urut} onChange={e => setUrut(e.target.value)} aria-label="Urutkan tugas"><option>Terbaru</option><option>Prioritas</option><option>Tenggat</option><option>A-Z</option></select></div>
      <DaftarTugas daftarTugas={tugasTersaring} onUbahStatus={onUbahStatus} onHapus={onHapus} onUbahTugas={onUbahTugas} pesanKosong="Tidak ada tugas yang cocok." />
      <div className="list-footer"><button className="mini-action" onClick={onHapusSelesai}>Bersihkan tugas selesai</button><span>{daftarTugas.filter(t => t.selesai).length} selesai</span></div>
      <div className="backup-tools"><button className="mini-action" onClick={onEkspor}>↓ Ekspor cadangan</button><label className="mini-action import-label">↑ Impor cadangan<input type="file" accept="application/json,.json" onChange={onImpor} /></label></div>
    </section><aside><FormTugas onTambah={onTambah} /></aside></div>
  </div>;
}
