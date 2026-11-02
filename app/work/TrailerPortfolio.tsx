"use client";

import { useEffect, useRef, useState } from "react";
import films from "./trailers.json";

type Film = (typeof films)[number];
const playableCount = films.filter((film) => film.videoId).length;

export default function TrailerPortfolio() {
  const [query, setQuery] = useState("");
  const [playableOnly, setPlayableOnly] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Film | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const search = query.trim().toLocaleLowerCase();
  const matching = films.filter((film) =>
    (!playableOnly || film.videoId) &&
    `${film.title} ${film.titleKo} ${film.year}`.toLocaleLowerCase().includes(search),
  );
  const visible = expanded || search || playableOnly ? matching : matching.slice(0, 6);

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal?.showModal();
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section className="studio-work studio-shell" id="work" aria-labelledby="work-heading">
      <div className="studio-section-heading">
        <h2 id="work-heading">TRAILERS</h2>
        <span>{films.length} FILMS · CUTTRU PORTFOLIO</span>
      </div>
      <p className="studio-work-intro">Stories shaped for the big screen. Explore the films and watch the trailers.</p>

      <div className="studio-work-toolbar">
        <div className="studio-work-filters" aria-label="Filter portfolio">
          <button type="button" aria-pressed={!playableOnly} onClick={() => setPlayableOnly(false)}>ALL FILMS <span>{films.length}</span></button>
          <button type="button" aria-pressed={playableOnly} onClick={() => setPlayableOnly(true)}>WATCH TRAILERS <span>{playableCount}</span></button>
        </div>
        <label className="studio-work-search">
          <span className="studio-visually-hidden">Search films by title or year</span>
          <input type="search" placeholder="Search films / 작품 검색" value={query} onChange={(event) => setQuery(event.target.value)} />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>

      <p className="studio-work-count" role="status">{search || playableOnly ? `${matching.length} ${matching.length === 1 ? "film" : "films"}` : `${visible.length} of ${films.length} films`}</p>
      <div className="studio-work-grid" id="trailer-grid">
        {visible.map((film) => {
          const poster = <>
            <img src={film.poster} alt={`${film.titleKo} — ${film.title} film poster`} width={720} height={1030} loading="lazy" decoding="async" />
            <span className={`studio-poster-view${film.videoId ? "" : " studio-poster-credit"}`}>
              {film.videoId ? "WATCH TRAILER" : "FILM PORTFOLIO"}
              {film.videoId && <span aria-hidden="true">▶</span>}
            </span>
          </>;
          return (
            <article className="studio-work-card" key={film.id}>
              {film.videoId ? (
                <button className="studio-work-poster" type="button" aria-label={`Watch ${film.title} trailer`} aria-haspopup="dialog" onClick={(event) => { opener.current = event.currentTarget; setSelected(film); }}>
                  {poster}
                </button>
              ) : <div className="studio-work-poster">{poster}</div>}
              <div className="studio-work-caption">
                <h3>{film.title}<span lang="ko">{film.titleKo}</span></h3>
                <p>{film.year} · TRAILER EDITING</p>
              </div>
            </article>
          );
        })}
      </div>
      {matching.length === 0 && <div className="studio-work-empty"><p>No films found. Try another title or year.</p><button type="button" className="studio-text-link" onClick={() => { setQuery(""); setPlayableOnly(false); }}>RESET SEARCH <span aria-hidden="true">↗</span></button></div>}
      {!expanded && !search && !playableOnly && <div className="studio-work-more"><button type="button" className="studio-button studio-button-outline" aria-controls="trailer-grid" aria-expanded={expanded} onClick={() => setExpanded(true)}>VIEW ALL {films.length} FILMS <span aria-hidden="true">↓</span></button></div>}
      <p className="studio-disclaimer">Film posters identify the productions. Videos are available on cards marked WATCH TRAILER.</p>

      <dialog ref={dialog} className="studio-trailer-dialog" aria-labelledby="trailer-title" onClose={() => setSelected(null)} onCancel={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        {selected && <div className="studio-trailer-panel">
          <div className="studio-trailer-heading">
            <div><p className="studio-overline">CUTTRU / TRAILER EDITING</p><h2 id="trailer-title">{selected.title}</h2><p className="studio-trailer-meta"><span lang="ko">{selected.titleKo}</span> · {selected.year}</p></div>
            <button type="button" className="studio-trailer-close" aria-label="Close trailer" onClick={() => setSelected(null)}>×</button>
          </div>
          <div className="studio-trailer-player">
            <iframe key={selected.videoId} src={`https://www.youtube-nocookie.com/embed/${selected.videoId}?autoplay=1&rel=0&playsinline=1`} title={`${selected.title} — official trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <div className="studio-trailer-footer"><span>TRAILER PORTFOLIO</span><a className="studio-text-link" href={`https://www.youtube.com/watch?v=${selected.videoId}`} target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE <span aria-hidden="true">↗</span></a></div>
        </div>}
      </dialog>
    </section>
  );
}
