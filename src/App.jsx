import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import SignInPage from './pages/SignInPage/SignInPage'
import CreateProfilePage from './pages/CreateProfilePage/CreateProfilePage'
import EditProfilePage from './pages/EditProfilePage/EditProfilePage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import RoadmapPage from './pages/RoadmapPage/RoadmapPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </Router>
  )
}

export default App
