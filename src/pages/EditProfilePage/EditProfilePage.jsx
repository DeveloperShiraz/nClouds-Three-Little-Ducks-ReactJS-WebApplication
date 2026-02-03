import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataService from '../../services/DataService'
import AuthService from '../../services/AuthService'
import '../CreateProfilePage/CreateProfilePage.css' // Reuse styling

function EditProfilePage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentProfile, setCurrentProfile] = useState(null)

    // Form State
    const [name, setName] = useState('')
    const [role, setRole] = useState('DAD')
    const [babyName, setBabyName] = useState('')
    const [babyBirthday, setBabyBirthday] = useState('')
    const [babyGender, setBabyGender] = useState('UNSPECIFIED')

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = async () => {
        try {
            const { user } = await AuthService.getCurrentUser()
            if (!user) {
                navigate('/signin')
                return
            }

            const result = await DataService.getUserProfile()
            if (result.success && result.exists) {
                const p = result.profile
                setCurrentProfile(p)
                setName(p.name)
                setRole(p.role)
                setBabyName(p.babyName || '')
                setBabyBirthday(p.babyBirthday || '')
                setBabyGender(p.babyGender || 'UNSPECIFIED')
            } else {
                // No profile found? redirect to create
                navigate('/create-profile')
            }
        } catch (err) {
            console.error(err)
            setError('Failed to load profile')
        } finally {
            setPageLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const updates = {
            name,
            role,
            babyName,
            babyBirthday,
            babyGender
        }

        const result = await DataService.updateProfile(currentProfile, updates)

        setLoading(false)

        if (result.success) {
            navigate('/dashboard')
        } else {
            setError(result.error)
        }
    }

    if (pageLoading) {
        return <div className="create-profile-container">Loading...</div>
    }

    return (
        <div className="create-profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src="/LogoWithCompanyName.png" alt="Three Little Ducks Logo" className="auth-logo" />
                    <h1 className="profile-title">Edit Profile</h1>
                    <p className="profile-subtitle">Update information about yourself and your Keiki</p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role" className="form-label">Select which describes you</label>
                        <select
                            id="role"
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="DAD">Dad</option>
                            <option value="MOM">Mom</option>
                            <option value="GUARDIAN">Guardian</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="babyName" className="form-label">Baby's Name</label>
                        <input
                            type="text"
                            id="babyName"
                            className="form-input"
                            value={babyName}
                            onChange={(e) => setBabyName(e.target.value)}
                            placeholder="Enter baby's name"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="babyBirthday" className="form-label">
                                Baby's Birthday
                                <div className="tooltip-container">
                                    <span className="info-icon">i</span>
                                    <span className="tooltip-text">Knowing the baby's age will allow us to recommend age-appropriate activities.</span>
                                </div>
                            </label>
                            <input
                                type="date"
                                id="babyBirthday"
                                className="form-input"
                                value={babyBirthday}
                                onChange={(e) => setBabyBirthday(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="babyGender" className="form-label">Baby's Gender</label>
                            <select
                                id="babyGender"
                                className="form-select"
                                value={babyGender}
                                onChange={(e) => setBabyGender(e.target.value)}
                            >
                                <option value="BOY">Boy</option>
                                <option value="GIRL">Girl</option>
                                <option value="UNSPECIFIED">Unspecified</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <button
                            type="button"
                            className="profile-button"
                            style={{ background: '#9ca3af', marginRight: '1rem' }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="profile-button" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePage
