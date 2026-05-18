import { useState } from 'react';
import { useApp } from '../store';
import type { Mentee } from '../types';
import {
  LayoutDashboard, BookOpen, Briefcase, Wallet, CreditCard, Calendar,
  Lightbulb, MessageSquare, ClipboardCheck, User, Plus, X, Upload,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export default function MenteeDashboard() {
  const { state, updateGig, addWithdrawal, addBusinessIdea, addMessage } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const mentee = state.mentees.find(m => m.id === state.auth.userId) as Mentee;
  if (!mentee) return <div className="p-8 text-center">Mentee not found</div>;

  const mentor = state.mentors.find(m => m.id === mentee.assignedMentorId);
  const myGigs = state.gigs.filter(g => g.assignedTo === mentee.id);
  const myMessages = state.messages.filter(m => m.to === mentee.id);
  const unreadCount = myMessages.filter(m => !m.read).length;
  const myMeetings = state.meetings.filter(m => m.menteeId === mentee.id);
  const myWithdrawals = state.withdrawals.filter(w => w.menteeId === mentee.id);
  const myIdeas = state.businessIdeas.filter(b => b.menteeId === mentee.id);
  const myAssessments = state.assessments.filter(a => a.menteeId === mentee.id);
  const myTransactions = state.walletTransactions.filter(t => t.menteeId === mentee.id);
  const walletBalance = myTransactions.reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);

  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({ amount: '', purpose: '', explanation: '', paymentDetails: '' });
  const [ideaForm, setIdeaForm] = useState({ title: '', problem: '', solution: '', beneficiaries: '', fundingNeed: '', expectedImpact: '' });

  const scoreLabel = (s: number) => ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][s];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'mentor', label: 'My Mentor', icon: User },
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'gigs', label: 'Gigs', icon: Briefcase },
    { key: 'wallet', label: 'Wallet', icon: Wallet },
    { key: 'withdrawals', label: 'Withdrawals', icon: CreditCard },
    { key: 'ideas', label: 'Business Ideas', icon: Lightbulb },
    { key: 'meetings', label: 'Meetings', icon: Calendar },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { key: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-[#0a1628] text-white min-h-screen sticky top-16">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center font-bold">
                {mentee.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{mentee.name}</div>
                <div className="text-xs text-gray-400">Mentee</div>
              </div>
            </div>
          </div>
          <nav className="p-2">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${activeTab === t.key ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <t.icon size={18} />
                <span className="flex-1 text-left">{t.label}</span>
                {t.badge ? <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{t.badge}</span> : null}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 overflow-x-auto">
          <div className="flex">
            {tabs.slice(0, 6).map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex-1 min-w-[60px] flex flex-col items-center gap-0.5 py-2 text-xs ${activeTab === t.key ? 'text-purple-600' : 'text-gray-500'}`}>
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
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Mentee Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Wallet Balance', value: `₦${walletBalance.toLocaleString()}`, color: 'text-green-600', icon: Wallet },
                  { label: 'Active Gigs', value: myGigs.filter(g => g.status === 'assigned').length, color: 'text-blue-600', icon: Briefcase },
                  { label: 'Business Ideas', value: myIdeas.length, color: 'text-purple-600', icon: Lightbulb },
                  { label: 'Meetings', value: myMeetings.filter(m => m.status === 'scheduled').length, color: 'text-orange-600', icon: Calendar },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1"><s.icon size={16} /> {s.label}</div>
                    <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              {mentor && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Assigned Mentor</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">{mentor.name.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{mentor.name}</h4>
                      <p className="text-sm text-gray-500">{mentor.profession} · {mentor.expertise}</p>
                      <p className="text-xs text-gray-400">{mentor.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Gigs</h3>
                  {myGigs.slice(0, 3).map(g => (
                    <div key={g.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                      <div className={`w-2 h-2 rounded-full ${g.status === 'approved' ? 'bg-green-500' : g.status === 'submitted' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{g.title}</div>
                        <div className="text-xs text-gray-500">Due: {g.deadline}</div>
                      </div>
                      <span className="text-xs text-gray-500">{g.status}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Upcoming Meetings</h3>
                  {myMeetings.filter(m => m.status === 'scheduled').length === 0 ? (
                    <p className="text-sm text-gray-500">No upcoming meetings</p>
                  ) : myMeetings.filter(m => m.status === 'scheduled').map(m => (
                    <div key={m.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                      <Calendar size={16} className="text-blue-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{m.topic}</div>
                        <div className="text-xs text-gray-500">{m.date} at {m.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MY MENTOR */}
          {activeTab === 'mentor' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Mentor</h2>
              {mentor ? (
                <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">{mentor.name.charAt(0)}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                      <p className="text-gray-500">{mentor.profession}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Expertise</span><span className="font-medium">{mentor.expertise}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Experience</span><span className="font-medium">{mentor.experience} years</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Availability</span><span className="font-medium">{mentor.availability}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Email</span><span className="font-medium">{mentor.email}</span></div>
                    <div className="flex justify-between py-2"><span className="text-gray-500">Subscription</span><span className={`font-medium ${mentor.subscriptionStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>{mentor.subscriptionStatus}</span></div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {mentor.skills.map(s => <span key={s} className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-full text-xs">{s}</span>)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">No mentor assigned yet.</div>
              )}
            </div>
          )}

          {/* COURSES */}
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.courses.filter(c => c.category === mentee.digitalInterest || true).slice(0, 6).map(c => (
                  <div key={c.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600" />
                    <div className="p-5">
                      <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-700 rounded-full">{c.category}</span>
                      <h3 className="font-bold text-gray-900 mt-2 mb-1">{c.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{c.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{c.duration}</span><span>{c.level}</span>
                      </div>
                      <button className="w-full mt-4 py-2 bg-purple-50 text-purple-700 font-medium rounded-lg hover:bg-purple-100 transition-colors text-sm">Start Course</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GIGS */}
          {activeTab === 'gigs' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gig Board</h2>
              <div className="space-y-4">
                {myGigs.map(g => (
                  <div key={g.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{g.title}</h3>
                        <p className="text-sm text-gray-500">Deadline: {g.deadline}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        g.status === 'approved' ? 'bg-green-100 text-green-700' :
                        g.status === 'submitted' ? 'bg-yellow-100 text-yellow-700' :
                        g.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'}`}>{g.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{g.description}</p>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm">
                      <strong>Instructions:</strong> {g.instructions}
                    </div>
                    {g.status === 'assigned' && (
                      <div className="pt-3 border-t">
                        <div className="flex gap-2">
                          <button onClick={() => {
                            updateGig(g.id, { status: 'submitted', submissionLink: 'https://github.com/mentee/work', submissionNote: 'Completed as instructed.' });
                            addMessage({ id: `msg-${Date.now()}`, to: g.assignedBy, from: mentee.id, subject: 'Gig Submitted', body: `${mentee.name} submitted "${g.title}" for review.`, read: false, createdAt: new Date().toISOString().split('T')[0] });
                          }} className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                            <Upload size={14} /> Submit Work
                          </button>
                        </div>
                      </div>
                    )}
                    {g.feedback && (
                      <div className="mt-3 bg-green-50 rounded-lg p-3 text-sm">
                        <strong>Mentor Feedback:</strong> {g.feedback}
                        {g.qualityScore && <span className="text-cyan-600 font-medium"> · Score: {g.qualityScore}/5 ({scoreLabel(g.qualityScore)})</span>}
                        {g.paymentValue && <span className="text-green-600 font-medium"> · Earned: ₦{g.paymentValue.toLocaleString()}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WALLET */}
          {activeTab === 'wallet' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-xl p-6">
                  <div className="text-sm opacity-80 mb-1">Total Balance</div>
                  <div className="text-3xl font-bold">₦{walletBalance.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Total Earned</div>
                  <div className="text-2xl font-bold text-green-600">₦{myTransactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0).toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Total Withdrawn</div>
                  <div className="text-2xl font-bold text-red-600">₦{myTransactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0).toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Transaction History</h3>
                {myTransactions.length === 0 ? (
                  <p className="text-sm text-gray-500">No transactions yet.</p>
                ) : (
                  <div className="divide-y">
                    {myTransactions.map(t => (
                      <div key={t.id} className="flex items-center gap-3 py-3">
                        {t.type === 'credit' ? (
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><ArrowDownRight size={16} className="text-green-600" /></div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><ArrowUpRight size={16} className="text-red-600" /></div>
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium">{t.description}</div>
                          <div className="text-xs text-gray-500">{t.createdAt}</div>
                        </div>
                        <div className={`font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {t.type === 'credit' ? '+' : '-'}₦{t.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WITHDRAWALS */}
          {activeTab === 'withdrawals' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Withdrawal Requests</h2>
                <button onClick={() => setShowWithdrawForm(true)} className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                  <Plus size={16} /> New Request
                </button>
              </div>

              <div className="space-y-4">
                {myWithdrawals.map(w => (
                  <div key={w.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">₦{w.amount.toLocaleString()}</h3>
                        <p className="text-sm text-gray-500">{w.createdAt}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        w.status === 'paid' ? 'bg-green-100 text-green-700' :
                        w.status === 'mentor_approved' || w.status === 'admin_approved' ? 'bg-blue-100 text-blue-700' :
                        w.status.includes('rejected') ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>
                        {w.status === 'pending' ? 'Pending Mentor Ratification' :
                         w.status === 'mentor_approved' ? 'Awaiting Admin Approval' :
                         w.status === 'admin_approved' ? 'Approved' :
                         w.status === 'paid' ? 'Paid' : 'Rejected'}
                      </span>
                    </div>
                    <p className="text-sm"><strong>Purpose:</strong> {w.purpose}</p>
                    <p className="text-sm text-gray-500">{w.explanation}</p>
                  </div>
                ))}
              </div>

              {showWithdrawForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Request Withdrawal</h3>
                      <button onClick={() => setShowWithdrawForm(false)}><X size={20} /></button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                      <span className="text-gray-500">Available Balance:</span> <span className="font-bold text-green-600">₦{walletBalance.toLocaleString()}</span>
                    </div>
                    <div className="space-y-4">
                      <input type="number" placeholder="Amount (₦)" value={withdrawForm.amount}
                        onChange={e => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <input placeholder="Purpose of withdrawal" value={withdrawForm.purpose}
                        onChange={e => setWithdrawForm({ ...withdrawForm, purpose: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <textarea placeholder="Supporting explanation" value={withdrawForm.explanation}
                        onChange={e => setWithdrawForm({ ...withdrawForm, explanation: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={2} />
                      <input placeholder="Payment details (Bank, Account No.)" value={withdrawForm.paymentDetails}
                        onChange={e => setWithdrawForm({ ...withdrawForm, paymentDetails: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <button onClick={() => {
                        if (!withdrawForm.amount || !withdrawForm.purpose) return;
                        addWithdrawal({ id: `w-${Date.now()}`, menteeId: mentee.id, amount: Number(withdrawForm.amount), purpose: withdrawForm.purpose, explanation: withdrawForm.explanation, paymentDetails: withdrawForm.paymentDetails, status: 'pending', createdAt: new Date().toISOString().split('T')[0] });
                        if (mentee.assignedMentorId) {
                          addMessage({ id: `msg-${Date.now()}`, to: mentee.assignedMentorId, from: mentee.id, subject: 'Withdrawal Request', body: `${mentee.name} requested withdrawal of ₦${Number(withdrawForm.amount).toLocaleString()} for "${withdrawForm.purpose}".`, read: false, createdAt: new Date().toISOString().split('T')[0] });
                        }
                        setWithdrawForm({ amount: '', purpose: '', explanation: '', paymentDetails: '' });
                        setShowWithdrawForm(false);
                      }} className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium text-sm">Submit Request</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BUSINESS IDEAS */}
          {activeTab === 'ideas' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Business Ideas</h2>
                <button onClick={() => setShowIdeaForm(true)} className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                  <Plus size={16} /> Pitch New Idea
                </button>
              </div>

              <div className="space-y-4">
                {myIdeas.map(b => (
                  <div key={b.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{b.title}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        b.status === 'crowdfunding' ? 'bg-green-100 text-green-700' :
                        b.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                        b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm mb-3">
                      <div><strong>Problem:</strong> {b.problem}</div>
                      <div><strong>Solution:</strong> {b.solution}</div>
                      <div><strong>Beneficiaries:</strong> {b.beneficiaries}</div>
                      <div><strong>Funding Need:</strong> ₦{b.fundingNeed.toLocaleString()}</div>
                    </div>
                    {b.status === 'crowdfunding' && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>₦{b.amountRaised.toLocaleString()} raised</span>
                          <span className="font-semibold">₦{b.fundingNeed.toLocaleString()} goal</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min((b.amountRaised / b.fundingNeed) * 100, 100)}%` }} />
                        </div>
                      </div>
                    )}
                    {b.mentorFeedback && <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm"><strong>Mentor Feedback:</strong> {b.mentorFeedback}</div>}
                  </div>
                ))}
              </div>

              {showIdeaForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Pitch Business Idea</h3>
                      <button onClick={() => setShowIdeaForm(false)}><X size={20} /></button>
                    </div>
                    <div className="space-y-4">
                      <input placeholder="Business Idea Title" value={ideaForm.title}
                        onChange={e => setIdeaForm({ ...ideaForm, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <textarea placeholder="Problem being solved" value={ideaForm.problem}
                        onChange={e => setIdeaForm({ ...ideaForm, problem: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={2} />
                      <textarea placeholder="Proposed solution" value={ideaForm.solution}
                        onChange={e => setIdeaForm({ ...ideaForm, solution: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={2} />
                      <input placeholder="Target beneficiaries" value={ideaForm.beneficiaries}
                        onChange={e => setIdeaForm({ ...ideaForm, beneficiaries: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <input type="number" placeholder="Estimated funding need (₦)" value={ideaForm.fundingNeed}
                        onChange={e => setIdeaForm({ ...ideaForm, fundingNeed: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <textarea placeholder="Expected impact" value={ideaForm.expectedImpact}
                        onChange={e => setIdeaForm({ ...ideaForm, expectedImpact: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={2} />
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-500 cursor-pointer hover:border-purple-400">
                        <Upload size={20} className="mx-auto mb-1" /> Upload supporting documents
                      </div>
                      <button onClick={() => {
                        if (!ideaForm.title || !ideaForm.problem) return;
                        addBusinessIdea({ id: `bi-${Date.now()}`, menteeId: mentee.id, title: ideaForm.title, problem: ideaForm.problem, solution: ideaForm.solution, beneficiaries: ideaForm.beneficiaries, fundingNeed: Number(ideaForm.fundingNeed) || 0, expectedImpact: ideaForm.expectedImpact, status: 'submitted', amountRaised: 0 });
                        if (mentee.assignedMentorId) {
                          addMessage({ id: `msg-${Date.now()}`, to: mentee.assignedMentorId, from: mentee.id, subject: 'Business Idea Submitted', body: `${mentee.name} submitted a business idea: "${ideaForm.title}".`, read: false, createdAt: new Date().toISOString().split('T')[0] });
                        }
                        setIdeaForm({ title: '', problem: '', solution: '', beneficiaries: '', fundingNeed: '', expectedImpact: '' });
                        setShowIdeaForm(false);
                      }} className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium text-sm">Submit Pitch</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MEETINGS */}
          {activeTab === 'meetings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheduled Meetings</h2>
              <div className="space-y-4">
                {myMeetings.map(m => (
                  <div key={m.id} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><Calendar size={24} /></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{m.topic}</h3>
                      <p className="text-sm text-gray-500">{m.date} at {m.time}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${m.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{m.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
              <div className="bg-white rounded-xl shadow-sm divide-y">
                {myMessages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No messages</div>
                ) : myMessages.map(m => (
                  <div key={m.id} className={`p-4 flex items-start gap-3 ${!m.read ? 'bg-purple-50/50' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!m.read ? 'bg-purple-500' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{m.subject}</div>
                      <div className="text-sm text-gray-600 mt-0.5">{m.body}</div>
                      <div className="text-xs text-gray-400 mt-1">{m.createdAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ASSESSMENTS */}
          {activeTab === 'assessments' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Feedback</h2>
              {myAssessments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">No assessments yet.</div>
              ) : myAssessments.map(a => (
                <div key={a.id} className="bg-white rounded-xl shadow-sm p-5 mb-4">
                  <div className="text-sm text-gray-500 mb-4">Assessment from {a.createdAt}</div>
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {[['Critical Thinking', a.criticalThinking], ['Problem Solving', a.problemSolving], ['Financial Literacy', a.financialLiteracy], ['Work Ethics', a.workEthics], ['Gig Quality', a.gigQuality]].map(([l, v]) => (
                      <div key={l as string} className="text-center bg-purple-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-purple-600">{v}/5</div>
                        <div className="text-xs text-gray-600 mt-1">{l}</div>
                        <div className="text-xs text-gray-400">{scoreLabel(v as number)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm"><strong>Feedback:</strong> {a.feedback}</div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
