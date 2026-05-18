import { BarChart3, Code, Brain, FlaskConical, ArrowRight } from 'lucide-react';

interface Props { setPage: (p: string) => void; }

export default function ProgrammesPage({ setPage }: Props) {
  const programmes = [
    {
      icon: BarChart3, title: 'Data Analysis', color: 'from-cyan-500 to-blue-600',
      desc: 'Training in modern data tools including Excel, Power BI, Python, Stata, and SPSS. Learn to collect, clean, analyze, and visualize data to drive evidence-based decisions.',
      skills: ['Microsoft Excel', 'Power BI', 'Python (Pandas, NumPy)', 'Stata & SPSS', 'Data Visualization', 'Statistical Analysis'],
    },
    {
      icon: Code, title: 'Web and App Development', color: 'from-purple-500 to-indigo-600',
      desc: 'Training in front-end and back-end development, web applications, and mobile technology. Build responsive websites and cross-platform mobile applications.',
      skills: ['HTML, CSS, JavaScript', 'React & Next.js', 'Node.js & Express', 'React Native', 'Databases (SQL, MongoDB)', 'API Development'],
    },
    {
      icon: Brain, title: 'Artificial Intelligence and Machine Learning', color: 'from-pink-500 to-rose-600',
      desc: 'Foundational training in AI, machine learning concepts, and emerging digital technologies. Understand algorithms, neural networks, and real-world AI applications.',
      skills: ['Python for AI', 'Machine Learning Algorithms', 'Deep Learning Basics', 'Natural Language Processing', 'Computer Vision', 'TensorFlow & Scikit-learn'],
    },
    {
      icon: FlaskConical, title: 'Research Translation', color: 'from-green-500 to-emerald-600',
      desc: 'Helping participants convert academic research and technical ideas into real-world applications. Bridge the gap between theory and practice.',
      skills: ['Research Methodology', 'Technical Writing', 'Product Development', 'Innovation Strategy', 'Impact Measurement', 'Grant Writing'],
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0a1628] to-[#0f3460] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">The Emancipation Programme</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Structured learning, mentorship, and freelancing integration for adolescents, young people, and validators designed to build practical digital skills and productive innovation.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {programmes.map((prog, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className={`md:w-1/3 bg-gradient-to-br ${prog.color} p-8 flex flex-col justify-center text-white`}>
                    <prog.icon size={48} className="mb-4" />
                    <h3 className="text-2xl font-bold">{prog.title}</h3>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <p className="text-gray-600 leading-relaxed mb-6">{prog.desc}</p>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Skills You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {prog.skills.map((s, j) => (
                        <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setPage('mentee-enrol')} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center gap-2">
                Enrol as Mentee <ArrowRight size={18} />
              </button>
              <button onClick={() => setPage('mentor-enrol')} className="px-6 py-3 border-2 border-cyan-600 text-cyan-600 font-semibold rounded-xl hover:bg-cyan-50 transition-colors flex items-center gap-2">
                Become a Mentor <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
