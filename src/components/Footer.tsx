import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setPage: (page: string) => void;
}

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer className="bg-[#0a1628] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="DRC Logo" className="h-16 w-16 rounded-full object-cover logo-spin" />
              <div>
                <h3 className="font-bold text-white">Data Revolution</h3>
                <p className="text-xs text-cyan-400">Consults Ltd®</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering adolescents and young professionals through data, technology, mentorship, and innovation.
            </p>
            <p className="text-xs mt-3 text-gray-500">RC No.: 8339270 | Est. 2025</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['home', 'Home'], ['about', 'About Us'], ['programmes', 'Programmes'], ['crowdfunding', 'Crowdfunding'], ['contact', 'Contact']].map(([k, l]) => (
                <li key={k}><button onClick={() => setPage(k)} className="hover:text-cyan-400 transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              {[['mentor-enrol', 'Become a Mentor'], ['mentee-enrol', 'Enrol as Mentee'], ['subscription', 'Mentor Plan'], ['crowdfunding', 'Support an Idea']].map(([k, l]) => (
                <li key={k}><button onClick={() => setPage(k)} className="hover:text-cyan-400 transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 text-cyan-400 shrink-0" /> info@datarevolutionconsults.com</li>
              <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 text-cyan-400 shrink-0" /> +2348162023780</li>
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-cyan-400 shrink-0" /> Adetayo Sobowale Street Flat 2 O&A Road ikenne Sagamu Ogun State, Nigeria.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Data Revolution Consults Ltd®. All rights reserved. | Designed by <a href="https://www.sameinstein.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline transition-colors">Sameinstein ®</a></p>
        </div>
      </div>
    </footer>
  );
}
