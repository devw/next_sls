import { useEffect } from 'react'

export default function useScript(sourceUrl: string, callback?: () => void) {
  const script = document.createElement('script')

  useEffect(() => {
    script.src = sourceUrl
    script.async = true

    if (callback) {
      script.onload = callback
    }

    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return { script }
}
