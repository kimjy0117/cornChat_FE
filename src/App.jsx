import React from "react"
import { Router } from "./router/Router"
import { ChatProvider } from "./utils/contextApi/ChatContext"
import { UserProvider } from "./utils/contextApi/UserContext"

function App() {
  return (
    <>
        <UserProvider>
          <ChatProvider>
            <Router/>
          </ChatProvider>
        </UserProvider>
    </>
  )
}

export default App
