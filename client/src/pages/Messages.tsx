import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Search, Shield } from "lucide-react";
import { format } from "date-fns";

export default function Messages() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: conversations = [] } = useQuery({
    queryKey: ["/api/messages/conversations"],
    enabled: !!user,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/messages", selectedConversation],
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data: { receiverId: string; subject?: string; content: string }) =>
      apiRequest("POST", "/api/messages", data),
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/messages", selectedConversation] });
      queryClient.invalidateQueries({ queryKey: ["/api/messages/conversations"] });
    },
    onError: () => {
      toast({ title: "Failed to send message", variant: "destructive" });
    },
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      sendMessageMutation.mutate({
        receiverId: selectedConversation,
        content: newMessage.trim(),
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group conversations by the other participant
  const groupedConversations = conversations.reduce((acc: any[], message: any) => {
    const otherUserId = message.senderId === user?.id ? message.receiverId : message.senderId;
    const existing = acc.find(conv => conv.userId === otherUserId);
    
    if (!existing) {
      acc.push({
        userId: otherUserId,
        lastMessage: message,
        unreadCount: message.senderId !== user?.id && !message.read ? 1 : 0,
      });
    } else if (new Date(message.createdAt) > new Date(existing.lastMessage.createdAt)) {
      existing.lastMessage = message;
      if (message.senderId !== user?.id && !message.read) {
        existing.unreadCount++;
      }
    }
    
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Secure communication with healthcare professionals and organizations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                {groupedConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  groupedConversations
                    .filter(conv => 
                      !searchTerm || 
                      conv.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((conv) => (
                      <div
                        key={conv.userId}
                        className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                          selectedConversation === conv.userId ? 'bg-blue-50 border-primary' : ''
                        }`}
                        onClick={() => setSelectedConversation(conv.userId)}
                      >
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium mr-3">
                            {conv.userId.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900 truncate">
                                User {conv.userId}
                              </p>
                              {conv.unreadCount > 0 && (
                                <Badge variant="default" className="ml-2">
                                  {conv.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conv.lastMessage.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(conv.lastMessage.createdAt), 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium mr-3">
                        {selectedConversation.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">User {selectedConversation}</h3>
                        <p className="text-sm text-gray-600">Healthcare Professional</p>
                      </div>
                    </div>
                    <Shield className="h-5 w-5 text-green-600" title="Verified User" />
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 flex flex-col h-[450px]">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>No messages yet. Start the conversation!</p>
                        </div>
                      ) : (
                        messages.map((message: any) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderId === user?.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {format(new Date(message.createdAt), 'h:mm a')}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || sendMessageMutation.isPending}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
