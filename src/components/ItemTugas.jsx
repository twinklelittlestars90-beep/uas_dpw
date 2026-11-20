import { useState } from "react";
import BunnyIcon from "./KelinciIkon";
function formatTanggal(tanggal) { if (!tanggal) return "Tanpa tenggat"; return new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }); }
export default function ItemTugas({ tugas, onUbahStatus, onHapus, onUbahTugas }) {
  const [modeEdit, setModeEdit] = useState(false);
  const [judul, setJudul] = useState(tugas.judul);
  const [deskripsi, setDeskripsi] = useState(tugas.deskripsi || "");
  const hariIni = new Date().toISOString().slice(0, 10);
  const terlambat = !tugas.selesai && tugas.tanggal && tugas.tanggal < hariIni;
  function simpanEdit(e) { e.preventDefault(); if (!judul.trim()) return; onUbahTugas(tugas.id, { judul: judul.trim(), deskripsi }); setModeEdit(false); }
  return <article className={`task-item ${tugas.selesai ? "task-done" : ""}`}>
    <button className={`check-button ${tugas.selesai ? "checked" : ""}`} onClick={() => onUbahStatus(tugas.id)} aria-label={tugas.selesai ? "Tandai belum selesai" : "Tandai selesai"}><BunnyIcon className="task-bunny" /></button>
    <div className="task-content">{modeEdit ? <form className="inline-edit" onSubmit={simpanEdit}><input value={judul} onChange={e => setJudul(e.target.value)} aria-label="Judul tugas" autoFocus /><textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} placeholder="Deskripsi" aria-label="Deskripsi tugas" /><div><button className="mini-action save-action" type="submit">Simpan</button><button className="mini-action" type="button" onClick={() => setModeEdit(false)}>Batal</button></div></form> : <>
      <div className="task-title-row"><h3>{tugas.judul}</h3><span className="category-tag">{tugas.kategori}</span><span className={`priority-tag priority-${(tugas.prioritas || "Sedang").toLowerCase()}`}>{tugas.prioritas || "Sedang"}</span></div>
      {tugas.deskripsi && <p className="task-description">{tugas.deskripsi}</p>}
      <p className={`task-date ${terlambat ? "overdue-text" : ""}`}>◷ {formatTanggal(tugas.tanggal)} {terlambat ? "· Terlambat" : ""}</p>
    </>}</div>
    <div className="task-actions"><button className={`icon-action ${tugas.favorit ? "favorite-active" : ""}`} onClick={() => onUbahTugas(tugas.id, { favorit: !tugas.favorit })} title={tugas.favorit ? "Hapus dari favorit" : "Tandai favorit"} aria-label="Favorit">{tugas.favorit ? "★" : "☆"}</button><button className="icon-action" onClick={() => setModeEdit(v => !v)} title="Edit tugas" aria-label="Edit tugas">✎</button><button className="delete-button" onClick={() => onHapus(tugas.id)} aria-label="Hapus tugas" title="Hapus tugas">×</button></div>
  </article>;
}
