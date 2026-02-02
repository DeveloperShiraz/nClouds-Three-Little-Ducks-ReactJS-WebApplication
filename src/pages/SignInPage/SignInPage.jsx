import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import DataService from '../../services/DataService'
import './SignInPage.css'

function SignInPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(location.state?.message || '')

    // Forgot password state
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showResetCodeInput, setShowResetCodeInput] = useState(false)

    // Check if user is already signed in
    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        const { user } = await AuthService.getCurrentUser()
        if (user) {
            checkProfileAndRedirect()
        }
    }

    const checkProfileAndRedirect = async () => {
        const profileResult = await DataService.getUserProfile()

        if (profileResult.success && !profileResult.exists) {
            navigate('/create-profile')
        } else {
            navigate('/dashboard')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccessMessage('')
        setLoading(true)

        const result = await AuthService.signIn(email, password)

        setLoading(false)

        if (result.success) {
            checkProfileAndRedirect()
        } else {
            setError(result.error)
        }
    }

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await AuthService.resetPassword(resetEmail)

        setLoading(false)

        if (result.success) {
            setShowResetCodeInput(true)
        } else {
            setError(result.error)
        }
    }

    const handleResetPasswordConfirm = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await AuthService.confirmResetPassword(resetEmail, resetCode, newPassword)

        setLoading(false)

        if (result.success) {
            setShowForgotPassword(false)
            setShowResetCodeInput(false)
            setResetEmail('')
            setResetCode('')
            setNewPassword('')
            setSuccessMessage('Password reset successfully! Please sign in with your new password.')
        } else {
            setError(result.error)
        }
    }

    if (showForgotPassword) {
        if (showResetCodeInput) {
            return (
                <div className="auth-container">
                    <Link to="/" className="back-link">
                        <span className="back-arrow">←</span>
                        Back to Home
                    </Link>

                    <div className="auth-card">
                        <div className="auth-header">
                            <img src="/Logo.png" alt="Three Little Ducks Logo" className="auth-logo" />
                            <h1 className="auth-title">Reset Password</h1>
                            <p className="auth-subtitle">Enter the code sent to {resetEmail}</p>
                        </div>

                        <form className="auth-form" onSubmit={handleResetPasswordConfirm}>
                            {error && <div className="error-message">{error}</div>}

                            <div className="form-group">
                                <label htmlFor="resetCode" className="form-label">Verification Code</label>
                                <input
                                    type="text"
                                    id="resetCode"
                                    className="form-input"
                                    value={resetCode}
                                    onChange={(e) => setResetCode(e.target.value)}
                                    placeholder="Enter code"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="form-input"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="At least 8 characters"
                                    required
                                />
                            </div>

                            <button type="submit" className="auth-button" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>

                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() => {
                                    setShowForgotPassword(false)
                                    setShowResetCodeInput(false)
                                    setError('')
                                }}
                            >
                                Back to Sign In
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
                        <h1 className="auth-title">Forgot Password</h1>
                        <p className="auth-subtitle">Enter your email to receive a reset code</p>
                    </div>

                    <form className="auth-form" onSubmit={handleForgotPasswordSubmit}>
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="resetEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                id="resetEmail"
                                className="form-input"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Code'}
                        </button>

                        <button
                            type="button"
                            className="forgot-password"
                            onClick={() => {
                                setShowForgotPassword(false)
                                setError('')
                            }}
                        >
                            Back to Sign In
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
                    <h1 className="auth-title">Sign In</h1>
                    <p className="auth-subtitle">Welcome back! Please sign in to continue</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

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

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <button
                        type="button"
                        className="forgot-password"
                        onClick={() => setShowForgotPassword(true)}
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
