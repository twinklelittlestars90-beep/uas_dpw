import { dataKartu } from "../data/koleksi";

export default function Koleksi({ kartuDimiliki = [] }) {
  const dimiliki = new Set(kartuDimiliki);
  const jumlah = dataKartu.filter(k => dimiliki.has(k.id)).length;

  return <div className="page collection-page">
    <section className="page-header">
      <h1>Koleksi Kartu</h1>
    </section>
    <section className="collection-summary content-panel">
      <div className="collection-summary-icon">🎁</div>
      <div className="collection-summary-copy">
        <h2>{jumlah} / {dataKartu.length}</h2>
        <div className="collection-progress"><span style={{ width: `${jumlah / dataKartu.length * 100}%` }} /></div>
      </div>
    </section>
    <div className="collection-grid">
      {dataKartu.map(kartu => {
        const terbuka = dimiliki.has(kartu.id);
        return <article key={kartu.id} className={`collectible-card image-only-card ${terbuka ? `rarity-${kartu.rarity.toLowerCase()}` : "card-locked"}`}>
          {terbuka
            ? <img className="collection-sticker" src={kartu.gambar} alt={`Kartu ${kartu.id}`} />
            : <div className="collection-locked">?</div>}
        </article>;
      })}
    </div>
  </div>;
}
