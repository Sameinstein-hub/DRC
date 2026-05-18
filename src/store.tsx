import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Mentor, Mentee, Course, Gig, WithdrawalRequest, BusinessIdea, Meeting, Message, Assessment, WalletTransaction, UserRole } from './types';

interface AuthState {
  isLoggedIn: boolean;
  role: UserRole | null;
  userId: string | null;
}

interface AppState {
  auth: AuthState;
  mentors: Mentor[];
  mentees: Mentee[];
  courses: Course[];
  gigs: Gig[];
  withdrawals: WithdrawalRequest[];
  businessIdeas: BusinessIdea[];
  meetings: Meeting[];
  messages: Message[];
  assessments: Assessment[];
  walletTransactions: WalletTransaction[];
}

interface AppContextType {
  state: AppState;
  login: (role: UserRole, userId: string) => void;
  logout: () => void;
  updateState: (partial: Partial<AppState>) => void;
  addGig: (gig: Gig) => void;
  updateGig: (id: string, updates: Partial<Gig>) => void;
  addWithdrawal: (w: WithdrawalRequest) => void;
  updateWithdrawal: (id: string, updates: Partial<WithdrawalRequest>) => void;
  addBusinessIdea: (b: BusinessIdea) => void;
  updateBusinessIdea: (id: string, updates: Partial<BusinessIdea>) => void;
  addMeeting: (m: Meeting) => void;
  addMessage: (m: Message) => void;
  markMessageRead: (id: string) => void;
  addAssessment: (a: Assessment) => void;
  addWalletTransaction: (t: WalletTransaction) => void;
  addMentee: (m: Mentee) => void;
  addMentor: (m: Mentor) => void;
  updateMentor: (id: string, updates: Partial<Mentor>) => void;
  updateMentee: (id: string, updates: Partial<Mentee>) => void;
}

const sampleMentors: Mentor[] = [
  {
    id: 'mentor-1', name: 'Dr. Amina Yusuf', email: 'amina@drc.ng', role: 'mentor',
    phone: '+234 801 234 5678', location: 'Lagos, Nigeria',
    profession: 'Data Scientist', expertise: 'Data Analysis', experience: 8,
    mentorshipArea: 'Data Analysis', availability: 'Weekdays',
    bio: 'Experienced data scientist with a passion for mentoring youth in analytics.',
    skills: ['Python', 'Power BI', 'SQL', 'Machine Learning'],
    subscriptionStatus: 'active', subscriptionExpiry: '2026-12-31',
    assignedMentees: ['mentee-1', 'mentee-2']
  },
  {
    id: 'mentor-2', name: 'Eng. Chidi Okonkwo', email: 'chidi@drc.ng', role: 'mentor',
    phone: '+234 802 345 6789', location: 'Abuja, Nigeria',
    profession: 'Software Engineer', expertise: 'Web Development', experience: 10,
    mentorshipArea: 'Web and App Development', availability: 'Weekends',
    bio: 'Full-stack developer dedicated to training the next generation of coders.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    subscriptionStatus: 'active', subscriptionExpiry: '2026-06-15',
    assignedMentees: ['mentee-3']
  },
];

const sampleMentees: Mentee[] = [
  {
    id: 'mentee-1', name: 'Fatimah Bello', email: 'fatimah@student.ng', role: 'mentee',
    phone: '+234 903 456 7890', location: 'Lagos, Nigeria',
    age: 19, gender: 'Female', educationLevel: 'Undergraduate',
    digitalInterest: 'Data Analysis', skillLevel: 'Beginner',
    guardianName: 'Mrs. Bello', guardianContact: '+234 801 111 2222',
    reasonForJoining: 'I want to learn data analysis to solve real-world problems.',
    assignedMentorId: 'mentor-1'
  },
  {
    id: 'mentee-2', name: 'Emeka Nwosu', email: 'emeka@student.ng', role: 'mentee',
    phone: '+234 904 567 8901', location: 'Enugu, Nigeria',
    age: 22, gender: 'Male', educationLevel: 'Graduate',
    digitalInterest: 'AI/ML', skillLevel: 'Intermediate',
    reasonForJoining: 'Passionate about artificial intelligence and want practical experience.',
    assignedMentorId: 'mentor-1'
  },
  {
    id: 'mentee-3', name: 'Aisha Mohammed', email: 'aisha@student.ng', role: 'mentee',
    phone: '+234 905 678 9012', location: 'Kano, Nigeria',
    age: 17, gender: 'Female', educationLevel: 'Secondary School',
    digitalInterest: 'Web Development', skillLevel: 'Beginner',
    guardianName: 'Mr. Mohammed', guardianContact: '+234 802 333 4444',
    reasonForJoining: 'I want to build websites and mobile apps.',
    assignedMentorId: 'mentor-2'
  },
];

