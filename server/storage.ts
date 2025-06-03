import {
  users,
  professionals,
  organizations,
  messages,
  documents,
  trainingCourses,
  courseEnrollments,
  type User,
  type UpsertUser,
  type Professional,
  type InsertProfessional,
  type Organization,
  type InsertOrganization,
  type Message,
  type InsertMessage,
  type Document,
  type InsertDocument,
  type TrainingCourse,
  type CourseEnrollment,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, ilike, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  setUserType(id: string, userType: string): Promise<User>;
  
  // Professional operations
  createProfessional(professional: InsertProfessional): Promise<Professional>;
  updateProfessional(id: number, professional: Partial<InsertProfessional>): Promise<Professional>;
  getProfessional(userId: string): Promise<Professional | undefined>;
  getProfessionalById(id: number): Promise<Professional | undefined>;
  searchProfessionals(filters: {
    specialty?: string;
    language?: string;
    availability?: string;
    region?: string;
  }): Promise<Professional[]>;
  
  // Organization operations
  createOrganization(organization: InsertOrganization): Promise<Organization>;
  updateOrganization(id: number, organization: Partial<InsertOrganization>): Promise<Organization>;
  getOrganization(userId: string): Promise<Organization | undefined>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getConversations(userId: string): Promise<Message[]>;
  getMessages(senderId: string, receiverId: string): Promise<Message[]>;
  markMessageAsRead(messageId: number): Promise<void>;
  
  // Document operations
  createDocument(document: InsertDocument): Promise<Document>;
  getDocumentsByProfessional(professionalId: number): Promise<Document[]>;
  updateDocumentVerification(documentId: number, verified: boolean): Promise<Document>;
  
  // Training operations
  getTrainingCourses(): Promise<TrainingCourse[]>;
  getFeaturedCourses(): Promise<TrainingCourse[]>;
  enrollInCourse(userId: string, courseId: number): Promise<CourseEnrollment>;
  getUserEnrollments(userId: string): Promise<CourseEnrollment[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async setUserType(id: string, userType: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        userType: userType as "professional" | "organization",
        updatedAt: new Date() 
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Professional operations
  async createProfessional(professional: InsertProfessional): Promise<Professional> {
    const [result] = await db
      .insert(professionals)
      .values(professional)
      .returning();
    return result;
  }

  async updateProfessional(id: number, professional: Partial<InsertProfessional>): Promise<Professional> {
    const [result] = await db
      .update(professionals)
      .set({ ...professional, updatedAt: new Date() })
      .where(eq(professionals.id, id))
      .returning();
    return result;
  }

  async getProfessional(userId: string): Promise<Professional | undefined> {
    const [professional] = await db
      .select()
      .from(professionals)
      .where(eq(professionals.userId, userId));
    return professional;
  }

  async getProfessionalById(id: number): Promise<Professional | undefined> {
    const [result] = await db
      .select({
        id: professionals.id,
        userId: professionals.userId,
        specialties: professionals.specialties,
        languages: professionals.languages,
        certifications: professionals.certifications,
        experience: professionals.experience,
        availabilityStatus: professionals.availabilityStatus,
        availableFrom: professionals.availableFrom,
        preferredDuration: professionals.preferredDuration,
        licenseVerified: professionals.licenseVerified,
        bio: professionals.bio,
        createdAt: professionals.createdAt,
        updatedAt: professionals.updatedAt,
        user: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
        },
      })
      .from(professionals)
      .leftJoin(users, eq(professionals.userId, users.id))
      .where(eq(professionals.id, id));
    
    return result as Professional & { user: any };
  }

  async searchProfessionals(filters: {
    specialty?: string;
    language?: string;
    availability?: string;
    region?: string;
  }): Promise<Professional[]> {
    let query = db.select().from(professionals);
    
    const conditions = [];
    
    if (filters.specialty) {
      conditions.push(ilike(professionals.specialties, `%${filters.specialty}%`));
    }
    
    if (filters.language) {
      conditions.push(ilike(professionals.languages, `%${filters.language}%`));
    }
    
    if (filters.availability) {
      conditions.push(eq(professionals.availabilityStatus, filters.availability));
    }
    
    if (filters.region) {
      conditions.push(ilike(professionals.regionalExperience, `%${filters.region}%`));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query.orderBy(desc(professionals.updatedAt));
  }

  // Organization operations
  async createOrganization(organization: InsertOrganization): Promise<Organization> {
    const [result] = await db
      .insert(organizations)
      .values(organization)
      .returning();
    return result;
  }

  async updateOrganization(id: number, organization: Partial<InsertOrganization>): Promise<Organization> {
    const [result] = await db
      .update(organizations)
      .set({ ...organization, updatedAt: new Date() })
      .where(eq(organizations.id, id))
      .returning();
    return result;
  }

  async getOrganization(userId: string): Promise<Organization | undefined> {
    const [organization] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.userId, userId));
    return organization;
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [result] = await db
      .insert(messages)
      .values(message)
      .returning();
    return result;
  }

  async getConversations(userId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(or(eq(messages.senderId, userId), eq(messages.receiverId, userId)))
      .orderBy(desc(messages.createdAt));
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        or(
          and(eq(messages.senderId, senderId), eq(messages.receiverId, receiverId)),
          and(eq(messages.senderId, receiverId), eq(messages.receiverId, senderId))
        )
      )
      .orderBy(asc(messages.createdAt));
  }

  async markMessageAsRead(messageId: number): Promise<void> {
    await db
      .update(messages)
      .set({ read: true })
      .where(eq(messages.id, messageId));
  }

  // Document operations
  async createDocument(document: InsertDocument): Promise<Document> {
    const [result] = await db
      .insert(documents)
      .values(document)
      .returning();
    return result;
  }

  async getDocumentsByProfessional(professionalId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.professionalId, professionalId))
      .orderBy(desc(documents.createdAt));
  }

  async updateDocumentVerification(documentId: number, verified: boolean): Promise<Document> {
    const [result] = await db
      .update(documents)
      .set({ verified })
      .where(eq(documents.id, documentId))
      .returning();
    return result;
  }

  // Training operations
  async getTrainingCourses(): Promise<TrainingCourse[]> {
    return await db
      .select()
      .from(trainingCourses)
      .orderBy(desc(trainingCourses.featured), asc(trainingCourses.title));
  }

  async getFeaturedCourses(): Promise<TrainingCourse[]> {
    return await db
      .select()
      .from(trainingCourses)
      .where(eq(trainingCourses.featured, true))
      .orderBy(asc(trainingCourses.title));
  }

  async enrollInCourse(userId: string, courseId: number): Promise<CourseEnrollment> {
    const [result] = await db
      .insert(courseEnrollments)
      .values({ userId, courseId })
      .returning();
    return result;
  }

  async getUserEnrollments(userId: string): Promise<CourseEnrollment[]> {
    return await db
      .select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.userId, userId))
      .orderBy(desc(courseEnrollments.enrolledAt));
  }
}

export const storage = new DatabaseStorage();
