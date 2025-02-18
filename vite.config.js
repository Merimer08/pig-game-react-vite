import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/pig-game-react-vite/', // Asegúrate de que esto coincida con el nombre de tu repositorio
  plugins: [react()],
})
