import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertProfessionalSchema, insertOrganizationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get additional profile data based on user type
      let profileData = null;
      if (user.userType === 'professional') {
        profileData = await storage.getProfessional(userId);
      } else if (user.userType === 'organization') {
        profileData = await storage.getOrganization(userId);
      }

      res.json({ ...user, profileData });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post('/api/auth/set-user-type', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { userType } = req.body;
      
      if (!userType || !['professional', 'organization'].includes(userType)) {
        return res.status(400).json({ message: "Invalid user type" });
      }
      
      const user = await storage.setUserType(userId, userType);
      res.json(user);
    } catch (error) {
      console.error("Error setting user type:", error);
      res.status(500).json({ message: "Failed to set user type" });
    }
  });

  // Professional routes
  app.post('/api/professionals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const professionalData = insertProfessionalSchema.parse({
        ...req.body,
        userId,
      });

      const professional = await storage.createProfessional(professionalData);
      
      // Update user type
      await storage.upsertUser({
        id: userId,
        userType: 'professional',
        email: req.user.claims.email,
        firstName: req.user.claims.first_name,
        lastName: req.user.claims.last_name,
        profileImageUrl: req.user.claims.profile_image_url,
      });

      res.json(professional);
    } catch (error) {
      console.error("Error creating professional:", error);
      res.status(400).json({ message: "Failed to create professional profile" });
    }
  });

  app.put('/api/professionals/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const professionalId = parseInt(req.params.id);
      
      // Verify ownership
      const existing = await storage.getProfessionalById(professionalId);
      if (!existing || existing.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const updates = insertProfessionalSchema.partial().parse(req.body);
      const professional = await storage.updateProfessional(professionalId, updates);
      
      res.json(professional);
    } catch (error) {
      console.error("Error updating professional:", error);
      res.status(400).json({ message: "Failed to update professional profile" });
    }
  });

  app.get('/api/professionals/search', isAuthenticated, async (req: any, res) => {
    try {
      const { specialty, language, availability, region } = req.query;
      
      const professionals = await storage.searchProfessionals({
        specialty: specialty as string,
        language: language as string,
        availability: availability as string,
        region: region as string,
      });

      res.json(professionals);
    } catch (error) {
      console.error("Error searching professionals:", error);
      res.status(500).json({ message: "Failed to search professionals" });
    }
  });

  app.get('/api/professionals/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const professional = await storage.getProfessional(userId);
      
      if (!professional) {
        return res.status(404).json({ message: "Professional profile not found" });
      }

      res.json(professional);
    } catch (error) {
      console.error("Error fetching professional:", error);
      res.status(500).json({ message: "Failed to fetch professional profile" });
    }
  });

  // Get individual professional by ID
  app.get('/api/professionals/:id', async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const professional = await storage.getProfessionalById(professionalId);
      
      if (!professional) {
        return res.status(404).json({ message: "Professional not found" });
      }
      
      res.json(professional);
    } catch (error) {
      console.error("Error fetching professional:", error);
      res.status(500).json({ message: "Failed to fetch professional" });
    }
  });

  // Organization routes
  app.post('/api/organizations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const organizationData = insertOrganizationSchema.parse({
        ...req.body,
        userId,
      });

      const organization = await storage.createOrganization(organizationData);
      
      // Update user type
      await storage.upsertUser({
        id: userId,
        userType: 'organization',
        email: req.user.claims.email,
        firstName: req.user.claims.first_name,
        lastName: req.user.claims.last_name,
        profileImageUrl: req.user.claims.profile_image_url,
      });

      res.json(organization);
    } catch (error) {
      console.error("Error creating organization:", error);
      res.status(400).json({ message: "Failed to create organization profile" });
    }
  });

  app.get('/api/organizations/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const organization = await storage.getOrganization(userId);
      
      if (!organization) {
        return res.status(404).json({ message: "Organization profile not found" });
      }

      res.json(organization);
    } catch (error) {
      console.error("Error fetching organization:", error);
      res.status(500).json({ message: "Failed to fetch organization profile" });
    }
  });

  // Message routes
  app.post('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const senderId = req.user.claims.sub;
      const messageData = insertMessageSchema.parse({
        ...req.body,
        senderId,
      });

      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(400).json({ message: "Failed to send message" });
    }
  });

  app.get('/api/messages/conversations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const conversations = await storage.getConversations(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  app.get('/api/messages/:userId', isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user.claims.sub;
      const otherUserId = req.params.userId;
      
      const messages = await storage.getMessages(currentUserId, otherUserId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.put('/api/messages/:id/read', isAuthenticated, async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.id);
      await storage.markMessageAsRead(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  // Training routes
  app.get('/api/training/courses', async (req, res) => {
    try {
      const courses = await storage.getTrainingCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching training courses:", error);
      res.status(500).json({ message: "Failed to fetch training courses" });
    }
  });

  app.get('/api/training/featured', async (req, res) => {
    try {
      const courses = await storage.getFeaturedCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching featured courses:", error);
      res.status(500).json({ message: "Failed to fetch featured courses" });
    }
  });

  app.post('/api/training/enroll/:courseId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const courseId = parseInt(req.params.courseId);
      
      const enrollment = await storage.enrollInCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      res.status(400).json({ message: "Failed to enroll in course" });
    }
  });

  app.get('/api/training/enrollments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const enrollments = await storage.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
