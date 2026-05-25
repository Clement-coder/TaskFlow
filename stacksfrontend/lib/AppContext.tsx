"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Workspace, Project, Task } from "@/types";
import { currentUser, workspaces as initialWorkspaces, projects as initialProjects, tasks as initialTasks } from "@/data/mock-data";

export interface ActivityLog {
  id: string;
  text: string;
  type: "contract" | "system";
  timestamp: string;
}

interface AppContextType {
  userProfile: UserProfile;
  workspaces: Workspace[];
  activeWorkspaceId: string;
  projects: Project[];
  tasks: Task[];
  walletConnected: boolean;
  walletAddress: string | null;
  celoBalance: number;
  activityFeed: ActivityLog[];
  roadmapUpvotes: Record<string, number>;
  activeWorkspace: Workspace | undefined;
  
  selectWorkspace: (id: string) => void;
  addWorkspace: (name: string, description: string, premium: boolean) => void;
  addProject: (name: string, description: string, labels: string[]) => void;
  addTask: (title: string, projectName: string, priority: "low" | "medium" | "high", dueDate: string) => void;
  updateTaskStatus: (id: string, status: "todo" | "in-progress" | "done") => void;
  deleteTask: (id: string) => void;
  updateTaskTitle: (id: string, title: string) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
  addActivityLog: (text: string, type?: "contract" | "system") => void;
  upvoteMilestone: (milestoneId: string) => void;
  toggleWorkspacePremium: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(currentUser);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(initialWorkspaces[0].id);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [celoBalance, setCeloBalance] = useState<number>(0);
  const [activityFeed, setActivityFeed] = useState<ActivityLog[]>([
    {
      id: "act_1",
      text: "Workspace 'TaskFlow Core' initialized on Celo.",
      type: "system",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "act_2",
      text: "Smart contract 'proof-of-work-v1' deployed successfully on Celo.",
      type: "contract",
      timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    }
  ]);
  const [roadmapUpvotes, setRoadmapUpvotes] = useState<Record<string, number>>({
    "q2-1": 42,
    "q2-2": 28,
    "q3-1": 15,
    "q3-2": 8,
  });

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("tf_user");
      const storedWorkspaces = localStorage.getItem("tf_workspaces");
      const storedActiveWs = localStorage.getItem("tf_active_ws");
      const storedProjects = localStorage.getItem("tf_projects");
      const storedTasks = localStorage.getItem("tf_tasks");
      const storedWallet = localStorage.getItem("tf_wallet");
      const storedFeed = localStorage.getItem("tf_feed");
      const storedUpvotes = localStorage.getItem("tf_upvotes");

