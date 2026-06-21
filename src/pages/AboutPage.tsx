import { Eye, Target, Handshake, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#0a1628] to-[#0f3460] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-lg text-gray-300">Learn about our mission, vision, and the team driving digital transformation in Nigeria.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Organization</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Data Revolution Consults Ltd® was established in 2025 as a transformative platform focused on bridging the gap between academic research, industrial applications, and societal development. The organization seeks to redeem intellectual, moral, and economic capital by nurturing adolescents and young professionals into productive innovators in technology, research, and digital enterprise.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The company is strategically partnering with NGOs of adolescent-friendly niches to leverage on the experience in youth rehabilitation and empowerment. Together, we aim to create a structured pathway for digital skills acquisition, mentorship, ethical reorientation, and income-generating opportunities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-cyan-600" size={32} />
                <div>
                  <h3 className="font-bold text-gray-900">Dr. Samson Oluwayomi</h3>
                  <p className="text-sm text-gray-500">Founder & Managing Director</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dr. Samson Oluwayomi founded Data Revolution Consults Ltd® with a vision to create a leading African model for youth digital empowerment. His work combines academic excellence with practical community impact, bridging the gap between research and real-world application.
              </p>
              <div className="mt-4">
                <a href="https://www.sameinstein.tech/" target="_blank" rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded-lg transition-colors">
                  Click to visit his personal site.
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-cyan-200 text-sm text-gray-500">
                <p>RC No.: 8339270 | Year Established: 2025</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={28} />
                <h3 className="text-xl font-bold">Vision Statement</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
                To become a leading African model for adolescent-centred digital empowerment, ethical innovation, research translation, and globally relevant technology-driven workforce development.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-teal-700 text-white rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target size={28} />
                <h3 className="text-xl font-bold">Mission Statement</h3>
              </div>
              <p className="text-cyan-100 leading-relaxed">
                To equip adolescents, young professionals, and community-based learners with practical digital skills, mentorship, financial literacy, problem-solving capacity, and access to legitimate income opportunities through technology, freelancing, research translation, and innovation.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Handshake size={28} className="text-cyan-600" />
              <h3 className="text-xl font-bold text-gray-900">Strategic Partnerships</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Data Revolution Consults Ltd® partners with Adolfric NGO and other adolescent-friendly organizations to leverage their experience in youth rehabilitation and empowerment. Together, we create structured pathways for digital skills acquisition, mentorship, ethical reorientation, and income-generating opportunities for young Nigerians.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
