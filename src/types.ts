export type UserRole = 'admin' | 'mentor' | 'mentee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  avatar?: string;
  phone?: string;
  location?: string;
}

export interface Mentor extends User {
  role: 'mentor';
  profession: string;
  expertise: string;
  experience: number;
  mentorshipArea: string;
  availability: string;
  bio: string;
  skills: string[];
  subscriptionStatus: 'active' | 'expired' | 'pending';
  subscriptionExpiry: string;
  assignedMentees: string[];
}

export interface Mentee extends User {
  role: 'mentee';
  age: number;
  gender: string;
  educationLevel: string;
  digitalInterest: string;
  skillLevel: string;
  guardianName?: string;
  guardianContact?: string;
  reasonForJoining: string;
  assignedMentorId?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: string;
  enrolled: number;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  instructions: string;
  deadline: string;
  assignedTo: string;
  assignedBy: string;
  status: 'assigned' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  submissionLink?: string;
  submissionNote?: string;
  feedback?: string;
  qualityScore?: number;
  paymentValue?: number;
}

export interface WithdrawalRequest {
  id: string;
  menteeId: string;
  amount: number;
  purpose: string;
  explanation: string;
  paymentDetails: string;
  status: 'pending' | 'mentor_approved' | 'mentor_rejected' | 'admin_approved' | 'paid' | 'rejected';
  createdAt: string;
}

export interface BusinessIdea {
  id: string;
  menteeId: string;
  title: string;
  problem: string;
  solution: string;
  beneficiaries: string;
  fundingNeed: number;
  expectedImpact: string;
  status: 'submitted' | 'reviewed' | 'approved' | 'crowdfunding' | 'rejected';
  mentorFeedback?: string;
  amountRaised: number;
}

export interface Meeting {
  id: string;
  mentorId: string;
  menteeId: string;
  date: string;
  time: string;
  topic: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Message {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface Assessment {
  id: string;
  menteeId: string;
  mentorId: string;
  criticalThinking: number;
  problemSolving: number;
  financialLiteracy: number;
  workEthics: number;
  gigQuality: number;
  feedback: string;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  menteeId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  createdAt: string;
}
