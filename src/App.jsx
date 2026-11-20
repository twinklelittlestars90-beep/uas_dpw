import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Tugas from "./pages/Tugas";
import Tentang from "./pages/Tentang";
import NotFound from "./pages/NotFound";
import Koleksi from "./pages/Koleksi";
import { dataKartu } from "./data/koleksi";
import { dataAwalTugas } from "./data/data";

function muatTugas() {
  try { const tersimpan = localStorage.getItem("vivirabbit-tugas"); return tersimpan ? JSON.parse(tersimpan) : dataAwalTugas; }
  catch { return dataAwalTugas; }
}
function muatKoleksi() {
  try { const tersimpan = JSON.parse(localStorage.getItem("vivirabbit-koleksi") || "[]"); return Array.isArray(tersimpan) ? tersimpan : []; }
  catch { return []; }
}
export default function App() {
  const [daftarTugas, setDaftarTugas] = useState(muatTugas);
  const [kartuDimiliki, setKartuDimiliki] = useState(muatKoleksi);
  const [hadiahBaru, setHadiahBaru] = useState(null);
  useEffect(() => { localStorage.setItem("vivirabbit-tugas", JSON.stringify(daftarTugas)); }, [daftarTugas]);
  useEffect(() => { localStorage.setItem("vivirabbit-koleksi", JSON.stringify(kartuDimiliki)); }, [kartuDimiliki]);
  const statistik = useMemo(() => {
    const selesai = daftarTugas.filter(t => t.selesai).length;
    const hariIni = new Date().toISOString().slice(0, 10);
    const terlambat = daftarTugas.filter(t => !t.selesai && t.tanggal && t.tanggal < hariIni).length;
    return { total: daftarTugas.length, selesai, belumSelesai: daftarTugas.length - selesai, terlambat, persentase: daftarTugas.length ? Math.round(selesai / daftarTugas.length * 100) : 0 };
  }, [daftarTugas]);
  function tambahTugas(dataBaru) { setDaftarTugas(prev => [{ ...dataBaru, id: Date.now(), selesai: false, favorit: false, dibuat: new Date().toISOString() }, ...prev]); }
  function ubahStatus(id) {
    const target = daftarTugas.find(t => t.id === id);
    if (!target) return;
    if (!target.selesai) {
      const tersedia = dataKartu.filter(k => !kartuDimiliki.includes(k.id));
      if (tersedia.length) {
        // Kartu umum lebih sering muncul; kartu langka tetap bisa didapat sejak awal.
        const bobot = { Common: 6, Uncommon: 4, Rare: 2, Epic: 1, Legendary: 0.5 };
        const kandidat = tersedia.flatMap(k => Array(Math.max(1, Math.round(bobot[k.rarity] * 2))).fill(k));
        const hadiah = kandidat[Math.floor(Math.random() * kandidat.length)];
        setKartuDimiliki(prev => [...prev, hadiah.id]);
        setHadiahBaru(hadiah);
      } else {
        setHadiahBaru({ penuh: true });
      }
    }
    setDaftarTugas(prev => prev.map(t => t.id === id ? { ...t, selesai: !t.selesai, selesaiPada: !t.selesai ? new Date().toISOString() : null } : t));
  }
  function hapusTugas(id) { setDaftarTugas(prev => prev.filter(t => t.id !== id)); }
  function ubahTugas(id, perubahan) { setDaftarTugas(prev => prev.map(t => t.id === id ? { ...t, ...perubahan } : t)); }
  function hapusSelesai() { setDaftarTugas(prev => prev.filter(t => !t.selesai)); }
  function eksporData() {
    const blob = new Blob([JSON.stringify(daftarTugas, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "vivirabbit-backup.json"; a.click(); URL.revokeObjectURL(url);
  }
  function imporData(event) {
    const file = event.target.files?.[0]; if (!file) return;
    const reader = new FileReader(); reader.onload = () => { try { const data = JSON.parse(reader.result); if (Array.isArray(data) && data.every(t => t.judul && t.id !== undefined)) { setDaftarTugas(data); alert("Data berhasil dipulihkan!"); } else alert("Format file tidak sesuai."); } catch { alert("File JSON tidak valid."); } };
    reader.readAsText(file); event.target.value = "";
  }
  return <div className="app-shell"><Header /><main className="main-container"><Routes>
    <Route path="/" element={<Dashboard daftarTugas={daftarTugas} statistik={statistik} onUbahStatus={ubahStatus} onHapus={hapusTugas} onUbahTugas={ubahTugas} />} />
    <Route path="/tugas" element={<Tugas daftarTugas={daftarTugas} onTambah={tambahTugas} onUbahStatus={ubahStatus} onHapus={hapusTugas} onUbahTugas={ubahTugas} onHapusSelesai={hapusSelesai} onEkspor={eksporData} onImpor={imporData} />} />
    <Route path="/koleksi" element={<Koleksi kartuDimiliki={kartuDimiliki} />} /><Route path="/tentang" element={<Tentang />} /><Route path="/404" element={<NotFound />} /><Route path="*" element={<Navigate to="/404" replace />} />
  </Routes></main><Footer />
    {hadiahBaru && <div className="reward-overlay" role="dialog" aria-modal="true" aria-label="Hadiah kartu baru" onClick={() => setHadiahBaru(null)}>
      <div className="reward-modal" onClick={e => e.stopPropagation()}>
        <button className="reward-close" onClick={() => setHadiahBaru(null)} aria-label="Tutup">×</button>
        {hadiahBaru.penuh ? <div className="reward-complete">🏆</div> : <img className="reward-sticker-only" src={hadiahBaru.gambar} alt="Kartu hadiah" />}
        <button className="reward-button" onClick={() => setHadiahBaru(null)}>Tutup</button>
      </div>
    </div>}
  </div>;
}
