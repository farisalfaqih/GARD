import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gard-header': '#1e1b4b',
        'gard-total': '#1e40af',
        'gard-in-review': '#3b82f6',
        'gard-need-revision': '#f59e0b',
        'gard-completed': '#16a34a',
        'gard-sidebar': '#e5e7eb',
        'gard-bg': '#f8fafc',
        'gard-card': '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
