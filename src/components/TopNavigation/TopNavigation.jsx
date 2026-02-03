import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import './TopNavigation.css'

function TopNavigation() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = async () => {
        await AuthService.signOut()
        navigate('/')
    }

    return (
        <header className="top-nav-header">
            <img src="/LogoWithCompanyName.png" alt="Three Little Ducks" className="top-nav-logo" />

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
    )
}

export default TopNavigation
