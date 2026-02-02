import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignInPage.css'

function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle sign in logic here
        console.log('Sign in:', { email, password })
    }

    const handleForgotPassword = () => {
        // Handle forgot password logic here
        console.log('Forgot password clicked')
    }

    return (
        <div className="auth-container">
            <Link to="/" className="back-link">
                <span className="back-arrow">←</span>
                Back to Home
            </Link>

            <div className="auth-card">
                <div className="auth-header">
                    <img src="/Logo.png" alt="Three Little Ducks Logo" className="auth-logo" />
                    <h1 className="auth-title">Sign In</h1>
                    <p className="auth-subtitle">Welcome back! Please sign in to continue</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Sign In
                    </button>

                    <button
                        type="button"
                        className="forgot-password"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