const sampleCourses: Course[] = [
  { id: 'c1', title: 'Introduction to Data Analysis', category: 'Data Analysis', description: 'Learn the fundamentals of data analysis using Excel and Power BI.', duration: '8 weeks', level: 'Beginner', enrolled: 45 },
  { id: 'c2', title: 'Python for Data Science', category: 'Data Analysis', description: 'Master Python programming for data manipulation and visualization.', duration: '12 weeks', level: 'Intermediate', enrolled: 38 },
  { id: 'c3', title: 'Web Development Bootcamp', category: 'Web Development', description: 'Full-stack web development with HTML, CSS, JavaScript, and React.', duration: '16 weeks', level: 'Beginner', enrolled: 62 },
  { id: 'c4', title: 'Machine Learning Fundamentals', category: 'AI/ML', description: 'Introduction to machine learning algorithms and applications.', duration: '10 weeks', level: 'Advanced', enrolled: 28 },
  { id: 'c5', title: 'Research Translation Workshop', category: 'Research', description: 'Convert academic research into practical real-world applications.', duration: '6 weeks', level: 'Intermediate', enrolled: 15 },
  { id: 'c6', title: 'Mobile App Development', category: 'Web Development', description: 'Build cross-platform mobile applications with React Native.', duration: '12 weeks', level: 'Intermediate', enrolled: 33 },
];

const sampleGigs: Gig[] = [
  { id: 'g1', title: 'Sales Dashboard', description: 'Create a sales dashboard using Power BI with sample data.', instructions: 'Use the provided CSV dataset to build an interactive dashboard with at least 5 visualizations.', deadline: '2026-02-15', assignedTo: 'mentee-1', assignedBy: 'mentor-1', status: 'approved', feedback: 'Excellent work! Clean visuals and insightful analysis.', qualityScore: 5, paymentValue: 5000 },
  { id: 'g2', title: 'Data Cleaning Exercise', description: 'Clean and preprocess a messy dataset.', instructions: 'Remove duplicates, handle missing values, and standardize columns.', deadline: '2026-02-28', assignedTo: 'mentee-2', assignedBy: 'mentor-1', status: 'submitted', submissionLink: 'https://github.com/emeka/data-cleaning', submissionNote: 'Completed all cleaning tasks.' },
  { id: 'g3', title: 'Portfolio Website', description: 'Build a personal portfolio website.', instructions: 'Create a responsive portfolio with about, projects, and contact sections.', deadline: '2026-03-10', assignedTo: 'mentee-3', assignedBy: 'mentor-2', status: 'assigned' },
];

const sampleWithdrawals: WithdrawalRequest[] = [
  { id: 'w1', menteeId: 'mentee-1', amount: 3000, purpose: 'Buy data analysis textbook', explanation: 'I need to purchase an advanced analytics textbook for my studies.', paymentDetails: 'Bank: GTBank, Account: 0123456789', status: 'pending', createdAt: '2026-01-20' },
];

const sampleBusinessIdeas: BusinessIdea[] = [
  { id: 'bi1', menteeId: 'mentee-2', title: 'AgriTech Data Platform', problem: 'Small-scale farmers lack access to data-driven insights for crop management.', solution: 'A mobile platform that provides real-time weather, soil, and market data to farmers.', beneficiaries: 'Small-scale farmers in rural Nigeria', fundingNeed: 500000, expectedImpact: 'Improve crop yields by 30% for 1000 farmers in the first year.', status: 'crowdfunding', mentorFeedback: 'Viable and impactful idea. Strong market potential.', amountRaised: 175000 },
  { id: 'bi2', menteeId: 'mentee-1', title: 'EduConnect Tutoring App', problem: 'Students in underserved areas struggle to find quality tutors.', solution: 'An app connecting students with volunteer and affordable tutors.', beneficiaries: 'Secondary school students in underserved communities', fundingNeed: 300000, expectedImpact: 'Provide tutoring access to 5000 students.', status: 'submitted', amountRaised: 0 },
];

const sampleMeetings: Meeting[] = [
  { id: 'm1', mentorId: 'mentor-1', menteeId: 'mentee-1', date: '2026-02-05', time: '10:00 AM', topic: 'Dashboard Review & Feedback Session', status: 'scheduled' },
  { id: 'm2', mentorId: 'mentor-1', menteeId: 'mentee-2', date: '2026-02-07', time: '2:00 PM', topic: 'Data Cleaning Progress Check', status: 'scheduled' },
];

const sampleMessages: Message[] = [
  { id: 'msg1', to: 'mentor-1', from: 'system', subject: 'New Mentee Assigned', body: 'Fatimah Bello has been assigned to you as a mentee.', read: true, createdAt: '2026-01-10' },
  { id: 'msg2', to: 'mentor-1', from: 'mentee-2', subject: 'Gig Submitted', body: 'Emeka has submitted the Data Cleaning Exercise for your review.', read: false, createdAt: '2026-01-25' },
  { id: 'msg3', to: 'mentee-1', from: 'mentor-1', subject: 'Great Work on Dashboard', body: 'Your sales dashboard was excellent. Keep up the great work!', read: false, createdAt: '2026-01-22' },
];

