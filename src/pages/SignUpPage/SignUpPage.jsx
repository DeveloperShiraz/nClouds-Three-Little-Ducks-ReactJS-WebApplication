import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import './SignUpPage.css'

function SignUpPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [showVerification, setShowVerification] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        // Validate password strength
        if (password.length < 8) {
            setError('Password must be at least 8 characters long')
            return
        }

        setLoading(true)

        const result = await AuthService.signUp(email, password)

        setLoading(false)

        if (result.success) {
            // Show verification code input
            setShowVerification(true)
        } else {
            setError(result.error)
        }
    }

    const handleVerification = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await AuthService.confirmSignUp(email, verificationCode)

        setLoading(false)

        if (result.success) {
            // Navigate to sign in page
            navigate('/signin', { state: { message: 'Account confirmed! Please sign in.' } })
        } else {
            setError(result.error)
        }
    }

    if (showVerification) {
        return (
            <div className="auth-container">
                <Link to="/" className="back-link">
                    <span className="back-arrow">←</span>
                    Back to Home
                </Link>

                <div className="auth-card">
                    <div className="auth-header">
                        <img src="/Logo.png" alt="Three Little Ducks Logo" className="auth-logo" />
                        <h1 className="auth-title">Verify Email</h1>
                        <p className="auth-subtitle">Enter the verification code sent to {email}</p>
                    </div>

                    <form className="auth-form" onSubmit={handleVerification}>
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="verificationCode" className="form-label">Verification Code</label>
                            <input
                                type="text"
                                id="verificationCode"
                                className="form-input"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="Enter code"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                </div>
            </div>
        )
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
                    <h1 className="auth-title">Sign Up</h1>
                    <p className="auth-subtitle">Create your account to get started</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

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
                            placeholder="At least 8 characters"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/signin" className="auth-link">Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
