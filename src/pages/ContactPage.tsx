import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Handshake } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0a1628] to-[#0f3460] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Reach out to Data Revolution Company® for partnerships, mentorship, enrolment, sponsorship, donations, or general enquiries.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Get In Touch</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail size={20} className="text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-sm text-gray-600">info@datarevolutioncompany.com</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={20} className="text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Phone</div>
                      <div className="text-sm text-gray-600">+2348162023780</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Address</div>
                      <div className="text-sm text-gray-600">Lagos, Nigeria</div>
                    </div>
                  </li>
                </ul>
              </div>



              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Handshake size={20} />
                  <h3 className="font-bold">Partnership Enquiry</h3>
                </div>
                <p className="text-cyan-100 text-sm leading-relaxed">
                  Interested in partnering with Data Revolution Company®? We welcome collaboration with educational institutions, NGOs, corporate organizations, and development agencies.
                </p>
                <p className="text-cyan-200 text-sm mt-3">partnerships@datarevolutioncompany.com</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">Thank you for reaching out. We'll respond within 24-48 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-cyan-600 text-white rounded-xl font-medium">Send Another</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-3">Send Us a Message</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input type="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type *</label>
                      <select required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none">
                        <option value="">Select</option>
                        <option>General Enquiry</option>
                        <option>Partnership</option>
                        <option>Mentorship</option>
                        <option>Sponsorship</option>
                        <option>Donation</option>
                        <option>Technical Support</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea required rows={5} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none resize-none" />
                  </div>
                  <button type="submit" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center gap-2">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
