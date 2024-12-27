import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   "process.env.VITE_API_KEY": "import.meta.env.VITE_API_KEY",
  //   "process.env.VITE_AUTH_DOMAIN": "import.meta.env.VITE_AUTH_DOMAIN",
  //   "process.env.VITE_PROJECT_ID": "import.meta.env.VITE_PROJECT_ID",
  //   "process.env.VITE_STORAGEBUCKET": "import.meta.env.VITE_STORAGEBUCKET",
  //   "process.env.VITE_MESSAGING_SENDER_ID": "import.meta.env.VITE_MESSAGING_SENDER_ID",
  //   "process.env.VITE_APP_ID": "import.meta.env.VITE_APP_ID",
  //   "process.env.VITE_MEASUREMENT_ID": "import.meta.env.VITE_MEASUREMENT_ID"
  // },

})
