import { useState } from 'react';
import { useApp } from '../store';
import { Heart, Target, CheckCircle, X } from 'lucide-react';

export default function CrowdfundingPage() {
  const { state } = useApp();
  const [donateModal, setDonateModal] = useState<string | null>(null);
  const [donated, setDonated] = useState(false);

  const approvedIdeas = state.businessIdeas.filter(b => b.status === 'crowdfunding');

  const getMenteeName = (id: string) => state.mentees.find(m => m.id === id)?.name || 'Unknown';

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0a1628] to-[#0f3460] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Support Mentee-Led Business Ideas</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            These business ideas have been developed by mentees, reviewed by mentors, and approved for community crowdfunding. Your support can make a real difference.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {approvedIdeas.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Campaigns</h3>
              <p className="text-gray-500">Check back soon for mentee business ideas open for crowdfunding support.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedIdeas.map(idea => {
                const progress = Math.min((idea.amountRaised / idea.fundingNeed) * 100, 100);
                return (
                  <div key={idea.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{idea.title}</h3>
                      <p className="text-cyan-200 text-sm">by {getMenteeName(idea.menteeId)}</p>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Problem</h4>
                        <p className="text-sm text-gray-600">{idea.problem}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Solution</h4>
                        <p className="text-sm text-gray-600">{idea.solution}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Expected Impact</h4>
                        <p className="text-sm text-gray-600">{idea.expectedImpact}</p>
                      </div>

                      <div className="flex items-center gap-2 mb-2 text-sm">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-green-700 font-medium">Mentor Recommended</span>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">₦{idea.amountRaised.toLocaleString()} raised</span>
                          <span className="font-semibold">₦{idea.fundingNeed.toLocaleString()} goal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{progress.toFixed(0)}% funded</p>
                      </div>

                      <button onClick={() => { setDonateModal(idea.id); setDonated(false); }}
                        className="w-full mt-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2">
                        <Heart size={16} /> Donate / Support
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {donateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            {donated ? (
              <div className="text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">Your donation has been recorded. Thank you for supporting innovation!</p>
                <button onClick={() => setDonateModal(null)} className="px-6 py-2 bg-cyan-600 text-white rounded-xl font-medium">Close</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Make a Donation</h3>
                  <button onClick={() => setDonateModal(null)}><X size={20} className="text-gray-400" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                    <input type="number" placeholder="5000" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input placeholder="John Doe" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Target size={14} className="text-green-500" />
                    All funds are tracked transparently via Paystack
                  </div>
                  <button onClick={() => setDonated(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all">
                    Donate via Paystack
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
