import { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';
import { useApp } from '../store';

export default function MentorEnrolPage() {
  const { addMentor } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phone: '', location: '', profession: '',
    expertise: '', experience: '', mentorshipArea: '', availability: '',
    digitalInterest: '', consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMentor = {
      id: `mentor-${Date.now()}`,
      name: form.fullName,
      email: form.email.toLowerCase().trim(),
      password: form.password,
      role: 'mentor' as const,
      phone: form.phone,
      location: form.location,
      profession: form.profession,
      expertise: form.expertise,
      experience: Number(form.experience) || 0,
      mentorshipArea: form.mentorshipArea,
      availability: form.availability,
      bio: `Experienced specialist in ${form.expertise}. Dedicated to guided growth and community transformation.`,
      skills: [form.expertise],
      subscriptionStatus: 'active' as const,
      subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedMentees: [],
    };
    addMentor(newMentor);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600">Thank you for applying to become a mentor. Our team will review your application and contact you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0a1628] to-[#0f3460] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Become a Mentor / Validator</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join Data Revolution Consults Ltd® as a mentor and help shape the next generation of digital innovators. Participate in structured learning, guide mentees, assign gigs, and contribute to community transformation.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
            <strong>Note:</strong> Mentors are required to complete a one-time lifetime payment of ₦50,000 (Mentor Plan) to access the course platform, receive mentee assignments, participate in mentorship activities, and use all mentor dashboard features.
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Mentor Application Form</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose Password *</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} required
                  placeholder="Minimum 6 characters" minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input name="location" value={form.location} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
                <input name="profession" value={form.profession} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area of Expertise *</label>
                <select name="expertise" value={form.expertise} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                  <option value="">Select</option>
                  <option>Data Analysis</option>
                  <option>Web Development</option>
                  <option>AI/Machine Learning</option>
                  <option>Research Translation</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
                <input name="experience" type="number" value={form.experience} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Mentorship Area *</label>
                <select name="mentorshipArea" value={form.mentorshipArea} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                  <option value="">Select</option>
                  <option>Data Analysis</option>
                  <option>Web and App Development</option>
                  <option>AI and Machine Learning</option>
                  <option>Research Translation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
                <select name="availability" value={form.availability} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                  <option value="">Select</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Digital Skills Interest</label>
                <input name="digitalInterest" value={form.digitalInterest} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV / Profile</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors cursor-pointer">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click or drag file to upload</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input name="consent" type="checkbox" checked={form.consent} onChange={handleChange} required
                className="mt-1 w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500" />
              <label className="text-sm text-gray-600">
                I consent to share my information with Data Revolution Consults Ltd® for the purpose of the mentorship programme. I understand that I will need to complete the one-time ₦50,000 Mentor Plan payment to access full platform features.
              </label>
            </div>

            <button type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all">
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
