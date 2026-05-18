import { useState } from 'react';
import { useApp } from '../store';
import {
  LayoutDashboard, Users, UserCheck, BookOpen, Briefcase, CreditCard,
  Wallet, Lightbulb, BarChart3, Settings, CheckCircle, XCircle,
  Plus, X, ArrowLeftRight, Shield, TrendingUp, DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const { state, updateWithdrawal, updateBusinessIdea, updateMentor, addWalletTransaction } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPairModal, setShowPairModal] = useState(false);
  const [pairMentorId, setPairMentorId] = useState('');
  const [pairMenteeId, setPairMenteeId] = useState('');

  const totalEarnings = state.walletTransactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const pendingWithdrawals = state.withdrawals.filter(w => w.status === 'mentor_approved');
  const pendingIdeas = state.businessIdeas.filter(b => b.status === 'approved');

  const getMenteeName = (id: string) => state.mentees.find(m => m.id === id)?.name || 'Unknown';
  const getMentorName = (id: string) => state.mentors.find(m => m.id === id)?.name || 'Unknown';

  const tabs = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'mentors', label: 'Mentors', icon: UserCheck },
    { key: 'mentees', label: 'Mentees', icon: Users },
    { key: 'pairing', label: 'Pairing', icon: ArrowLeftRight },
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'gigs', label: 'Gigs', icon: Briefcase },
    { key: 'subscriptions', label: 'Mentor Plan', icon: CreditCard },
    { key: 'withdrawals', label: 'Withdrawals', icon: Wallet, badge: pendingWithdrawals.length },
    { key: 'crowdfunding', label: 'Crowdfunding', icon: Lightbulb, badge: pendingIdeas.length },
    { key: 'reports', label: 'Reports', icon: BarChart3 },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-[#0a1628] text-white min-h-screen sticky top-16">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center font-bold">A</div>
              <div>
                <div className="font-semibold text-sm">Admin Panel</div>
                <div className="text-xs text-gray-400">Data Revolution Co.</div>
              </div>
            </div>
          </div>
          <nav className="p-2">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${activeTab === t.key ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <t.icon size={18} />
                <span className="flex-1 text-left">{t.label}</span>
                {t.badge ? <span className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">{t.badge}</span> : null}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 overflow-x-auto">
          <div className="flex">
            {tabs.slice(0, 6).map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex-1 min-w-[60px] flex flex-col items-center gap-0.5 py-2 text-xs ${activeTab === t.key ? 'text-red-600' : 'text-gray-500'}`}>
                <t.icon size={18} />
                <span className="truncate max-w-[60px]">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Mentors', value: state.mentors.length, icon: UserCheck, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                  { label: 'Total Mentees', value: state.mentees.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Active Courses', value: state.courses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Total Gigs', value: state.gigs.length, icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Total Earnings', value: `₦${totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Pending Withdrawals', value: pendingWithdrawals.length, icon: Wallet, color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'Crowdfunding Ideas', value: state.businessIdeas.filter(b => b.status === 'crowdfunding').length, icon: Lightbulb, color: 'text-pink-600', bg: 'bg-pink-50' },
                  { label: 'Active Subscriptions', value: state.mentors.filter(m => m.subscriptionStatus === 'active').length, icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>
                      <s.icon size={16} className={s.color} />
                    </div>
                    <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp size={18} /> Platform Activity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Gigs Completed</span>
                      <span className="font-bold text-green-600">{state.gigs.filter(g => g.status === 'approved').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Reviews</span>
                      <span className="font-bold text-yellow-600">{state.gigs.filter(g => g.status === 'submitted').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Meetings Scheduled</span>
                      <span className="font-bold text-blue-600">{state.meetings.filter(m => m.status === 'scheduled').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Assessments Done</span>
                      <span className="font-bold text-purple-600">{state.assessments.length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Wallet size={18} /> Financial Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Gig Payments</span>
                      <span className="font-bold text-green-600">₦{totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Withdrawals</span>
                      <span className="font-bold text-orange-600">₦{pendingWithdrawals.reduce((s, w) => s + w.amount, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Crowdfunding Raised</span>
                      <span className="font-bold text-pink-600">₦{state.businessIdeas.reduce((s, b) => s + b.amountRaised, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield size={18} /> Subscription Status</h3>
                  <div className="space-y-3">
                    {state.mentors.map(m => (
                      <div key={m.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{m.name}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.subscriptionStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.subscriptionStatus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MENTORS */}
          {activeTab === 'mentors' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Mentors</h2>
              <div className="space-y-4">
                {state.mentors.map(m => (
                  <div key={m.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">{m.name.charAt(0)}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{m.name}</h3>
                        <p className="text-sm text-gray-500">{m.profession} · {m.expertise}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${m.subscriptionStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.subscriptionStatus}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div><span className="text-gray-500">Email:</span> {m.email}</div>
                      <div><span className="text-gray-500">Location:</span> {m.location}</div>
                      <div><span className="text-gray-500">Experience:</span> {m.experience} years</div>
                      <div><span className="text-gray-500">Mentees:</span> {m.assignedMentees.length}</div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-3 border-t">
                      {m.subscriptionStatus === 'expired' && (
                        <button onClick={() => updateMentor(m.id, { subscriptionStatus: 'active', subscriptionExpiry: '2027-01-31' })}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Activate Subscription</button>
                      )}
                      {m.subscriptionStatus === 'active' && (
                        <button onClick={() => updateMentor(m.id, { subscriptionStatus: 'expired' })}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">Expire Subscription</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MENTEES */}
          {activeTab === 'mentees' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Mentees</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl shadow-sm text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-semibold">Name</th>
                      <th className="text-left p-4 font-semibold">Interest</th>
                      <th className="text-left p-4 font-semibold">Level</th>
                      <th className="text-left p-4 font-semibold">Mentor</th>
                      <th className="text-left p-4 font-semibold">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {state.mentees.map(m => (
                      <tr key={m.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{m.name}</td>
                        <td className="p-4">{m.digitalInterest}</td>
                        <td className="p-4"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">{m.skillLevel}</span></td>
                        <td className="p-4">{m.assignedMentorId ? getMentorName(m.assignedMentorId) : <span className="text-gray-400">Unassigned</span>}</td>
                        <td className="p-4">{m.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAIRING */}
          {activeTab === 'pairing' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mentor-Mentee Pairing</h2>
                <button onClick={() => setShowPairModal(true)} className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                  <Plus size={16} /> New Pairing
                </button>
              </div>

              <div className="space-y-4">
                {state.mentors.map(m => (
                  <div key={m.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">{m.name.charAt(0)}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{m.name}</h3>
                        <p className="text-sm text-gray-500">{m.expertise} · {m.assignedMentees.length} mentees</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.mentees.filter(me => me.assignedMentorId === m.id).map(me => (
                        <span key={me.id} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">{me.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {showPairModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Assign Mentee to Mentor</h3>
                      <button onClick={() => setShowPairModal(false)}><X size={20} /></button>
                    </div>
                    <div className="space-y-4">
                      <select value={pairMentorId} onChange={e => setPairMentorId(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="">Select Mentor</option>
                        {state.mentors.filter(m => m.subscriptionStatus === 'active').map(m => (
                          <option key={m.id} value={m.id}>{m.name} ({m.expertise})</option>
                        ))}
                      </select>
                      <select value={pairMenteeId} onChange={e => setPairMenteeId(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="">Select Mentee</option>
                        {state.mentees.filter(m => !m.assignedMentorId).map(m => (
                          <option key={m.id} value={m.id}>{m.name} ({m.digitalInterest})</option>
                        ))}
                      </select>
                      <button onClick={() => {
                        if (!pairMentorId || !pairMenteeId) return;
                        setShowPairModal(false);
                      }} className="w-full py-2 bg-red-600 text-white rounded-lg font-medium text-sm">Assign Pair</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* COURSES */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Courses</h2>
                <button className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                  <Plus size={16} /> Add Course
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl shadow-sm text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-semibold">Title</th>
                      <th className="text-left p-4 font-semibold">Category</th>
                      <th className="text-left p-4 font-semibold">Level</th>
                      <th className="text-left p-4 font-semibold">Duration</th>
                      <th className="text-left p-4 font-semibold">Enrolled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {state.courses.map(c => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{c.title}</td>
                        <td className="p-4"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">{c.category}</span></td>
                        <td className="p-4">{c.level}</td>
                        <td className="p-4">{c.duration}</td>
                        <td className="p-4 font-semibold">{c.enrolled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GIGS */}
          {activeTab === 'gigs' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Gigs</h2>
              <div className="space-y-4">
                {state.gigs.map(g => (
                  <div key={g.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{g.title}</h3>
                        <p className="text-sm text-gray-500">Mentee: {getMenteeName(g.assignedTo)} · Mentor: {getMentorName(g.assignedBy)}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        g.status === 'approved' ? 'bg-green-100 text-green-700' :
                        g.status === 'submitted' ? 'bg-yellow-100 text-yellow-700' :
                        g.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'}`}>{g.status}</span>
                    </div>
                    <p className="text-sm text-gray-600">{g.description}</p>
                    {g.paymentValue && <p className="text-sm text-green-600 font-medium mt-1">Payment: ₦{g.paymentValue.toLocaleString()}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mentor Plan Management</h2>
              <div className="space-y-4">
                {state.mentors.map(m => (
                  <div key={m.id} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">{m.name.charAt(0)}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{m.name}</h3>
                      <p className="text-sm text-gray-500">Expires: {m.subscriptionExpiry}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${m.subscriptionStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.subscriptionStatus}</span>
                    <button onClick={() => updateMentor(m.id, { subscriptionStatus: m.subscriptionStatus === 'active' ? 'expired' : 'active' })}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                      Toggle Status
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WITHDRAWALS */}
          {activeTab === 'withdrawals' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Withdrawal Management</h2>
              <div className="space-y-4">
                {state.withdrawals.map(w => (
                  <div key={w.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">₦{w.amount.toLocaleString()}</h3>
                        <p className="text-sm text-gray-500">{getMenteeName(w.menteeId)} · {w.createdAt}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        w.status === 'paid' ? 'bg-green-100 text-green-700' :
                        w.status === 'mentor_approved' ? 'bg-blue-100 text-blue-700' :
                        w.status.includes('rejected') ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>{w.status.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="text-sm mb-3">
                      <p><strong>Purpose:</strong> {w.purpose}</p>
                      <p><strong>Explanation:</strong> {w.explanation}</p>
                      <p><strong>Payment:</strong> {w.paymentDetails}</p>
                    </div>
                    {w.status === 'mentor_approved' && (
                      <div className="flex gap-2 pt-3 border-t">
                        <button onClick={() => {
                          updateWithdrawal(w.id, { status: 'paid' });
                          addWalletTransaction({ id: `wt-${Date.now()}`, menteeId: w.menteeId, type: 'debit', amount: w.amount, description: `Withdrawal: ${w.purpose}`, createdAt: new Date().toISOString().split('T')[0] });
                        }} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm">
                          <CheckCircle size={14} /> Process Payment
                        </button>
                        <button onClick={() => updateWithdrawal(w.id, { status: 'rejected' })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm">
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CROWDFUNDING */}
          {activeTab === 'crowdfunding' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Crowdfunding Management</h2>
              <div className="space-y-4">
                {state.businessIdeas.map(b => (
                  <div key={b.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{b.title}</h3>
                        <p className="text-sm text-gray-500">{getMenteeName(b.menteeId)} · ₦{b.fundingNeed.toLocaleString()} needed</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        b.status === 'crowdfunding' ? 'bg-green-100 text-green-700' :
                        b.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                        b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{b.solution}</p>
                    {b.status === 'crowdfunding' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>₦{b.amountRaised.toLocaleString()} raised</span>
                          <span className="font-semibold">₦{b.fundingNeed.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min((b.amountRaised / b.fundingNeed) * 100, 100)}%` }} />
                        </div>
                      </div>
                    )}
                    {b.status === 'approved' && (
                      <div className="flex gap-2 pt-3 border-t">
                        <button onClick={() => updateBusinessIdea(b.id, { status: 'crowdfunding' })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm">
                          <CheckCircle size={14} /> Approve for Crowdfunding
                        </button>
                        <button onClick={() => updateBusinessIdea(b.id, { status: 'rejected' })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm">
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Reports & Analytics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Mentor Performance</h3>
                  {state.mentors.map(m => {
                    const menteeCount = state.mentees.filter(me => me.assignedMentorId === m.id).length;
                    const gigCount = state.gigs.filter(g => g.assignedBy === m.id).length;
                    const assessmentCount = state.assessments.filter(a => a.mentorId === m.id).length;
                    return (
                      <div key={m.id} className="flex items-center gap-3 py-3 border-b last:border-0">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-sm">{m.name.charAt(0)}</div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{m.name}</div>
                          <div className="text-xs text-gray-500">{menteeCount} mentees · {gigCount} gigs · {assessmentCount} assessments</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Mentee Progress</h3>
                  {state.mentees.map(m => {
                    const completedGigs = state.gigs.filter(g => g.assignedTo === m.id && g.status === 'approved').length;
                    const balance = state.walletTransactions.filter(t => t.menteeId === m.id).reduce((s, t) => s + (t.type === 'credit' ? t.amount : -t.amount), 0);
                    return (
                      <div key={m.id} className="flex items-center gap-3 py-3 border-b last:border-0">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">{m.name.charAt(0)}</div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{m.name}</div>
                          <div className="text-xs text-gray-500">{completedGigs} gigs completed · Balance: ₦{balance.toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Settings</h2>
              <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                    <input defaultValue="Data Revolution Company®" className="w-full px-3 py-2 border rounded-lg text-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mentor Plan Fee (₦) — Lifetime</label>
                    <input defaultValue="50000" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paystack API Key</label>
                    <input defaultValue="pk_test_••••••••" type="password" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Confirmation Reminder (days after registration)</label>
                    <input defaultValue="7" type="number" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700">Save Settings</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
