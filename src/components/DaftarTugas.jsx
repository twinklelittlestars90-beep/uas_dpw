import ItemTugas from "./ItemTugas";
export default function DaftarTugas({ daftarTugas, onUbahStatus, onHapus, onUbahTugas, pesanKosong = "Belum ada tugas." }) {
  if (!daftarTugas.length) return <div className="empty-state"><span className="empty-icon">☷</span><h3>{pesanKosong}</h3><p>Tugas yang kamu tambahkan akan muncul di sini.</p></div>;
  return <div className="task-list">{daftarTugas.map(t => <ItemTugas key={t.id} tugas={t} onUbahStatus={onUbahStatus} onHapus={onHapus} onUbahTugas={onUbahTugas} />)}</div>;
}
