import { ArrowRight, Users, BookOpen, Lightbulb, TrendingUp, Shield, Globe } from 'lucide-react';

interface HomePageProps {
  setPage: (page: string) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0f3460] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Data Revolution Company® — Est. 2025
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Empowering the Next Generation of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Digital Innovators
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">
              A transformative initiative designed to bridge the gap between academic research, industrial application, and societal development by training, mentoring, and empowering adolescents and young professionals in data analytics, software engineering, artificial intelligence, and research translation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setPage('mentor-enrol')} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25">
                Become a Mentor <ArrowRight size={18} />
              </button>
              <button onClick={() => setPage('mentee-enrol')} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all border border-white/20">
                Enrol as a Mentee
              </button>
              <button onClick={() => setPage('programmes')} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all border border-white/20">
                Explore Programmes
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Brief Introduction */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Data Revolution Company® is a Nigerian-based organization devoted to promoting digital literacy, data-driven research, and societal transformation through education, mentorship, and innovation. We provide structured learning opportunities in data analysis, web and app development, artificial intelligence, machine learning, research translation, and freelancing integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Mentorship', desc: 'Connect with experienced mentors who guide you through structured learning and career development.', color: 'from-cyan-500 to-blue-600' },
              { icon: BookOpen, title: 'Structured Learning', desc: 'Access courses in data analysis, web development, AI/ML, and research translation.', color: 'from-blue-500 to-indigo-600' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Pitch business ideas, receive mentorship feedback, and access crowdfunding support.', color: 'from-purple-500 to-pink-600' },
              { icon: TrendingUp, title: 'Income Opportunities', desc: 'Complete practical gigs, earn through your wallet, and develop freelancing skills.', color: 'from-green-500 to-emerald-600' },
              { icon: Shield, title: 'Ethical Development', desc: 'Build financial literacy, critical thinking, and ethical reasoning through structured assessment.', color: 'from-orange-500 to-red-600' },
              { icon: Globe, title: 'Community Impact', desc: 'Contribute to Nigeria\'s digital economy and become part of a global knowledge workforce.', color: 'from-teal-500 to-cyan-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Future?</h2>
          <p className="text-lg text-cyan-100 mb-8">Take the first step towards building your digital career through mentorship, practical skills, and real-world opportunities.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage('mentee-enrol')} className="px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button onClick={() => setPage('crowdfunding')} className="px-8 py-3 bg-white/20 backdrop-blur-sm font-bold rounded-xl hover:bg-white/30 transition-colors border border-white/30">
              Support a Business Idea
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
