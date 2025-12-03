import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

type Viewport = 'mobile' | 'tablet' | 'desktop'

interface ViewportContextType {
  viewport: Viewport
}

const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined
)

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const getViewportFromWidth = (width: number): Viewport => {
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  const [viewport, setViewport] = useState<Viewport | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const apply = () => setViewport(getViewportFromWidth(window.innerWidth))

    apply()

    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  if (!viewport) return null

  return (
    <ViewportContext.Provider value={{ viewport }}>
      {children}
    </ViewportContext.Provider>
  )
}

export const useViewport = () => {
  const context = useContext(ViewportContext)
  if (!context)
    throw new Error('useViewport must be used within a ViewportProvider')
  return context
}
