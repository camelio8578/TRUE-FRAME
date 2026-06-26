import { Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import PublicFeed from './pages/PublicFeed'
import VideoPlayer from './pages/VideoPlayer'
import PublicUpload from './pages/PublicUpload'
import GlowFeedback from './pages/GlowFeedback'
import Dashboard from './pages/Dashboard'
import FinancialModel from './pages/FinancialModel'
import Team from './pages/Team'
import IPGovernance from './pages/IPGovernance'
import CompetitiveLandscape from './pages/CompetitiveLandscape'
import UseOfFunds from './pages/UseOfFunds'
import Technology from './pages/Technology'
import FoundingDocument from './pages/FoundingDocument'
import PitchDeck from './pages/PitchDeck'
import PlatformAdoption from './pages/PlatformAdoption'
import AcquisitionPlaybook from './pages/AcquisitionPlaybook'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicFeed />} />
      <Route path="/about" element={<Landing />} />
      <Route path="/video/:id" element={<VideoPlayer />} />
      <Route path="/upload" element={<PublicUpload />} />
      <Route path="/feedback" element={<GlowFeedback />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/financials" element={<FinancialModel />} />
      <Route path="/team" element={<Team />} />
      <Route path="/ip-governance" element={<IPGovernance />} />
      <Route path="/competitive" element={<CompetitiveLandscape />} />
      <Route path="/use-of-funds" element={<UseOfFunds />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/founding-document" element={<FoundingDocument />} />
      <Route path="/pitch-deck" element={<PitchDeck />} />
      <Route path="/platform-adoption" element={<PlatformAdoption />} />
      <Route path="/acquisition" element={<AcquisitionPlaybook />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
