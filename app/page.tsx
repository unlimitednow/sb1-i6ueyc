"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoIcon, PlusCircle, Layout, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const templates = [
    {
      id: "instagram-story",
      title: "Instagram Story",
      description: "9:16 vertical format perfect for Instagram stories",
      icon: Instagram,
      dimensions: "1080x1920",
    },
    {
      id: "youtube-landscape",
      title: "YouTube Video",
      description: "16:9 landscape format for YouTube content",
      icon: Youtube,
      dimensions: "1920x1080",
    },
    {
      id: "presentation",
      title: "Presentation",
      description: "Professional presentation template with transitions",
      icon: Layout,
      dimensions: "1920x1080",
    },
  ];

  return (
    <main className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Video Editor</h1>
          <p className="text-muted-foreground">Create stunning videos with ease</p>
        </div>
        <Button asChild>
          <Link href="/editor/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <template.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{template.title}</h3>
                    <p className="text-sm text-muted-foreground">{template.dimensions}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <Button asChild className="w-full">
                  <Link href={`/editor/new?template=${template.id}`}>
                    Use Template
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <VideoIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">My Project</h3>
              <p className="text-sm text-muted-foreground">Last edited 2 hours ago</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}