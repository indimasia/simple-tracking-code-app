import { createInertiaApp } from '@inertiajs/react'
import { TolgeeProvider } from '@tolgee/react'
import { createRoot } from 'react-dom/client'
import { tolgee } from './lib/tolgee'

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
    createRoot(el).render(
      <TolgeeProvider tolgee={tolgee} fallback="Loading translations...">
        <App {...props} />
      </TolgeeProvider>
  )
  },
})