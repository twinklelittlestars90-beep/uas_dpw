import { useState } from "react";
const kondisiAwal = { judul: "", deskripsi: "", kategori: "Kuliah", tanggal: "", prioritas: "Sedang" };
export default function FormTugas({ onTambah }) {
  const [form, setForm] = useState(kondisiAwal);
  function handleChange(event) { const { name, value } = event.target; setForm(prev => ({ ...prev, [name]: value })); }
  function handleSubmit(event) { event.preventDefault(); if (!form.judul.trim()) return; onTambah({ ...form, judul: form.judul.trim() }); setForm(kondisiAwal); }
  return <form className="task-form" onSubmit={handleSubmit}>
    <div className="form-heading"><div><h2>Tambah tugas baru</h2><p>Catat hal yang ingin kamu selesaikan.</p></div><span className="form-plus">＋</span></div>
    <label htmlFor="judul">Nama tugas <span>*</span></label><input id="judul" name="judul" value={form.judul} onChange={handleChange} placeholder="Contoh: Mengerjakan laporan praktikum" required maxLength="90" />
    <label htmlFor="deskripsi">Deskripsi</label><textarea id="deskripsi" name="deskripsi" value={form.deskripsi} onChange={handleChange} placeholder="Tambahkan catatan (opsional)" rows="3" maxLength="300" />
    <div className="form-row"><div><label htmlFor="kategori">Kategori</label><select id="kategori" name="kategori" value={form.kategori} onChange={handleChange}><option>Kuliah</option><option>Belajar</option><option>Pribadi</option><option>Pekerjaan</option><option>Lainnya</option></select></div><div><label htmlFor="tanggal">Tenggat</label><input id="tanggal" name="tanggal" type="date" value={form.tanggal} onChange={handleChange} /></div></div>
    <label htmlFor="prioritas">Prioritas</label><select id="prioritas" name="prioritas" value={form.prioritas} onChange={handleChange}><option>Rendah</option><option>Sedang</option><option>Tinggi</option></select>
    <button className="button button-primary form-submit" type="submit">＋ Tambahkan tugas</button>
  </form>;
}
