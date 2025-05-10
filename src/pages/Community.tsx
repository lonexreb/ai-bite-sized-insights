
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Users, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const upcomingEvents = [
    {
      title: "Transformer Architecture Deep Dive",
      date: "May 15, 2025",
      time: "3:00 PM - 4:30 PM EST",
      host: "Dr. Jane Smith",
      attendees: 45,
    },
    {
      title: "Study Group: Linear Algebra for ML",
      date: "May 18, 2025",
      time: "2:00 PM - 3:30 PM EST",
      host: "Alex Johnson",
      attendees: 22,
    },
    {
      title: "Q&A Session: Latest AI Research Papers",
      date: "May 21, 2025",
      time: "11:00 AM - 12:30 PM EST",
      host: "Prof. Michael Chen",
      attendees: 67,
    },
  ];

  const studyGroups = [
    {
      name: "Reinforcement Learning",
      members: 34,
      description: "Weekly discussions on RL algorithms and implementations.",
      activity: "Active",
    },
    {
      name: "Neural Networks from Scratch",
      members: 27,
      description: "Building neural networks together with no frameworks.",
      activity: "Very Active",
    },
    {
      name: "Research Paper Discussion",
      members: 52,
      description: "Bi-weekly breakdown of the latest AI research papers.",
      activity: "Active",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-12 md:py-16 bg-brand-light-purple">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Community Learning</h1>
              <p className="text-xl mb-8">
                Connect with like-minded AI enthusiasts, join study groups, and attend virtual events.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg">Join Community</Button>
                <Button variant="outline" size="lg">Browse Events</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <Tabs defaultValue="events">
            <div className="mb-8 border-b">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="events" className="text-lg py-4">
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger value="groups" className="text-lg py-4">
                  Study Groups
                </TabsTrigger>
                <TabsTrigger value="discussions" className="text-lg py-4">
                  Discussions
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="events">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="rounded-full bg-brand-light-purple p-2">
                          <Video className="h-5 w-5 text-brand-purple" />
                        </div>
                        <span className="text-xs bg-brand-soft-green text-green-700 px-2 py-1 rounded-full">
                          Upcoming
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex gap-2 items-center">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {event.attendees} attending · Hosted by {event.host}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full">Register</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline">View All Events</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="groups">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {studyGroups.map((group, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="rounded-full bg-brand-light-purple p-2">
                          <Users className="h-5 w-5 text-brand-purple" />
                        </div>
                        <span className="text-xs bg-brand-soft-yellow text-amber-700 px-2 py-1 rounded-full">
                          {group.activity}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm">{group.members} members</span>
                      </div>
                      <Button className="w-full">Join Group</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline">View All Groups</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <div className="rounded-full bg-gray-100 h-10 w-10 flex items-center justify-center text-lg font-medium">
                          JP
                        </div>
                        <div>
                          <p className="font-medium">John Pereira</p>
                          <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                        </div>
                      </div>
                      <span className="text-xs bg-brand-light-purple text-brand-purple px-2 py-1 rounded-full">
                        Hot Topic
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Resources for understanding attention mechanisms?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      I'm trying to get a better understanding of attention mechanisms in transformer models. 
                      Any recommended resources or explanations that made it click for you?
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <span className="text-sm flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> 23 replies
                        </span>
                      </div>
                      <Button variant="outline" size="sm">View Discussion</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <div className="rounded-full bg-gray-100 h-10 w-10 flex items-center justify-center text-lg font-medium">
                          AS
                        </div>
                        <div>
                          <p className="font-medium">Annie Smith</p>
                          <p className="text-xs text-muted-foreground">Posted 4 days ago</p>
                        </div>
                      </div>
                      <span className="text-xs bg-brand-soft-green text-green-700 px-2 py-1 rounded-full">
                        Solved
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Implementing batch normalization correctly</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      I'm getting inconsistent results when implementing batch normalization in my neural network. 
                      Has anyone else encountered this issue?
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <span className="text-sm flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> 18 replies
                        </span>
                      </div>
                      <Button variant="outline" size="sm">View Discussion</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline">View All Discussions</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
