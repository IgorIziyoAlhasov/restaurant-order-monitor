"use client";

import { OrdersBoard } from "../features/orders/orders-board";
import { PreferencesControls } from "../components/preferences-controls";
import { usePreferences } from "../locales/preferences";

export default function Home() {
  const { copy } = usePreferences();
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
      </header>
      <main id="main-content">
        <div className="location">
          <span>{copy.location}</span>
          <strong>Olive &amp; Ember</strong>
          <span className="demo-tag">{copy.updated}</span>
        </div>
        <OrdersBoard />
      </main>
    </>
  );
}
