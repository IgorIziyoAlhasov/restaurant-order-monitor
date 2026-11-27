import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PreferencesProvider } from "../../src/locales/preferences";
import { PreferencesControls } from "../../src/components/preferences-controls";

test("Hebrew preferences render localized labels and selected values", () => {
  render(
    <PreferencesProvider language="he" theme="dark">
      <PreferencesControls />
    </PreferencesProvider>,
  );
  expect(screen.getByLabelText("שפה")).toHaveValue("he");
  expect(screen.getByLabelText("ערכת נושא")).toHaveValue("dark");
});
