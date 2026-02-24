import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import { getRedirectResult } from 'firebase/auth'
import { auth } from './utils/firebase'

export const ServerUrl = import.meta.env.VITE_API_URL || "https://diwakarbhagatbuildx.onrender.com"
axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    // Handle Firebase redirect result (runs on every page load after Google redirect)
    const handleRedirect = async () => {
      try {
        const response = await getRedirectResult(auth)
        if (response) {
          const { displayName: name, email } = response.user
          const result = await axios.post(ServerUrl + "/api/auth/google", { name, email })
          dispatch(setUserData(result.data))
          return // skip getUser since we just signed in
        }
      } catch (error) {
        console.log("Redirect auth error:", error)
      }

      // If no redirect result, check if user is already logged in
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user")
        dispatch(setUserData(result.data))
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Failed to fetch user:", error.message)
        }
        dispatch(setUserData(null))
      }
    }
    handleRedirect()

  }, [dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/history' element={<InterviewHistory />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/report/:id' element={<InterviewReport />} />



    </Routes>
  )
}

export default App
