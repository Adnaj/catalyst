import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tiny data hook:  const { data, loading, error, reload } = useApi(key, () => fetchSomething());
//  - `key` identifies the request (array/object/string). Same key = same cached result (60 s).
//  - Two components asking for the same key at the same time share ONE request.
//  - { keepPrevious: true } keeps the old data on screen while a new key loads (paging, filters).
//  - { enabled: false } skips the request.
const TTL = 60 * 1000;
const cache = new Map(); // key -> { data, at, promise }

const fresh = (k) => {
  const h = cache.get(k);
  return h && h.data !== undefined && Date.now() - h.at < TTL ? h : null;
};

function load(k, fetcher, force) {
  const hit = cache.get(k);
  if (!force) {
    if (fresh(k)) return Promise.resolve(hit.data);
    if (hit?.promise) return hit.promise;
  }
  const promise = fetcher().then(
    (data) => {
      cache.set(k, { data, at: Date.now() });
      return data;
    },
    (err) => {
      cache.delete(k);
      throw err;
    }
  );
  cache.set(k, { promise, data: hit?.data, at: hit?.at || 0 });
  return promise;
}

export default function useApi(key, fetcher, { keepPrevious = false, enabled = true } = {}) {
  const k = enabled && key != null ? JSON.stringify(key) : null;
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const [tick, setTick] = useState(0);
  const [state, setState] = useState(() => {
    const h = k && fresh(k);
    return { k, data: h ? h.data : null, error: null, loading: !!k && !h };
  });

  useEffect(() => {
    if (!k) {
      setState({ k, data: null, error: null, loading: false });
      return undefined;
    }
    let alive = true;
    const h = tick === 0 ? fresh(k) : null;
    if (h) {
      setState({ k, data: h.data, error: null, loading: false });
      return undefined;
    }
    setState((s) => ({
      k,
      data: keepPrevious || s.k === k ? s.data : null,
      error: null,
      loading: true,
    }));
    load(k, () => fetcherRef.current(), tick > 0).then(
      (data) => alive && setState({ k, data, error: null, loading: false }),
      (error) =>
        alive &&
        setState((s) => ({ k, data: s.k === k ? s.data : null, error, loading: false }))
    );
    return () => {
      alive = false;
    };
  }, [k, tick, keepPrevious]);

  // state belongs to an older key for one render when the key changes:
  // use the cached result straight away if there is one, otherwise show loading
  const hit = k && state.k !== k ? fresh(k) : null;
  const cur =
    state.k === k
      ? state
      : hit
        ? { data: hit.data, error: null, loading: false }
        : { data: keepPrevious ? state.data : null, error: null, loading: !!k };

  // content height changed (ScrollSmoother + ScrollTrigger need to re-measure)
  useEffect(() => {
    if (!cur.data) return undefined;
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [cur.data]);

  return {
    data: cur.data,
    error: cur.error,
    loading: cur.loading,
    reload: () => setTick((t) => t + 1),
  };
}