import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import './LandingPage.css'

function LandingPage() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        const { success } = await AuthService.getCurrentUser()
        if (success) {
            navigate('/dashboard')
        }
    }

    const slides = [
        {
            title: "Track Development",
            text: "Monitor milestones across 5 key developmental domains with expert guidance from Dr. Suma Metla.",
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            )
        },
        {
            title: "Curated Activities",
            text: "Age-appropriate activities and exercises tailored to your keiki's current developmental stage.",
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            )
        },
        {
            title: "Capture Progress",
            text: "Document your baby's journey with photos and videos to celebrate every milestone.",
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            )
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [slides.length])

    return (
        <div className="container">
            <header className="header">
                <div className="logo-placeholder">
                    <img src="/Logo.png" alt="Three Little Ducks Logo" className="logo-img" />
                </div>
                <h1 className="title">Three Little Ducks</h1>
                <h2 className="subtitle">
                    Expert Pediatric Physical Therapy <br />
                    Guidance for Your Ohana
                </h2>
            </header>

            <main className="main-content">
                <h3 className="welcome-text">
                    Welcome to your keiki's <br />
                    development journey!
                </h3>

                <div className="carousel-container">
                    <div className="carousel-content fade-in" key={currentIndex}>
                        <h3 className="feature-title">
                            {slides[currentIndex].title}
                        </h3>

                        <div className="image-placeholder">
                            <div className="placeholder-box">
                                {slides[currentIndex].icon}
                            </div>
                        </div>

                        <p className="description">
                            {slides[currentIndex].text}
                        </p>
                    </div>
                </div>

                <div className="pagination-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                <Link to="/signup" className="primary-button-link">
                    <button className="primary-button">
                        Sign up with email
                    </button>
                </Link>

                <div className="login-link">
                    Already have an account? <Link to="/signin">Log in</Link>
                </div>
            </main>
        </div>
    )
}

export default LandingPage
