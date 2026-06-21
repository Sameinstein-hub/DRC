import { useState } from 'react';
import { useApp } from '../store';
import type { Mentor } from '../types';
import {
  LayoutDashboard, BookOpen, Users, MessageSquare, Briefcase, Star, Calendar,
  Lightbulb, ClipboardCheck, CreditCard, ChevronRight, Bell,
  CheckCircle, XCircle, Clock, Plus, X
} from 'lucide-react';

export default function MentorDashboard() {
  const { state, updateGig, addGig, addMeeting, addAssessment, updateBusinessIdea, updateWithdrawal, addMessage, addWalletTransaction } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const mentor = state.mentors.find(m => m.id === state.auth.userId) as Mentor;
  if (!mentor) return <div className="p-8 text-center">Mentor not found</div>;

  const isActive = mentor.subscriptionStatus === 'active';
  const myMentees = state.mentees.filter(m => m.assignedMentorId === mentor.id);
  const myMessages = state.messages.filter(m => m.to === mentor.id);
  const unreadCount = myMessages.filter(m => !m.read).length;
  const myGigs = state.gigs.filter(g => g.assignedBy === mentor.id);
  const pendingGigs = myGigs.filter(g => g.status === 'submitted');
  const myMeetings = state.meetings.filter(m => m.mentorId === mentor.id);
  const myWithdrawals = state.withdrawals.filter(w => myMentees.some(m => m.id === w.menteeId) && w.status === 'pending');
  const myIdeas = state.businessIdeas.filter(b => myMentees.some(m => m.id === b.menteeId));
  const pendingIdeas = myIdeas.filter(b => b.status === 'submitted');

  const tabs = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'mentees', label: 'Mentees', icon: Users },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { key: 'gigs', label: 'Gigs', icon: Briefcase, badge: pendingGigs.length },
    { key: 'assessments', label: 'Assessments', icon: ClipboardCheck },
    { key: 'meetings', label: 'Meetings', icon: Calendar },
    { key: 'ideas', label: 'Business Ideas', icon: Lightbulb, badge: pendingIdeas.length },
    { key: 'withdrawals', label: 'Withdrawals', icon: CreditCard, badge: myWithdrawals.length },
  ];

  const [gigForm, setGigForm] = useState({ title: '', description: '', instructions: '', deadline: '', menteeId: '' });
  const [meetForm, setMeetForm] = useState({ menteeId: '', date: '', time: '', topic: '' });
  const [assessForm, setAssessForm] = useState({ menteeId: '', ct: 3, ps: 3, fl: 3, we: 3, gq: 3, feedback: '' });
  const [showGigForm, setShowGigForm] = useState(false);
  const [showMeetForm, setShowMeetForm] = useState(false);
  const [showAssessForm, setShowAssessForm] = useState(false);

  const scoreLabel = (s: number) => ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][s];

  const getMenteeName = (id: string) => state.mentees.find(m => m.id === id)?.name || 'Unknown';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isActive && (
        <div className="bg-red-500 text-white text-center py-2 text-sm font-medium">
          ⚠ Your Mentor Plan is not active. Complete your one-time ₦50,000 payment to access courses and mentee assignments.
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-[#0a1628] text-white min-h-screen sticky top-20">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
                {mentor.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{mentor.name}</div>
                <div className="text-xs text-gray-400">Mentor</div>
              </div>
            </div>
          </div>
          <nav className="p-2">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${activeTab === t.key ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
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
                className={`flex-1 min-w-[60px] flex flex-col items-center gap-0.5 py-2 text-xs ${activeTab === t.key ? 'text-cyan-600' : 'text-gray-500'}`}>
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
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Mentor Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Subscription', value: isActive ? 'Active' : 'Expired', color: isActive ? 'text-green-600' : 'text-red-600', icon: Star },
                  { label: 'Mentees', value: myMentees.length, color: 'text-blue-600', icon: Users },
                  { label: 'Pending Reviews', value: pendingGigs.length, color: 'text-orange-600', icon: Briefcase },
                  { label: 'Unread Messages', value: unreadCount, color: 'text-purple-600', icon: Bell },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <s.icon size={16} /> {s.label}
                    </div>
                    <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Clock size={18} /> Upcoming Meetings</h3>
                  {myMeetings.filter(m => m.status === 'scheduled').length === 0 ? (
                    <p className="text-sm text-gray-500">No upcoming meetings</p>
                  ) : myMeetings.filter(m => m.status === 'scheduled').map(m => (
                    <div key={m.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">{getMenteeName(m.menteeId).charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{m.topic}</div>
                        <div className="text-xs text-gray-500">{m.date} at {m.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Briefcase size={18} /> Pending Gig Reviews</h3>
                  {pendingGigs.length === 0 ? (
                    <p className="text-sm text-gray-500">No pending reviews</p>
                  ) : pendingGigs.map(g => (
                    <div key={g.id} className="flex items-center gap-3 py-2 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded" onClick={() => setActiveTab('gigs')}>
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">{getMenteeName(g.assignedTo).charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{g.title}</div>
                        <div className="text-xs text-gray-500">by {getMenteeName(g.assignedTo)}</div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COURSES */}
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses</h2>
              {!isActive ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                  <XCircle size={48} className="text-red-400 mx-auto mb-3" />
                  <h3 className="font-bold text-red-800 mb-1">Mentor Plan Required</h3>
                  <p className="text-red-600 text-sm">Complete your one-time ₦50,000 Mentor Plan payment to access courses.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {state.courses.map(c => (
                    <div key={c.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />
                      <div className="p-5">
                        <span className="text-xs font-medium px-2 py-1 bg-cyan-50 text-cyan-700 rounded-full">{c.category}</span>
                        <h3 className="font-bold text-gray-900 mt-2 mb-1">{c.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{c.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{c.duration}</span>
                          <span>{c.level}</span>
                          <span>{c.enrolled} enrolled</span>
                        </div>
                        <button className="w-full mt-4 py-2 bg-cyan-50 text-cyan-700 font-medium rounded-lg hover:bg-cyan-100 transition-colors text-sm">
                          Enrol in Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MENTEES */}
          {activeTab === 'mentees' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assigned Mentees</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {myMentees.map(m => {
                  const assessment = state.assessments.find(a => a.menteeId === m.id && a.mentorId === mentor.id);
                  return (
                    <div key={m.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{m.name}</h3>
                          <p className="text-sm text-gray-500">{m.digitalInterest} · {m.skillLevel}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div><span className="text-gray-500">Age:</span> {m.age}</div>
                        <div><span className="text-gray-500">Location:</span> {m.location}</div>
                        <div><span className="text-gray-500">Education:</span> {m.educationLevel}</div>
                        <div><span className="text-gray-500">Email:</span> <span className="text-xs">{m.email}</span></div>
                      </div>
                      {assessment && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="text-xs font-medium text-gray-700 mb-2">Latest Assessment</div>
                          <div className="grid grid-cols-5 gap-1 text-center text-xs">
                            {[['CT', assessment.criticalThinking], ['PS', assessment.problemSolving], ['FL', assessment.financialLiteracy], ['WE', assessment.workEthics], ['GQ', assessment.gigQuality]].map(([l, v]) => (
                              <div key={l as string}>
                                <div className="font-bold text-cyan-600">{v}/5</div>
                                <div className="text-gray-500">{l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-green-50 text-green-700 font-medium rounded-lg text-sm hover:bg-green-100">Accept</button>
                        <button className="flex-1 py-2 bg-orange-50 text-orange-700 font-medium rounded-lg text-sm hover:bg-orange-100">Reassign</button>
                      </div>
                    </div>
                  );
                })}
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
                  <div key={m.id} className={`p-4 flex items-start gap-3 ${!m.read ? 'bg-cyan-50/50' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!m.read ? 'bg-cyan-500' : 'bg-transparent'}`} />
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

          {/* GIGS */}
          {activeTab === 'gigs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gig Management</h2>
                <button onClick={() => setShowGigForm(true)} className="flex items-center gap-1 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
                  <Plus size={16} /> Assign Gig
                </button>
              </div>

              <div className="space-y-4">
                {myGigs.map(g => (
                  <div key={g.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{g.title}</h3>
                        <p className="text-sm text-gray-500">Assigned to: {getMenteeName(g.assignedTo)} · Due: {g.deadline}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        g.status === 'approved' ? 'bg-green-100 text-green-700' :
                        g.status === 'submitted' ? 'bg-yellow-100 text-yellow-700' :
                        g.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        g.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'}`}>
                        {g.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{g.description}</p>
                    {g.submissionLink && <p className="text-xs text-cyan-600 mb-2">Submission: {g.submissionLink}</p>}
                    {g.submissionNote && <p className="text-xs text-gray-500 mb-3 italic">"{g.submissionNote}"</p>}
                    {g.status === 'submitted' && (
                      <div className="flex gap-2 pt-2 border-t">
                        <button onClick={() => {
                          updateGig(g.id, { status: 'approved', feedback: 'Good work!', qualityScore: 4, paymentValue: 3000 });
                          addWalletTransaction({ id: `wt-${Date.now()}`, menteeId: g.assignedTo, type: 'credit', amount: 3000, description: `Payment for ${g.title}`, createdAt: new Date().toISOString().split('T')[0] });
                          addMessage({ id: `msg-${Date.now()}`, to: g.assignedTo, from: mentor.id, subject: 'Gig Approved!', body: `Your gig "${g.title}" has been approved. ₦3,000 credited to wallet.`, read: false, createdAt: new Date().toISOString().split('T')[0] });
                        }} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button onClick={() => updateGig(g.id, { status: 'rejected', feedback: 'Needs improvement.' })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                    {g.feedback && <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm"><strong>Feedback:</strong> {g.feedback} {g.qualityScore && <span className="text-cyan-600 font-medium">· Score: {g.qualityScore}/5 ({scoreLabel(g.qualityScore)})</span>}</div>}
                  </div>
                ))}
              </div>

              {showGigForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Assign New Gig</h3>
                      <button onClick={() => setShowGigForm(false)}><X size={20} /></button>
                    </div>
                    <div className="space-y-4">
                      <select value={gigForm.menteeId} onChange={e => setGigForm({ ...gigForm, menteeId: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="">Select Mentee</option>
                        {myMentees.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                      <input placeholder="Gig Title" value={gigForm.title} onChange={e => setGigForm({ ...gigForm, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <textarea placeholder="Description" value={gigForm.description} onChange={e => setGigForm({ ...gigForm, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={2} />
                      <textarea placeholder="Instructions" value={gigForm.instructions} onChange={e => setGigForm({ ...gigForm, instructions: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={2} />
                      <input type="date" value={gigForm.deadline} onChange={e => setGigForm({ ...gigForm, deadline: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <button onClick={() => {
                        if (!gigForm.menteeId || !gigForm.title) return;
                        addGig({ id: `g-${Date.now()}`, ...gigForm, assignedTo: gigForm.menteeId, assignedBy: mentor.id, status: 'assigned' });
                        addMessage({ id: `msg-${Date.now()}`, to: gigForm.menteeId, from: mentor.id, subject: 'New Gig Assigned', body: `You have been assigned a new gig: "${gigForm.title}".`, read: false, createdAt: new Date().toISOString().split('T')[0] });
                        setGigForm({ title: '', description: '', instructions: '', deadline: '', menteeId: '' });
                        setShowGigForm(false);
                      }} className="w-full py-2 bg-cyan-600 text-white rounded-lg font-medium text-sm hover:bg-cyan-700">
                        Assign Gig
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ASSESSMENTS */}
          {activeTab === 'assessments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mentee Assessments</h2>
                <button onClick={() => setShowAssessForm(true)} className="flex items-center gap-1 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
                  <Plus size={16} /> New Assessment
                </button>
              </div>

              <div className="space-y-4">
                {state.assessments.filter(a => a.mentorId === mentor.id).map(a => (
                  <div key={a.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">{getMenteeName(a.menteeId).charAt(0)}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{getMenteeName(a.menteeId)}</h3>
                        <p className="text-xs text-gray-500">{a.createdAt}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3 mb-4">
                      {[['Critical Thinking', a.criticalThinking], ['Problem Solving', a.problemSolving], ['Financial Literacy', a.financialLiteracy], ['Work Ethics', a.workEthics], ['Gig Quality', a.gigQuality]].map(([l, v]) => (
                        <div key={l as string} className="text-center bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-cyan-600">{v}/5</div>
                          <div className="text-xs text-gray-500">{l}</div>
                          <div className="text-xs text-gray-400">{scoreLabel(v as number)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm"><strong>Feedback:</strong> {a.feedback}</div>
                  </div>
                ))}
              </div>

              {showAssessForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">New Assessment</h3>
                      <button onClick={() => setShowAssessForm(false)}><X size={20} /></button>
                    </div>
                    <div className="space-y-4">
                      <select value={assessForm.menteeId} onChange={e => setAssessForm({ ...assessForm, menteeId: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="">Select Mentee</option>
                        {myMentees.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                      {[['Critical Thinking', 'ct'], ['Problem Solving', 'ps'], ['Financial Literacy', 'fl'], ['Work Ethics', 'we'], ['Gig Quality', 'gq']].map(([label, key]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{label}: {(assessForm as any)[key]}/5 ({scoreLabel((assessForm as any)[key])})</label>
                          <input type="range" min="1" max="5" value={(assessForm as any)[key]}
                            onChange={e => setAssessForm({ ...assessForm, [key]: parseInt(e.target.value) })}
                            className="w-full" />
                        </div>
                      ))}
                      <textarea placeholder="Written feedback" value={assessForm.feedback} onChange={e => setAssessForm({ ...assessForm, feedback: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={3} />
                      <button onClick={() => {
                        if (!assessForm.menteeId) return;
                        addAssessment({ id: `a-${Date.now()}`, menteeId: assessForm.menteeId, mentorId: mentor.id, criticalThinking: assessForm.ct, problemSolving: assessForm.ps, financialLiteracy: assessForm.fl, workEthics: assessForm.we, gigQuality: assessForm.gq, feedback: assessForm.feedback, createdAt: new Date().toISOString().split('T')[0] });
                        setAssessForm({ menteeId: '', ct: 3, ps: 3, fl: 3, we: 3, gq: 3, feedback: '' });
                        setShowAssessForm(false);
                      }} className="w-full py-2 bg-cyan-600 text-white rounded-lg font-medium text-sm">Submit Assessment</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MEETINGS */}
          {activeTab === 'meetings' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Meetings</h2>
                <button onClick={() => setShowMeetForm(true)} className="flex items-center gap-1 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
                  <Plus size={16} /> Schedule Meeting
                </button>
              </div>

              <div className="space-y-4">
                {myMeetings.map(m => (
                  <div key={m.id} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Calendar size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{m.topic}</h3>
                      <p className="text-sm text-gray-500">With {getMenteeName(m.menteeId)} · {m.date} at {m.time}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${m.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : m.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{m.status}</span>
                  </div>
                ))}
              </div>

              {showMeetForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Schedule Meeting</h3>
                      <button onClick={() => setShowMeetForm(false)}><X size={20} /></button>
                    </div>
                    <div className="space-y-4">
                      <select value={meetForm.menteeId} onChange={e => setMeetForm({ ...meetForm, menteeId: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="">Select Mentee</option>
                        {myMentees.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                      <input type="date" value={meetForm.date} onChange={e => setMeetForm({ ...meetForm, date: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <input type="time" value={meetForm.time} onChange={e => setMeetForm({ ...meetForm, time: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <input placeholder="Meeting Topic" value={meetForm.topic} onChange={e => setMeetForm({ ...meetForm, topic: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <button onClick={() => {
                        if (!meetForm.menteeId || !meetForm.date) return;
                        addMeeting({ id: `m-${Date.now()}`, mentorId: mentor.id, menteeId: meetForm.menteeId, date: meetForm.date, time: meetForm.time, topic: meetForm.topic, status: 'scheduled' });
                        addMessage({ id: `msg-${Date.now()}`, to: meetForm.menteeId, from: mentor.id, subject: 'Meeting Scheduled', body: `A meeting has been scheduled for ${meetForm.date} at ${meetForm.time}: ${meetForm.topic}`, read: false, createdAt: new Date().toISOString().split('T')[0] });
                        setMeetForm({ menteeId: '', date: '', time: '', topic: '' });
                        setShowMeetForm(false);
                      }} className="w-full py-2 bg-cyan-600 text-white rounded-lg font-medium text-sm">Schedule</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BUSINESS IDEAS */}
          {activeTab === 'ideas' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Idea Review</h2>
              <div className="space-y-4">
                {myIdeas.map(b => (
                  <div key={b.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{b.title}</h3>
                        <p className="text-sm text-gray-500">by {getMenteeName(b.menteeId)} · Funding: ₦{b.fundingNeed.toLocaleString()}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        b.status === 'crowdfunding' ? 'bg-green-100 text-green-700' :
                        b.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                        b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
                      <div><strong className="text-gray-700">Problem:</strong> <span className="text-gray-600">{b.problem}</span></div>
                      <div><strong className="text-gray-700">Solution:</strong> <span className="text-gray-600">{b.solution}</span></div>
                      <div><strong className="text-gray-700">Beneficiaries:</strong> <span className="text-gray-600">{b.beneficiaries}</span></div>
                      <div><strong className="text-gray-700">Impact:</strong> <span className="text-gray-600">{b.expectedImpact}</span></div>
                    </div>
                    {b.status === 'submitted' && (
                      <div className="flex gap-2 pt-3 border-t">
                        <button onClick={() => updateBusinessIdea(b.id, { status: 'approved', mentorFeedback: 'Viable idea. Recommended for crowdfunding.' })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                          <CheckCircle size={14} /> Approve & Recommend
                        </button>
                        <button onClick={() => updateBusinessIdea(b.id, { status: 'rejected', mentorFeedback: 'Needs more refinement.' })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                    {b.mentorFeedback && <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm"><strong>Feedback:</strong> {b.mentorFeedback}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WITHDRAWALS */}
          {activeTab === 'withdrawals' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Withdrawal Requests</h2>
              <div className="space-y-4">
                {state.withdrawals.filter(w => myMentees.some(m => m.id === w.menteeId)).map(w => (
                  <div key={w.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">₦{w.amount.toLocaleString()}</h3>
                        <p className="text-sm text-gray-500">by {getMenteeName(w.menteeId)} · {w.createdAt}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        w.status === 'paid' ? 'bg-green-100 text-green-700' :
                        w.status === 'mentor_approved' ? 'bg-blue-100 text-blue-700' :
                        w.status.includes('rejected') ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>{w.status.replace('_', ' ')}</span>
                    </div>
                    <div className="text-sm mb-3">
                      <p><strong>Purpose:</strong> {w.purpose}</p>
                      <p><strong>Explanation:</strong> {w.explanation}</p>
                      <p><strong>Payment:</strong> {w.paymentDetails}</p>
                    </div>
                    {w.status === 'pending' && (
                      <div className="flex gap-2 pt-3 border-t">
                        <button onClick={() => updateWithdrawal(w.id, { status: 'mentor_approved' })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm">
                          <CheckCircle size={14} /> Ratify
                        </button>
                        <button onClick={() => updateWithdrawal(w.id, { status: 'mentor_rejected' })}
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
        </main>
      </div>
    </div>
  );
}
