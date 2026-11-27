"use client";

import { usePreferences } from "../locales/preferences";

export function PreferencesControls() {
  const { language, theme, copy, change } = usePreferences();
  return (
    <div className="preferences">
      <label>
        {copy.language}
        <select
          value={language}
          onChange={(event) => change("language", event.target.value)}
        >
          <option value="en">English</option>
          <option value="he">עברית</option>
          <option value="ru">Русский</option>
        </select>
      </label>
      <label>
        {copy.theme}
        <select
          value={theme}
          onChange={(event) => change("theme", event.target.value)}
        >
          <option value="light">{copy.light}</option>
          <option value="dark">{copy.dark}</option>
        </select>
      </label>
    </div>
  );
}
