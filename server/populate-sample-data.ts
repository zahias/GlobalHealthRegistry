import { db } from "./db";
import { users, professionals, organizations } from "@shared/schema";

async function populateSampleData() {
  console.log("Populating sample data...");

  // Sample Users (for professionals)
  const sampleUsers = [
    {
      id: "prof_001",
      email: "dr.johnson@email.com",
      firstName: "Sarah",
      lastName: "Johnson",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "prof_002", 
      email: "dr.chen@email.com",
      firstName: "Michael",
      lastName: "Chen",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "prof_003",
      email: "dr.silva@email.com", 
      firstName: "Ana",
      lastName: "Silva",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "prof_004",
      email: "dr.mukamba@email.com",
      firstName: "James", 
      lastName: "Mukamba",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "prof_005",
      email: "dr.rodriguez@email.com",
      firstName: "Maria",
      lastName: "Rodriguez", 
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "prof_006",
      email: "dr.weber@email.com",
      firstName: "Klaus",
      lastName: "Weber",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "prof_007",
      email: "nurse.wang@email.com", 
      firstName: "Lisa",
      lastName: "Wang",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "prof_008",
      email: "dr.sharma@email.com",
      firstName: "Priya", 
      lastName: "Sharma",
      profileImageUrl: "/api/placeholder/64/64"
    },
    // Organization users
    {
      id: "org_001",
      email: "contact@msf.org",
      firstName: "MSF",
      lastName: "Admin",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "org_002", 
      email: "hr@redcross.org",
      firstName: "Red Cross",
      lastName: "Coordinator",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "org_003",
      email: "deploy@who.int",
      firstName: "WHO",
      lastName: "Deployment",
      profileImageUrl: "/api/placeholder/64/64"
    },
    {
      id: "org_004",
      email: "ops@unicef.org", 
      firstName: "UNICEF",
      lastName: "Operations",
      profileImageUrl: "/api/placeholder/64/64"
    }
  ];

  // Insert users
  for (const user of sampleUsers) {
    await db.insert(users).values(user).onConflictDoNothing();
  }

  // Sample Professionals
  const sampleProfessionals = [
    {
      userId: "prof_001",
      specialties: ["Emergency Medicine", "Trauma Surgery"],
      languages: ["English", "Spanish", "French"],
      certifications: ["ACLS", "PALS", "ATLS"],
      experience: 8,
      availabilityStatus: "available",
      availableFrom: new Date("2025-06-01"),
      preferredDuration: "3-6 months", 
      licenseVerified: true,
      bio: "Experienced emergency physician with extensive trauma experience in conflict zones. Previously deployed with MSF in Syria and Yemen."
    },
    {
      userId: "prof_002",
      specialties: ["Mental Health", "Psychology"],
      languages: ["English", "Arabic"],
      certifications: ["Licensed Clinical Psychologist", "PTSD Specialist"],
      experience: 12,
      availabilityStatus: "available",
      availableFrom: new Date("2025-07-15"),
      preferredDuration: "6-12 months",
      licenseVerified: true, 
      bio: "Clinical psychologist specializing in trauma and PTSD treatment. Fluent in Arabic with experience working with refugee populations."
    },
    {
      userId: "prof_003",
      specialties: ["Pediatrics", "Neonatology"],
      languages: ["English", "Portuguese"],
      certifications: ["Board Certified Pediatrician", "NRP"],
      experience: 6,
      availabilityStatus: "pending_documentation",
      availableFrom: new Date("2025-08-01"),
      preferredDuration: "3-6 months",
      licenseVerified: false,
      bio: "Pediatrician with focus on neonatal care and childhood malnutrition. Experience in Brazil and Haiti emergency responses."
    },
    {
      userId: "prof_004", 
      specialties: ["Surgery", "Orthopedics"],
      languages: ["English", "French", "Swahili"],
      certifications: ["Board Certified Surgeon", "ATLS"],
      experience: 15,
      availabilityStatus: "available",
      availableFrom: new Date("2025-05-15"), 
      preferredDuration: "12+ months",
      licenseVerified: true,
      bio: "Orthopedic surgeon with 15 years of humanitarian experience. Led surgical teams in Rwanda, DRC, and Sudan."
    },
    {
      userId: "prof_005",
      specialties: ["Public Health", "Epidemiology"],
      languages: ["English", "Spanish"],
      certifications: ["MPH", "Epidemiologist"],
      experience: 10,
      availabilityStatus: "available",
      availableFrom: new Date("2025-06-30"),
      preferredDuration: "6-12 months",
      licenseVerified: true,
      bio: "Public health specialist with expertise in outbreak investigation and disease surveillance. WHO consultant."
    },
    {
      userId: "prof_006",
      specialties: ["Anesthesiology", "Critical Care"],
      languages: ["English", "German"],
      certifications: ["Board Certified Anesthesiologist", "ICU Specialist"],
      experience: 9,
      availabilityStatus: "deployed",
      availableFrom: null,
      preferredDuration: null,
      licenseVerified: true,
      bio: "Anesthesiologist currently deployed with German Red Cross. Available for future missions starting Q4 2025."
    },
    {
      userId: "prof_007",
      specialties: ["Nursing", "Emergency Medicine"],
      languages: ["English", "Mandarin"], 
      certifications: ["RN", "CEN", "CCRN"],
      experience: 7,
      availabilityStatus: "available",
      availableFrom: new Date("2025-07-01"),
      preferredDuration: "3-6 months",
      licenseVerified: true,
      bio: "Emergency room nurse with critical care experience. Bilingual English-Mandarin speaker with Asia deployment experience."
    },
    {
      userId: "prof_008",
      specialties: ["Obstetrics", "Gynecology"],
      languages: ["English", "Hindi", "Urdu"],
      certifications: ["Board Certified OB/GYN", "Emergency Obstetric Care"],
      experience: 11,
      availabilityStatus: "available", 
      availableFrom: new Date("2025-06-15"),
      preferredDuration: "6-12 months",
      licenseVerified: true,
      bio: "OB/GYN specialist with experience in maternal health programs. Previously worked in Afghanistan and Pakistan."
    }
  ];

  // Insert professionals
  for (const professional of sampleProfessionals) {
    await db.insert(professionals).values(professional).onConflictDoNothing();
  }

  // Sample Organizations
  const sampleOrganizations = [
    {
      userId: "org_001",
      name: "Médecins Sans Frontières",
      type: "International NGO",
      description: "International humanitarian medical organization providing emergency medical care to populations in crisis.",
      website: "https://www.msf.org",
      contactPerson: "Dr. Sarah Mitchell",
      contactEmail: "contact@msf.org",
      country: "France",
      verified: true
    },
    {
      userId: "org_002", 
      name: "International Red Cross",
      type: "International NGO",
      description: "Global humanitarian organization providing emergency assistance and disaster relief worldwide.",
      website: "https://www.icrc.org",
      contactPerson: "James Richardson",
      contactEmail: "hr@redcross.org", 
      country: "Switzerland",
      verified: true
    },
    {
      userId: "org_003",
      name: "World Health Organization",
      type: "UN Agency",
      description: "United Nations specialized agency responsible for international public health.",
      website: "https://www.who.int",
      contactPerson: "Dr. Elena Vasquez",
      contactEmail: "deploy@who.int",
      country: "Switzerland", 
      verified: true
    },
    {
      userId: "org_004",
      name: "UNICEF",
      type: "UN Agency", 
      description: "United Nations Children's Fund providing humanitarian aid to children worldwide.",
      website: "https://www.unicef.org",
      contactPerson: "Maria Santos",
      contactEmail: "ops@unicef.org",
      country: "United States",
      verified: true
    }
  ];

  // Insert organizations
  for (const organization of sampleOrganizations) {
    await db.insert(organizations).values(organization).onConflictDoNothing();
  }

  console.log("Sample data populated successfully!");
}

populateSampleData().catch(console.error);