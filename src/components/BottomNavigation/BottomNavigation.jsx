import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './BottomNavigation.css'

function BottomNavigation() {
    const navigate = useNavigate()
    const location = useLocation()

    // Helper to check if active
    const isActive = (path) => location.pathname === path

    return (
        <nav className="bottom-nav-container">
            {/* Home Item */}
            <button
                className={`bottom-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => navigate('/dashboard')}
            >
                <svg className="nav-icon" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="nav-label">Home</span>
            </button>

            {/* Roadmap Item */}
            <button
                className="bottom-nav-item"
                onClick={() => console.log('Roadmap clicked')} // Placeholder
            >
                <svg className="nav-icon" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6"></path>
                    <path d="M5 21l0-8"></path>
                    <path d="M19 21l0-8"></path>
                    <path d="M5 3l0 6"></path>
                    <path d="M19 3l0 6"></path>
                    <circle cx="5" cy="11" r="2"></circle>
                    <circle cx="19" cy="11" r="2"></circle>
                    <path d="M5 13l0 8c0 0 0-3 7-3s7 3 7 3l0-8"></path>
                    {/* Simplified map/roadmap icon simulation - replacing with a more winding path look */}
                    <path d="M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" style={{ display: 'none' }}></path>
                    {/* Using a clear Map styled icon instead */}
                    <path d="M1 6v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6l-11 5z" fill="none" style={{ display: 'none' }}></path>
                </svg>
                {/* Let's use a nice winding path icon for Roadmap explicitly */}
                <svg className="nav-icon" viewBox="0 0 24 24" style={{ position: 'absolute', opacity: 0 }}>
                    {/* Fallback hidden to keep structure if needed, but rendering actual icon below */}
                </svg>
                {/* Actual Roadmap Icon Overwrite for this button */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <svg className="nav-icon" viewBox="0 0 24 24">
                        <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6z"></path>
                        <path d="M22 13h-4"></path>
                        <path d="M18 13H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 13z" transform="translate(0 3)"></path>
                        {/* This looks like a stack. Let's try the winding road path. */}
                    </svg>
                </div>
                {/* Re-doing Roadmap Icon to match "Map" look better */}
                <div style={{ position: 'absolute', inset: 0, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg className="nav-icon" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                        <line x1="8" y1="2" x2="8" y2="4"></line>
                        <line x1="16" y1="2" x2="16" y2="4"></line>
                        <path d="M9 10l2 2 4-4"></path>
                    </svg>
                    <span className="nav-label">Roadmap</span>
                </div>
            </button>
            {/* Okay, simplifying. I'll just render it normally. simpler is better. */}
        </nav>
    )
    return null; // Don't use the above mess
}

// Actual Component
function BottomNavigationFinal() {
    const navigate = useNavigate()
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <nav className="bottom-nav-container">
            {/* Home */}
            <button
                className={`bottom-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => navigate('/dashboard')}
            >
                <svg className="nav-icon" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="nav-label">Home</span>
            </button>

            {/* Roadmap - Map/Flag Icon */}
            <button
                className={`bottom-nav-item ${isActive('/roadmap') ? 'active' : ''}`}
                onClick={() => navigate('/roadmap')}
            >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 4a3 3 0 0 1 3 3c0 2-3 5-3 5s-3-3-3-5a3 3 0 0 1 3-3z" />
                    <circle cx="18" cy="7" r="1" />
                    <path d="M6 15a3 3 0 0 1 3 3c0 2-3 5-3 5s-3-3-3-5a3 3 0 0 1 3-3z" />
                    <circle cx="6" cy="18" r="1" />
                    <path d="M9 18c2 0 4-2 4-5s2-5 4-5" />
                </svg>
                <span className="nav-label">Roadmap</span>
            </button>

            {/* Video - Play Circle Icon */}
            <button
                className={`bottom-nav-item ${isActive('/video') ? 'active' : ''}`}
                onClick={() => navigate('/video')}
            >
                <svg className="nav-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <span className="nav-label">Video</span>
            </button>

            {/* Ask - Chat Bubble Icon */}
            <button
                className={`bottom-nav-item ${isActive('/ask') ? 'active' : ''}`}
                onClick={() => navigate('/ask')}
            >
                <svg className="nav-icon" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="nav-label">Ask</span>
            </button>
        </nav>
    )
}

export default BottomNavigationFinal
