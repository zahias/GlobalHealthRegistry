// Mock data provider for demo dashboards
// This creates realistic data that aligns with promises made on marketing pages

export const mockProfessionalData = {
  user: {
    id: "demo-prof-1",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    profileImageUrl: "/api/placeholder/80/80",
    userType: "professional"
  },
  profileData: {
    specialties: ["Emergency Medicine", "Trauma Surgery"],
    languages: ["English", "French", "Arabic"],
    certifications: ["ATLS", "ACLS", "PALS", "Diploma in Tropical Medicine"],
    experience: 8,
    availabilityStatus: "Available",
    availableFrom: "2024-02-01",
    preferredDuration: "3-6 months",
    licenseVerified: true,
    bio: "Experienced emergency physician with 8+ years in humanitarian medicine. Specialized in trauma care and epidemic response. Previous deployments include Yemen, South Sudan, and Bangladesh refugee camps.",
    onboardingCompleted: true
  },
  applications: [
    {
      id: 1,
      title: "Emergency Physician - Gaza Strip",
      organization: "Médecins Sans Frontières",
      location: "Gaza, Palestine",
      status: "Under Review",
      appliedDate: "2024-01-15",
      urgency: "critical",
      matchScore: 95
    },
    {
      id: 2,
      title: "Trauma Surgeon - Sudan",
      organization: "International Red Cross",
      location: "Khartoum, Sudan",
      status: "Interview Scheduled",
      appliedDate: "2024-01-10",
      urgency: "high",
      matchScore: 88
    }
  ],
  messages: [
    {
      id: 1,
      from: "MSF Recruitment Team",
      subject: "Application Update - Gaza Emergency Position",
      preview: "Thank you for your application. We would like to schedule a preliminary interview...",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "Dr. Ahmed Hassan - IRC",
      subject: "Sudan Deployment - Additional Information",
      preview: "Following your application, we'd like to provide more context about the current situation...",
      timestamp: "1 day ago",
      unread: false
    }
  ]
};

export const mockOrganizationData = {
  user: {
    id: "demo-org-1",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.rodriguez@msf.org",
    profileImageUrl: "/api/placeholder/80/80",
    userType: "organization"
  },
  profileData: {
    organizationName: "Médecins Sans Frontières",
    organizationType: "International NGO",
    focusAreas: ["Emergency Response", "Conflict Zones", "Epidemic Response"],
    operatingRegions: ["Middle East", "Africa", "Asia"],
    established: "1971",
    verified: true,
    onboardingCompleted: true
  },
  activePostings: [
    {
      id: 1,
      title: "Emergency Physician - Gaza Strip",
      location: "Gaza, Palestine",
      urgency: "critical",
      applications: 23,
      posted: "3 days ago",
      status: "Active",
      specialtiesNeeded: ["Emergency Medicine", "Trauma Surgery"]
    },
    {
      id: 2,
      title: "Pediatric Nurse - Bangladesh",
      location: "Cox's Bazar, Bangladesh",
      urgency: "high",
      applications: 15,
      posted: "1 week ago",
      status: "Active",
      specialtiesNeeded: ["Pediatric Nursing", "Public Health"]
    }
  ],
  applications: [
    {
      id: 1,
      professionalName: "Dr. Sarah Johnson",
      position: "Emergency Physician - Gaza Strip",
      experience: "8 years",
      specialties: ["Emergency Medicine", "Trauma Surgery"],
      status: "Under Review",
      matchScore: 95,
      appliedDate: "2024-01-15"
    },
    {
      id: 2,
      professionalName: "Dr. Michael Chen",
      position: "Emergency Physician - Gaza Strip",
      experience: "12 years",
      specialties: ["Emergency Medicine", "Critical Care"],
      status: "Interview Scheduled",
      matchScore: 92,
      appliedDate: "2024-01-12"
    }
  ]
};

