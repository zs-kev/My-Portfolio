import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Flat config, required by ESLint 9+. Replaces .eslintrc.json.
// eslint-config-next 16 ships flat-config arrays directly, and its
// core-web-vitals entry already includes the base "next" config.
const config = [
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  {
    languageOptions: {
      globals: { React: "readonly" },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        { args: "after-used", argsIgnorePattern: "^_" },
      ],

      // eslint-config-next 16 turns this on as an error. It currently fires
      // in two places, both known and both left as warnings on purpose:
      //
      //   ProviderLoader.tsx - the loader gates all page content on client
      //     state, which is audit blockers B3/B4. Phase 2 rewrites that
      //     component, and the warning should disappear with it.
      //   ThemeToggle.tsx - the mounted flag is next-themes' documented way
      //     of avoiding a hydration mismatch.
      //
      // Downgraded rather than disabled so both stay visible in lint output.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
