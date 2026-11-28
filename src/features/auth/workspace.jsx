"use client";
import { useState } from "react";
import { OrdersBoard } from "../orders/orders-board";
import { PreferencesControls } from "../../components/preferences-controls";
import { usePreferences } from "../../locales/preferences";
import { locations } from "./policy";

export function Workspace({ staff }) {
  const { copy } = usePreferences();
  const [location, setLocation] = useState(staff.locations[0]);
  const [error, setError] = useState(false);
  async function logout() {
    try {
      const response = await fetch("/api/session", { method: "DELETE" });
      if (!response.ok) throw new Error();
      window.location.replace("/sign-in");
    } catch {
      setError(true);
    }
  }
  return (
    <>
      <a className="skip" href="#main-content">
        {copy.skip}
      </a>
      <header className="site-header">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">
            R
          </span>
          <div>
            <strong>{copy.title}</strong>
            <span>{copy.demo}</span>
          </div>
        </div>
        <PreferencesControls />
        <div>
          <span>
            {staff.name} · {copy[staff.role]}
          </span>{" "}
          <button onClick={logout}>{copy.signOut}</button>
          {error && <p role="alert">{copy.authError}</p>}
        </div>
      </header>
      <main id="main-content">
        <div className="location">
          <label>
            {copy.location}{" "}
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {locations
                .filter((item) => staff.locations.includes(item.id))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
          <span className="demo-tag">{copy.updated}</span>
        </div>
        <OrdersBoard key={location} location={location} />
      </main>
    </>
  );
}
