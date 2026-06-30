import { useEffect, useRef, useState } from 'react'

export default function GoogleLoginButton({ onSuccess, onError, text = 'signin_with' }) {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [initError, setInitError] = useState(false)

  useEffect(() => {
    let checkInterval
    let timeoutId

    const initializeGoogleButton = () => {
      if (!window.google?.accounts?.id) return false

      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: (response) => {
            if (response.credential) {
              onSuccess(response.credential)
            } else {
              if (onError) onError('No se recibieron credenciales de Google')
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        })

        // Render the Google button
        if (containerRef.current) {
          window.google.accounts.id.renderButton(containerRef.current, {
            theme: 'filled_blue', // filled_blue matches the RPG login style nicely
            size: 'large',
            text: text, // 'signin_with' | 'signup_with' | 'continue_with'
            shape: 'rectangular',
            logo_alignment: 'left',
            width: containerRef.current.clientWidth || 320,
          })
        }
        setIsLoaded(true)
        return true
      } catch (err) {
        console.error('Error initializing Google Sign-In:', err)
        setInitError(true)
        if (onError) onError('Error al inicializar el inicio de sesión de Google')
        return false
      }
    }

    // Try immediately
    if (initializeGoogleButton()) {
      return
    }

    // Poll if not loaded yet (since index.html loads it async/defer)
    checkInterval = setInterval(() => {
      if (initializeGoogleButton()) {
        clearInterval(checkInterval)
        clearTimeout(timeoutId)
      }
    }, 150)

    // Timeout safety: if it takes more than 6 seconds, show error
    timeoutId = setTimeout(() => {
      clearInterval(checkInterval)
      if (!window.google?.accounts?.id) {
        setInitError(true)
      }
    }, 6000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeoutId)
    }
  }, [onSuccess, onError, text])

  return (
    <div className="w-full flex flex-col items-center justify-center my-2">
      {initError ? (
        <div className="text-xs text-danger/80 bg-danger/10 border border-danger/20 rounded-lg p-2.5 text-center w-full max-w-[320px]">
          No se pudo cargar el inicio de sesión de Google. Por favor, recarga la página.
        </div>
      ) : (
        <div className="w-full max-w-[320px] min-h-[44px] flex items-center justify-center relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 border border-border/40 rounded-lg animate-pulse text-xs text-muted-foreground">
              <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
              Cargando Google...
            </div>
          )}
          <div 
            ref={containerRef} 
            className={`w-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
          />
        </div>
      )}
    </div>
  )
}
