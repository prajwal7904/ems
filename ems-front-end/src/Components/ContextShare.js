import React, { createContext,useState } from 'react'
export const registerContext = createContext();
export const deleteContext=createContext();
function ContextShare({children}) {
    const [registerData,setregisterData]=useState("")
    const [deleteData,setdeleteData]=useState("")
  return (
    <>
        <registerContext.Provider value={{registerData,setregisterData}}>
          <deleteContext.Provider value={{deleteData,setdeleteData}}>
            {children}

          </deleteContext.Provider>
        
        </registerContext.Provider>
    </>
  )
}

export default ContextShare