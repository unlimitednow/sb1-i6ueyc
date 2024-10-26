"use client";

import { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useDropzone } from "react-dropzone";
import { useStore } from "@/lib/store";
import { Play, Pause, SkipBack, Download, Plus } from "lucide-react";

export default function Editor({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { currentProject, setCurrentProject } = useStore();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
      "audio/*": [],
    },
    onDrop: (acceptedFiles) => {
      // Handle file drops
      console.log(acceptedFiles);
    },
  });

  useEffect(() => {
    // Load project from store or initialize new one
    if (!currentProject) {
      // Initialize new project
      setCurrentProject({
        id: params.id,
        title: "Untitled Project",
        template: "custom",
        scenes: [
          {
            id: "scene-1",
            duration: 5,
            elements: [],
          },
        ],
        lastEdited: new Date(),
      });
    }
  }, [params.id, currentProject, setCurrentProject]);

  if (!currentProject) return null;

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">{currentProject.title}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-64 border-r bg-muted/30">
          <Tabs defaultValue="media" className="h-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="elements">Elements</TabsTrigger>
            </TabsList>
            <TabsContent value="media" className="p-4">
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <input {...getInputProps()} />
                <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drop media files here or click to upload
                </p>
              </div>
            </TabsContent>
            <TabsContent value="elements" className="p-4">
              <ScrollArea className="h-[calc(100vh-10rem)]">
                {/* Add element templates here */}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-muted/30 p-8 flex items-center justify-center">
            <div className="relative aspect-video w-full max-w-4xl bg-black rounded-lg overflow-hidden">
              <Player
                component={() => <div>Preview</div>}
                durationInFrames={150}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                playing={isPlaying}
                loop
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="h-48 border-t bg-background p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setCurrentTime(0)}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Slider
              value={[currentTime]}
              max={100}
              step={1}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="mb-4"
            />
            <ScrollArea className="h-20">
              {/* Timeline tracks */}
              <div className="space-y-2">
                {currentProject.scenes.map((scene) => (
                  <div
                    key={scene.id}
                    className="h-8 bg-muted rounded-md"
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 border-l bg-muted/30">
          <ScrollArea className="h-full p-4">
            {/* Properties panel */}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}