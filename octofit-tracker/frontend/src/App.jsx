import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { path: '/activities', label: 'Activities', number: '01' },
  { path: '/leaderboard', label: 'Leaderboard', number: '02' },
  { path: '/teams', label: 'Teams', number: '03' },
  { path: '/users', label: 'Users', number: '04' },
  { path: '/workouts', label: 'Workouts', number: '05' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink className="brand" to="/activities" aria-label="OctoFit Tracker home">
          <img src={octofitLogo} alt="" className="brand-logo" />
          <span className="brand-name">OctoFit<span>Tracker</span></span>
        </NavLink>

        <div className="nav-caption">TRACKER</div>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to={item.path}
            >
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-school">
          <span className="school-mark">MH</span>
          <span><strong>Mergington High</strong><small>Physical Education</small></span>
        </div>
      </aside>

      <div className="app-content">
        <header className="app-topbar">
          <div className="breadcrumb-label">STUDENT FITNESS / <span>TRACKER</span></div>
          <div className="topbar-term"><span className="status-dot" /> FALL TERM 2026</div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