      if (storedUser) setUserProfile(JSON.parse(storedUser));
      if (storedWorkspaces) setWorkspaces(JSON.parse(storedWorkspaces));
      if (storedActiveWs) setActiveWorkspaceId(storedActiveWs);
      if (storedProjects) setProjects(JSON.parse(storedProjects));
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedUpvotes) setRoadmapUpvotes(JSON.parse(storedUpvotes));
      if (storedFeed) setActivityFeed(JSON.parse(storedFeed));
      
      if (storedWallet) {
        const wallet = JSON.parse(storedWallet);
        setWalletConnected(wallet.connected);
        setWalletAddress(wallet.address);
        setCeloBalance(wallet.celoBalance);
      }
    }
  }, []);

  // Save helpers
  const saveState = (key: string, data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);

  const selectWorkspace = (id: string) => {
    setActiveWorkspaceId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("tf_active_ws", id);
    }
    addActivityLog(`Switched active workspace to '${workspaces.find(w => w.id === id)?.name}'`, "system");
  };

  const addWorkspace = (name: string, description: string, premium: boolean) => {
    const newWs: Workspace = {
      id: `workspace_${Date.now()}`,
      name,
      description,
      members: 1,
      premium,
    };
    const updated = [...workspaces, newWs];
    setWorkspaces(updated);
    saveState("tf_workspaces", updated);
    
    // Automatically select the new workspace
    setActiveWorkspaceId(newWs.id);
    if (typeof window !== "undefined") {
      localStorage.setItem("tf_active_ws", newWs.id);
    }

    addActivityLog(`Created workspace '${name}' with ${premium ? "Premium Token Gating" : "standard settings"}`, "system");
  };

  const addProject = (name: string, description: string, labels: string[]) => {
    const newProj: Project = {
      id: `project_${Date.now()}`,
      name,
      status: "active",
      progress: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0],
      description,
      labels,
    };
    const updated = [...projects, newProj];
    setProjects(updated);
    saveState("tf_projects", updated);
    addActivityLog(`Added project '${name}' to current workspace`, "system");
  };

  const addTask = (title: string, projectName: string, priority: "low" | "medium" | "high", dueDate: string) => {
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title,
      project: projectName,
      priority,
      status: "todo",
      dueDate: dueDate || new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split("T")[0],
      assignee: userProfile.name,
      tags: [priority],
      progress: 0,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveState("tf_tasks", updated);
    addActivityLog(`Created task '${title}' for project '${projectName}'`, "system");
  };

  const updateTaskStatus = (id: string, status: "todo" | "in-progress" | "done") => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        if (status === "done" && t.status !== "done") {
          const repGain = t.priority === "high" ? 70 : t.priority === "medium" ? 50 : 30;
          const updatedUser = { ...userProfile, reputation: userProfile.reputation + repGain };
          setUserProfile(updatedUser);
          saveState("tf_user", updatedUser);
          addActivityLog(
            `Minted proof of completion for '${t.title}'. +${repGain} Reputation scored on-chain.`,
            "contract"
          );
        }
        return { ...t, status, progress: status === "done" ? 100 : status === "in-progress" ? 50 : 0 };
      }
      return t;
    });
    setTasks(updated);
    saveState("tf_tasks", updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveState("tf_tasks", updated);
    addActivityLog("Task removed from board.", "system");
  };

  const updateTaskTitle = (id: string, title: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, title } : t));
    setTasks(updated);
    saveState("tf_tasks", updated);
  };

  const connectWallet = () => {
    const simulatedAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
    const wallet = {
      connected: true,
      address: simulatedAddress,
      celoBalance: 450,
    };
    setWalletConnected(true);
    setWalletAddress(simulatedAddress);
    setCeloBalance(450);
    saveState("tf_wallet", wallet);
    addActivityLog(`Wallet connected: ${simulatedAddress.slice(0, 6)}...${simulatedAddress.slice(-4)}`, "system");
  };

  const disconnectWallet = () => {
    const wallet = {
      connected: false,
      address: null,
      celoBalance: 0,
    };
    setWalletConnected(false);
    setWalletAddress(null);
    setCeloBalance(0);
    saveState("tf_wallet", wallet);
    addActivityLog("Wallet disconnected", "system");
  };

  const addActivityLog = (text: string, type: "contract" | "system" = "system") => {
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      text,
      type,
      timestamp: new Date().toISOString(),
    };
    setActivityFeed((prev) => {
      const updated = [newLog, ...prev].slice(0, 15); // keep max 15 items
      saveState("tf_feed", updated);
      return updated;
    });
  };

  const upvoteMilestone = (milestoneId: string) => {
    const updated = {
      ...roadmapUpvotes,
      [milestoneId]: (roadmapUpvotes[milestoneId] || 0) + 1,
    };
    setRoadmapUpvotes(updated);
    saveState("tf_upvotes", updated);
    addActivityLog(`Voted for roadmap feature: ${milestoneId}`, "system");
  };

  const toggleWorkspacePremium = (id: string) => {
    const updated = workspaces.map((w) =>
      w.id === id ? { ...w, premium: !w.premium } : w
    );
    setWorkspaces(updated);
    saveState("tf_workspaces", updated);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        workspaces,
        activeWorkspaceId,
        projects,
        tasks,
        walletConnected,
        walletAddress,
        celoBalance,
        activityFeed,
        roadmapUpvotes,
        activeWorkspace,
        selectWorkspace,
        addWorkspace,
        addProject,
        addTask,
        updateTaskStatus,
        deleteTask,
        updateTaskTitle,
        connectWallet,
        disconnectWallet,
        addActivityLog,
        upvoteMilestone,
        toggleWorkspacePremium,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
