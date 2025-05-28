import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  userType: varchar("user_type").notNull().default("professional"), // "professional" or "organization"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Professional profiles
export const professionals = pgTable("professionals", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  specialties: text("specialties").array(),
  certifications: text("certifications").array(),
  languages: text("languages").array(),
  licenseNumber: varchar("license_number"),
  licenseCountry: varchar("license_country"),
  licenseVerified: boolean("license_verified").default(false),
  experience: integer("experience"), // years
  availabilityStatus: varchar("availability_status").notNull().default("pending_documentation"), // "available", "not_available", "pending_documentation", "deployment_in_progress"
  availableFrom: timestamp("available_from"),
  preferredDuration: varchar("preferred_duration"),
  regionalExperience: text("regional_experience").array(),
  bio: text("bio"),
  deploymentHistory: jsonb("deployment_history"), // Array of deployment objects
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Organizations
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  type: varchar("type"), // "ngo", "government", "hospital", "academic"
  description: text("description"),
  website: varchar("website"),
  verified: boolean("verified").default(false),
  contactPerson: varchar("contact_person"),
  contactEmail: varchar("contact_email"),
  country: varchar("country"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Messages between professionals and organizations
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  receiverId: varchar("receiver_id").notNull().references(() => users.id),
  subject: varchar("subject"),
  content: text("content").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Document uploads for verification
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  professionalId: integer("professional_id").notNull().references(() => professionals.id),
  type: varchar("type").notNull(), // "license", "certification", "reference"
  fileName: varchar("file_name").notNull(),
  filePath: varchar("file_path").notNull(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Training courses
export const trainingCourses = pgTable("training_courses", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  duration: integer("duration"), // hours
  category: varchar("category"),
  provider: varchar("provider"),
  url: varchar("url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// User course enrollments
export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => trainingCourses.id),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  professional: one(professionals, {
    fields: [users.id],
    references: [professionals.userId],
  }),
  organization: one(organizations, {
    fields: [users.id],
    references: [organizations.userId],
  }),
  sentMessages: many(messages, { relationName: "sender" }),
  receivedMessages: many(messages, { relationName: "receiver" }),
  courseEnrollments: many(courseEnrollments),
}));

export const professionalsRelations = relations(professionals, ({ one, many }) => ({
  user: one(users, {
    fields: [professionals.userId],
    references: [users.id],
  }),
  documents: many(documents),
}));

export const organizationsRelations = relations(organizations, ({ one }) => ({
  user: one(users, {
    fields: [organizations.userId],
    references: [users.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sender",
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receiver",
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  professional: one(professionals, {
    fields: [documents.professionalId],
    references: [professionals.id],
  }),
}));

export const courseEnrollmentsRelations = relations(courseEnrollments, ({ one }) => ({
  user: one(users, {
    fields: [courseEnrollments.userId],
    references: [users.id],
  }),
  course: one(trainingCourses, {
    fields: [courseEnrollments.courseId],
    references: [trainingCourses.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users);
export const insertProfessionalSchema = createInsertSchema(professionals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertOrganizationSchema = createInsertSchema(organizations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});
export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Professional = typeof professionals.$inferSelect;
export type InsertProfessional = z.infer<typeof insertProfessionalSchema>;
export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type TrainingCourse = typeof trainingCourses.$inferSelect;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
