(() => {
  const syncFromParent = () => {
    try {
      const hash = window.parent.location.hash;
      if (hash && hash !== window.location.hash) window.location.hash = hash;
    } catch {}
  };
  window.addEventListener("load", syncFromParent, { once: true });
  window.addEventListener("hashchange", () => {
    try { window.parent.history.replaceState(null, "", window.parent.location.pathname + window.location.hash); } catch {}
  });
})();
