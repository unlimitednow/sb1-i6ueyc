"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

export default function NewProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const { addProject } = useStore();

  useEffect(() => {
    const projectId = crypto.randomUUID();
    
    // Create new project
    const project = {
      id: projectId,
      title: "Untitled Project",
      template: template || "custom",
      scenes: [
        {
          id: "scene-1",
          duration: 5,
          elements: [],
        },
      ],
      lastEdited: new Date(),
    };

    addProject(project);
    router.push(`/editor/${projectId}`);
  }, [template, addProject, router]);

  return null;
}