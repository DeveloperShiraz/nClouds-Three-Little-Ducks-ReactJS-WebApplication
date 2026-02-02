import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import './DashboardPage.css'

function DashboardPage() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = async () => {
        await AuthService.signOut()
        navigate('/')
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <img src="/Logo.png" alt="Three Little Ducks Logo" className="dashboard-logo" />

                <div className="hamburger-menu">
                    <button
                        className="hamburger-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                    </button>

                    {isMenuOpen && (
                        <div className="menu-dropdown">
                            <button className="menu-item" onClick={() => navigate('/edit-profile')}>
                                <span>Edit Profile</span>
                            </button>
                            <button className="menu-item logout" onClick={handleLogout}>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="dashboard-content">
                <div className="empty-state">
                    <h2>Welcome to your Dashboard</h2>
                    <p>Your journey tracking will appear here soon!</p>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage
