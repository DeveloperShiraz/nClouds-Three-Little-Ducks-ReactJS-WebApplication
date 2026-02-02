import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import TopNavigation from '../../components/TopNavigation/TopNavigation'
import './DashboardPage.css'

function DashboardPage() {
    const navigate = useNavigate()

    return (
        <div className="dashboard-container">
            <TopNavigation />

            <main className="dashboard-content" style={{ paddingBottom: '80px' }}>
                <div className="empty-state">
                    <h2>Welcome to your Dashboard</h2>
                    <p>Your journey tracking will appear here soon!</p>
                </div>
            </main>

            <BottomNavigation />
        </div>
    )
}

export default DashboardPage
