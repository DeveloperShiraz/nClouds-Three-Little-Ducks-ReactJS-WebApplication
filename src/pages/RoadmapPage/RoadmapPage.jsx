import { useNavigate } from 'react-router-dom'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import TopNavigation from '../../components/TopNavigation/TopNavigation'
import './RoadmapPage.css'

function RoadmapPage() {
    return (
        <div className="roadmap-container">
            <TopNavigation />

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