export const mockDeploymentOpportunities = [
  {
    id: 1,
    title: "Emergency Physician - Gaza Strip",
    organization: "Médecins Sans Frontières",
    location: "Gaza, Palestine",
    country: "Palestine",
    urgency: "critical",
    duration: "3-6 months",
    startDate: "2024-02-15",
    specialtiesNeeded: ["Emergency Medicine", "Trauma Surgery"],
    description: "Urgent need for emergency physicians to support trauma care in Gaza Strip. Experience in conflict zone medicine essential.",
    requirements: ["MD with emergency medicine specialization", "Minimum 5 years experience", "Previous humanitarian experience preferred"],
    benefits: ["Medical insurance", "Accommodation provided", "Monthly allowance", "Mental health support"]
  },
  {
    id: 2,
    title: "Pediatric Surgeon - Sudan",
    organization: "International Red Cross",
    location: "Khartoum, Sudan",
    country: "Sudan",
    urgency: "high",
    duration: "6-12 months",
    startDate: "2024-03-01",
    specialtiesNeeded: ["Pediatric Surgery", "General Surgery"],
    description: "Support pediatric surgical services in conflict-affected areas of Sudan.",
    requirements: ["Pediatric surgery certification", "Minimum 3 years experience", "French or Arabic language skills preferred"],
    benefits: ["Competitive compensation", "Housing allowance", "R&R flights", "Professional development opportunities"]
  },
  {
    id: 3,
    title: "Mental Health Specialist - Haiti",
    organization: "Partners in Health",
    location: "Port-au-Prince, Haiti",
    country: "Haiti",
    urgency: "medium",
    duration: "6 months",
    startDate: "2024-04-01",
    specialtiesNeeded: ["Psychology", "Psychiatry", "Social Work"],
    description: "Provide mental health support to communities affected by recent crises in Haiti.",
    requirements: ["Psychology/Psychiatry degree", "Experience in trauma counseling", "Spanish or French language skills"],
    benefits: ["Local transportation", "Medical coverage", "Cultural orientation", "Local language training"]
  }
];

export const mockProfessionals = [
  {
    id: 1,
    userId: "prof-1",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    specialties: ["Emergency Medicine", "Trauma Surgery"],
    languages: ["English", "French", "Arabic"],
    certifications: ["ATLS", "ACLS", "PALS"],
    experience: 8,
    availabilityStatus: "Available",
    availableFrom: "2024-02-01",
    preferredDuration: "3-6 months",
    licenseVerified: true,
    bio: "Experienced emergency physician with 8+ years in humanitarian medicine.",
    profileImageUrl: "/api/placeholder/80/80"
  },
  {
    id: 2,
    userId: "prof-2",
    firstName: "Dr. Michael",
    lastName: "Chen",
    specialties: ["Pediatric Surgery", "General Surgery"],
    languages: ["English", "Mandarin", "Spanish"],
    certifications: ["APLS", "ATLS", "Board Certified Pediatric Surgeon"],
    experience: 12,
    availabilityStatus: "Available",
    availableFrom: "2024-03-15",
    preferredDuration: "6-12 months",
    licenseVerified: true,
    bio: "Pediatric surgeon with extensive experience in low-resource settings.",
    profileImageUrl: "/api/placeholder/80/80"
  },
  {
    id: 3,
    userId: "prof-3",
    firstName: "Dr. Amira",
    lastName: "Hassan",
    specialties: ["Mental Health", "Psychology"],
    languages: ["English", "Arabic", "French"],
    certifications: ["Licensed Clinical Psychologist", "Trauma Specialist"],
    experience: 6,
    availabilityStatus: "Deployed",
    availableFrom: "2024-06-01",
    preferredDuration: "3-9 months",
    licenseVerified: true,
    bio: "Clinical psychologist specializing in conflict-related trauma and PTSD.",
    profileImageUrl: "/api/placeholder/80/80"
  }
];