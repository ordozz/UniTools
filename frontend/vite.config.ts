import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import monacoPlugin from 'vite-plugin-monaco-editor'

const monacoEditorPlugin = (monacoPlugin as any).default || monacoPlugin;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({
      languageWorkers: ['json', 'editorWorkerService']
    })
  ],
})
