import { createContext, useState } from 'react'

export const DesignPopupContext = createContext({
  showDesignPopup: false
})

export const DesignPopupProvider = ({ children }) => {
  const [showDesignPopup, setShowDesignPopup] = useState(false)

  return (
    <DesignPopupContext.Provider value={{
      showDesignPopup,
      setShowDesignPopup
    }}>
      {children}
    </DesignPopupContext.Provider>
  )
}
