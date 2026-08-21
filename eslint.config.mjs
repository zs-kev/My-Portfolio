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

      // eslint-config-next 16 turns this on as an error. It now fires in
      // exactly one place: ThemeToggle's mounted flag, which is next-themes'
      // documented way of avoiding a hydration mismatch. Downgraded rather
      // than disabled so it stays visible if it starts firing elsewhere.
      //
      // ProviderLoader used to trip it too; that was audit blockers B3/B4 and
      // is now resolved — it reads its client-only state through
      // useSyncExternalStore instead of setState in an effect.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
