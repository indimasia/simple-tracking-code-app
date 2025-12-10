import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

const pages = import.meta.glob('./Pages/**/*.tsx')

createInertiaApp({
  resolve: name => {
    const page = pages[`./Pages/${name}.tsx`]
    if (!page) {
      console.error(`Page not found: ${name}`)
    }
    return page()
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})