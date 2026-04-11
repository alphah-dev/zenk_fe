import { Link, useLocation } from 'react-router-dom'
import { USER_PROFILE, LEADER_PROFILE } from '../data/placeholders'
import {
  Squares2X2Icon,
  TrophyIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  UsersIcon,
  AcademicCapIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline'

const MEMBER_NAV = [
  { label: 'Dashboard', tab: 'My Profile', icon: Squares2X2Icon },
  { label: 'Impact League', tab: 'Impact League', icon: TrophyIcon },
  { label: 'My Circle', tab: 'My Circle', icon: UserGroupIcon },
  { label: 'Statement', tab: 'Statement', icon: DocumentTextIcon },
  { label: 'Settings', tab: 'Settings', icon: Cog8ToothIcon },
]

const LEADER_NAV = [
  { label: 'Dashboard', tab: 'My Profile', icon: Squares2X2Icon },
  { label: 'Member Contributions', tab: 'Member Contributions', icon: UsersIcon },
  { label: 'Vendor Payments', tab: 'Vendor Payments', icon: CurrencyDollarIcon },
  { label: 'Impact League', tab: 'Impact League', icon: TrophyIcon },
  { label: 'School Comm', tab: 'School Comm', icon: AcademicCapIcon },
  { label: 'My Circle', tab: 'My Circle', icon: UserGroupIcon },
  { label: 'Statement', tab: 'Statement', icon: DocumentTextIcon },
  { label: 'Settings', tab: 'Settings', icon: Cog8ToothIcon },
]

export default function SCLeftNav({ activeTab, setActiveTab, isLeader = false }) {
  const location = useLocation()
  const NAV_ITEMS = isLeader ? LEADER_NAV : MEMBER_NAV
  const profile = isLeader ? LEADER_PROFILE : USER_PROFILE

  const profileTab = 'My Profile'

  return (
    <nav className="sc-left-nav">
      <div className="sc-logo">
        <div className="sc-logo-text">
          <span className="sc-logo-zen">ZEN</span>
          <span className="sc-logo-k">K</span>
        </div>
        <span className="sc-role-badge" style={isLeader ? { background: '#f59e0b', color: '#0f172a' } : {}}>
          {isLeader ? 'Circle Coordinator' : 'Sponsor Circle'}
        </span>
        
        {/* Perspective Switcher */}
        <Link 
          to={isLeader ? "/sponsor-circle" : "/sponsor-leader"} 
          className="sc-perspective-toggle"
          title={isLeader ? "Switch to Sponsor View" : "Switch to Coordinator View"}
        >
          <ArrowsRightLeftIcon className="w-4 h-4" />
          <span>{isLeader ? "Switch to Sponsor View" : "Switch to Leader View"}</span>
        </Link>
      </div>

      <div 
        className={`sc-profile ${activeTab === profileTab ? 'active' : ''}`} 
        onClick={() => setActiveTab(profileTab)}
        style={{
          cursor: 'pointer', transition: 'all 0.2s',
          border: activeTab === profileTab
            ? isLeader ? '1px solid #f59e0b' : '1px solid var(--sc-green)'
            : '1px solid transparent',
        }}
      >
        <div className="sc-avatar" style={isLeader ? { background: '#f59e0b', color: '#0f172a' } : {}}>
          {profile.initials}
          <span className="sc-avatar-dot" />
        </div>
        <div>
          <div className="sc-profile-name">
            {profile.name}
            {isLeader && (
              <span style={{
                fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px',
                background: '#f59e0b', color: '#0f172a', marginLeft: '6px', verticalAlign: 'middle',
              }}>LEADER</span>
            )}
          </div>
          <div className="sc-profile-sub">{profile.circle}</div>
        </div>
      </div>

      <div className="sc-nav-items">
        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon
          const isActive = activeTab === item.tab

          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`sc-nav-item${isActive ? ' active' : ''}`}
            >
              <IconComponent className="sc-nav-icon" />
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="sc-nav-back">
        <Link to="/dashboard" className="sc-back-btn">
          ← Main Dashboard
        </Link>
      </div>
    </nav>
  )
}
