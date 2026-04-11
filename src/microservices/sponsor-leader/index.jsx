import '../sponsor-circle/sponsor-circle.css'
import { useState } from 'react'
import SCLeftNav from '../sponsor-circle/components/SCLeftNav'
import SCMetricCards from '../sponsor-circle/components/SCMetricCards'
import SCBudgetTracker from '../sponsor-circle/components/SCBudgetTracker'
import SCParticipation from '../sponsor-circle/components/SCParticipation'
import SCStudentUpdate from '../sponsor-circle/components/SCStudentUpdate'
import SCTimeOnImpact from '../sponsor-circle/components/SCTimeOnImpact'
import SCCircleRanking from '../sponsor-circle/components/SCCircleRanking'
import SCKiaPanel from '../sponsor-circle/components/SCKiaPanel'
import SCStatementView from '../sponsor-circle/components/SCStatementView'
import SCImpactImprovement from '../sponsor-circle/components/SCImpactImprovement'
import SCChatMainView from '../sponsor-circle/components/SCChatMainView'
import SCSponsorProfile from '../sponsor-circle/components/SCSponsorProfile'
import SCImpactLeague from '../sponsor-circle/components/SCImpactLeague'
import SCSettings from '../sponsor-circle/components/SCSettings'
import SCMemberContributions from '../sponsor-circle/components/SCMemberContributions'
import SCVendorPayments from '../sponsor-circle/components/SCVendorPayments'
import SCSchoolComm from './SCSchoolComm'

const TABS = ['My Profile', 'My Circle', 'Member Contributions', 'Vendor Payments', 'Impact League', 'School Comm', 'Statement', 'Chat & Kia']

export default function SponsorLeaderDashboard() {
  const [activeTab, setActiveTab] = useState('My Profile')

  return (
    <div className="sc-root">
      <SCLeftNav activeTab={activeTab} setActiveTab={setActiveTab} isLeader={true} />

      <main className={`sc-main${activeTab === 'Chat & Kia' ? ' sc-main-chat' : ''}${activeTab === 'School Comm' ? ' sc-main-chat' : ''}`}>
        <div className="sc-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`sc-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'My Profile' && (
          <div style={{ padding: '0 24px 24px' }}>
            <SCSponsorProfile isLeader={true} />
          </div>
        )}

        {activeTab === 'My Circle' && (
          <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SCMetricCards />
            <SCBudgetTracker />
            <SCParticipation />
            <SCImpactImprovement />
            <div className="sc-half-grid">
              <SCStudentUpdate />
              <SCTimeOnImpact />
            </div>
            <SCCircleRanking />
          </div>
        )}

        {activeTab === 'Member Contributions' && (
          <div style={{ padding: '0 24px 24px' }}>
            <SCMemberContributions />
          </div>
        )}

        {activeTab === 'Vendor Payments' && (
          <div style={{ padding: '0 24px 24px' }}>
            <SCVendorPayments />
          </div>
        )}

        {activeTab === 'Impact League' && (
          <div style={{ padding: '0 24px 24px' }}>
            <SCImpactLeague />
          </div>
        )}

        {activeTab === 'School Comm' && (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '0 24px 24px' }}>
            <SCSchoolComm />
          </div>
        )}

        {activeTab === 'Chat & Kia' && (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <SCChatMainView circleId="481eba8f-778d-4618-8f9e-6e6b263d89a0" userRole="sponsor_leader" isLeader={true} />
          </div>
        )}

        {activeTab === 'Statement' && (
          <div style={{ padding: '0 24px 24px' }}>
            <SCStatementView />
          </div>
        )}

        {activeTab === 'Settings' && (
          <div style={{ padding: '0 24px 24px' }}>
            <SCSettings isLeader={true} />
          </div>
        )}
      </main>

      {activeTab !== 'Chat & Kia' && activeTab !== 'My Profile' && activeTab !== 'Settings' && activeTab !== 'School Comm' && <SCKiaPanel />}
    </div>
  )
}
