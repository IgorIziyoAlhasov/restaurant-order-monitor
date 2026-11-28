"use client";
import { useState } from "react";
import { PreferencesControls } from "../../components/preferences-controls";
import { usePreferences } from "../../locales/preferences";

export function Login({ enabled }) {
  const { copy } = usePreferences();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  async function login(id) {
    setPending(true);
    setError(false);
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error();
      window.location.replace("/");
    } catch {
      setError(true);
      setPending(false);
    }
  }
  return (
    <>
      <header className="site-header">
        <strong>{copy.title}</strong>
        <PreferencesControls />
      </header>
      <main>
        <h1>{copy.signIn}</h1>
        <p>{enabled ? copy.demoLogin : copy.unavailable}</p>
        {enabled && (
          <div className="preferences">
            <button disabled={pending} onClick={() => login("manager")}>
              {copy.manager}
            </button>
            <button disabled={pending} onClick={() => login("kitchen")}>
              {copy.kitchen}
            </button>
          </div>
        )}
        {error && <p role="alert">{copy.authError}</p>}
      </main>
    </>
  );
}
