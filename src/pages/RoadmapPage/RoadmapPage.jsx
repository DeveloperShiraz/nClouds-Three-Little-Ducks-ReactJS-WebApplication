import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import DashboardPage from '../DashboardPage/DashboardPage' // Reusing Header from dashboard? Or creating shared layout?
// Ideally we should extract the Header. For now, I'll allow duplication or just a clean page with BottomNav.
// The user request implies it's a main page like Dashboard.

import './RoadmapPage.css'
import '../DashboardPage/DashboardPage.css' // Reuse Header styles

function RoadmapPage() {
    const navigate = useNavigate()

    // We might want to reuse the Header. 
    // For this step I'll just duplicate the header structure or keep it simple.
    // Let's reuse the header structure for consistency.

    const handleLogout = async () => {
        await AuthService.signOut()
        navigate('/')
    }

    // Note: If we want a shared layout, we should refactor later.
    // copying header logic broadly for now or just keeping it simple.
    // Let's just put the content for now.

    return (
        <div className="roadmap-container">
            {/* Simple Header Reused manually for consistency if needed, or just content. 
                 Let's stick to the requested content specifically. */}

            <main className="roadmap-content" style={{ paddingBottom: '80px' }}>
                <div className="roadmap-header">
                    <h1 className="roadmap-title">Development Roadmap</h1>
                    <p className="roadmap-disclaimer">
                        Every baby develops at their own unique pace. This roadmap shows general timelines to help you know what might come next, not what should happen by a certain time.
                    </p>
                </div>
            </main>

            <BottomNavigation />
        </div>
    )
}

export default RoadmapPage
