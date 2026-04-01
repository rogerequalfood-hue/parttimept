"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const KEY = "parttimept:favs:v1";

export function useFavorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  const persist = (next) => {
    setItems(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const isFav = useCallback((id) => items.some((x) => x.id === id), [items]);

  const toggle = useCallback((job) => {
    const exists = items.some((x) => x.id === job.id);
    const next = exists ? items.filter((x) => x.id !== job.id) : [job, ...items].slice(0, 200);
    persist(next);
  }, [items]);

  return { items, isFav, toggle };
}
