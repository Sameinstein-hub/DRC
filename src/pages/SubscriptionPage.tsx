import { useState } from 'react';
import { Check, Shield, BookOpen, Users, Briefcase, CreditCard, CheckCircle, Infinity } from 'lucide-react';

export default function SubscriptionPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentor Plan Activated!</h2>
          <p className="text-gray-600">Your lifetime mentor plan is now active. You have full access to all platform features — forever.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0a1628] to-[#0f3460] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Mentor Plan</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A one-time lifetime payment that gives mentors full access to the learning platform, mentee assignments, mentorship tools, gig management, and performance review features.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">

          {/* Plan Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-lg mx-auto">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-8 text-white text-center">
              <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-4">
                <Infinity size={15} /> Lifetime Access
              </div>
              <h2 className="text-2xl font-bold mb-2">Mentor Plan</h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold">₦50,000</span>
              </div>
              <p className="text-cyan-100 mt-2 text-sm">One-time payment · Lifetime access · No renewals</p>
            </div>

            <div className="p-8">
              <h3 className="font-semibold text-gray-900 mb-4">Full Access Includes:</h3>
              <ul className="space-y-3">
                {[
                  { icon: BookOpen, text: 'Full course platform access' },
                  { icon: Users, text: 'Mentee assignment and management' },
                  { icon: Briefcase, text: 'Gig assignment and review tools' },
                  { icon: Shield, text: 'Business idea review and crowdfunding recommendation' },
                  { icon: CreditCard, text: 'Mentee assessment and scoring' },
                  { icon: Infinity, text: 'Wallet and withdrawal management' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => setShowPayment(true)}
                className="w-full mt-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all">
                Pay Now via Paystack
              </button>
            </div>
          </div>

          {/* Access Rules */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Access Rules</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { status: 'Active Plan', result: 'Full mentor access to all platform features', color: 'bg-green-50 border-green-200 text-green-800' },
                { status: 'No Plan', result: 'No course access', color: 'bg-red-50 border-red-200 text-red-800' },
                { status: 'No Plan', result: 'No mentee assignments', color: 'bg-red-50 border-red-200 text-red-800' },
                { status: 'Plan Activated', result: 'Full access unlocked immediately', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              ].map((rule, i) => (
                <div key={i} className={`rounded-xl border p-4 ${rule.color}`}>
                  <div className="font-semibold text-sm">{rule.status}</div>
                  <div className="text-sm mt-1 opacity-80">{rule.result}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Modal */}
          {showPayment && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Payment</h3>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Mentor Plan (Lifetime)</span>
                    <span className="font-semibold">₦50,000</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">₦50,000</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-medium">✓ One-time payment — no future charges</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" placeholder="your@email.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                      <input placeholder="MM/YY"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input placeholder="123"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Shield size={14} className="text-green-500" />
                  Secured by Paystack · 256-bit SSL encryption
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setShowPayment(false)}
                    className="flex-1 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => { setShowPayment(false); setPaid(true); }}
                    className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all">
                    Pay ₦50,000
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
