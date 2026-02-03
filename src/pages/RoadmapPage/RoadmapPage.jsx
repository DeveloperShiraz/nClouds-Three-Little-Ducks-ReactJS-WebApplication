import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataService from '../../services/DataService'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import TopNavigation from '../../components/TopNavigation/TopNavigation'
import './RoadmapPage.css'

function RoadmapPage() {
    const [babyName, setBabyName] = useState('')
    const [babyWeeks, setBabyWeeks] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await DataService.getUserProfile()
            if (result.success && result.profile) {
                setBabyName(result.profile.babyName || 'Your Baby')

                if (result.profile.babyBirthday) {
                    const birthday = new Date(result.profile.babyBirthday)
                    const today = new Date()
                    const diffTime = Math.abs(today - birthday)
                    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
                    setBabyWeeks(diffWeeks)
                }
            }
            setLoading(false)
        }
        fetchProfile()
    }, [])

    return (
        <div className="roadmap-container">
            <TopNavigation />

            <main className="roadmap-content" style={{ paddingBottom: '80px' }}>
                <div className="roadmap-header">
                    <h1 className="roadmap-title">Development Roadmap</h1>
                    <p className="roadmap-disclaimer">
                        Every baby develops at their own unique pace. This roadmap shows general timelines to help you know what might come next, not what should happen by a certain time.
                    </p>

                    {!loading && (
                        <div className="baby-info-section">
                            <img src="/BlueBird.png" alt="Blue Bird" className="blue-bird-icon" />
                            <p className="baby-age-text">
                                {babyName} is <br />
                                {babyWeeks} Weeks old.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <BottomNavigation />
        </div>
    )
}

export default RoadmapPage