const sampleAssessments: Assessment[] = [
  { id: 'a1', menteeId: 'mentee-1', mentorId: 'mentor-1', criticalThinking: 4, problemSolving: 5, financialLiteracy: 3, workEthics: 5, gigQuality: 5, feedback: 'Fatimah shows exceptional problem-solving skills and work ethic.', createdAt: '2026-01-28' },
];

const sampleWalletTransactions: WalletTransaction[] = [
  { id: 'wt1', menteeId: 'mentee-1', type: 'credit', amount: 5000, description: 'Payment for Sales Dashboard gig', createdAt: '2026-01-20' },
];

const initialState: AppState = {
  auth: { isLoggedIn: false, role: null, userId: null },
  mentors: sampleMentors,
  mentees: sampleMentees,
  courses: sampleCourses,
  gigs: sampleGigs,
  withdrawals: sampleWithdrawals,
  businessIdeas: sampleBusinessIdeas,
  meetings: sampleMeetings,
  messages: sampleMessages,
  assessments: sampleAssessments,
  walletTransactions: sampleWalletTransactions,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const login = useCallback((role: UserRole, userId: string) => {
    setState(s => ({ ...s, auth: { isLoggedIn: true, role, userId } }));
  }, []);

  const logout = useCallback(() => {
    setState(s => ({ ...s, auth: { isLoggedIn: false, role: null, userId: null } }));
  }, []);

  const updateState = useCallback((partial: Partial<AppState>) => {
    setState(s => ({ ...s, ...partial }));
  }, []);

  const addGig = useCallback((gig: Gig) => {
    setState(s => ({ ...s, gigs: [...s.gigs, gig] }));
  }, []);

  const updateGig = useCallback((id: string, updates: Partial<Gig>) => {
    setState(s => ({ ...s, gigs: s.gigs.map(g => g.id === id ? { ...g, ...updates } : g) }));
  }, []);

  const addWithdrawal = useCallback((w: WithdrawalRequest) => {
    setState(s => ({ ...s, withdrawals: [...s.withdrawals, w] }));
  }, []);

  const updateWithdrawal = useCallback((id: string, updates: Partial<WithdrawalRequest>) => {
    setState(s => ({ ...s, withdrawals: s.withdrawals.map(w => w.id === id ? { ...w, ...updates } : w) }));
  }, []);

  const addBusinessIdea = useCallback((b: BusinessIdea) => {
    setState(s => ({ ...s, businessIdeas: [...s.businessIdeas, b] }));
  }, []);

  const updateBusinessIdea = useCallback((id: string, updates: Partial<BusinessIdea>) => {
    setState(s => ({ ...s, businessIdeas: s.businessIdeas.map(b => b.id === id ? { ...b, ...updates } : b) }));
  }, []);

  const addMeeting = useCallback((m: Meeting) => {
    setState(s => ({ ...s, meetings: [...s.meetings, m] }));
  }, []);

  const addMessage = useCallback((m: Message) => {
    setState(s => ({ ...s, messages: [...s.messages, m] }));
  }, []);

  const markMessageRead = useCallback((id: string) => {
    setState(s => ({ ...s, messages: s.messages.map(m => m.id === id ? { ...m, read: true } : m) }));
  }, []);

  const addAssessment = useCallback((a: Assessment) => {
    setState(s => ({ ...s, assessments: [...s.assessments, a] }));
  }, []);

  const addWalletTransaction = useCallback((t: WalletTransaction) => {
    setState(s => ({ ...s, walletTransactions: [...s.walletTransactions, t] }));
  }, []);

  const addMentee = useCallback((m: Mentee) => {
    setState(s => ({ ...s, mentees: [...s.mentees, m] }));
  }, []);

  const addMentor = useCallback((m: Mentor) => {
    setState(s => ({ ...s, mentors: [...s.mentors, m] }));
  }, []);

  const updateMentor = useCallback((id: string, updates: Partial<Mentor>) => {
    setState(s => ({ ...s, mentors: s.mentors.map(m => m.id === id ? { ...m, ...updates } : m) }));
  }, []);

  const updateMentee = useCallback((id: string, updates: Partial<Mentee>) => {
    setState(s => ({ ...s, mentees: s.mentees.map(m => m.id === id ? { ...m, ...updates } : m) }));
  }, []);

  return (
    <AppContext.Provider value={{
      state, login, logout, updateState, addGig, updateGig, addWithdrawal, updateWithdrawal,
      addBusinessIdea, updateBusinessIdea, addMeeting, addMessage, markMessageRead,
      addAssessment, addWalletTransaction, addMentee, addMentor, updateMentor, updateMentee
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be within AppProvider');
  return ctx;
}
