import { Project, Task, Testimonial, UserProfile, Workspace } from "@/types";

export const currentUser: UserProfile = {
  id: "user_01",
  name: "Avery Quinn",
  handle: "@avery",
  avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  reputation: 860,
  role: "owner",
  walletAddress: "SP2J4QF4VY9VQHJZQXF8E5W6D02WXJ4V32QXZ2G0Z",
};

export const workspaces: Workspace[] = [
  {
    id: "workspace_1",
    name: "TaskFlow Core",
    description: "Premium Web3 product launch workspace.",
    members: 12,
    premium: true,
  },
  {
    id: "workspace_2",
    name: "Growth Ops",
    description: "Cross-team sprint planning and collaborations.",
    members: 8,
    premium: false,
  },
];

export const projects: Project[] = [
  {
    id: "project_1",
    name: "Stacks DAO launch",
    status: "active",
    progress: 78,
    dueDate: "2026-07-12",
    description: "Complete the Stacks DAO launch plan and token gating flows.",
    labels: ["Blockchain", "Launch", "Stake"],
  },
  {
    id: "project_2",
    name: "Reputation engine",
    status: "paused",
    progress: 43,
    dueDate: "2026-08-02",
    description: "On-chain reputation scoring and achievement minting.",
    labels: ["Web3", "Rewards"],
  },
  {
    id: "project_3",
    name: "AI productivity lab",
    status: "launched",
    progress: 92,
    dueDate: "2026-05-30",
    description: "Build AI insights for task prioritization and summaries.",
    labels: ["AI", "Insights"],
  },
];

export const tasks: Task[] = [
  {
    id: "task_01",
    title: "Draft on-chain task proof contract",
    project: "Reputation engine",
    priority: "high",
    status: "in-progress",
    dueDate: "2026-05-24",
    assignee: "Avery",
    tags: ["clarity", "blocks"],
    progress: 45,
  },
  {
    id: "task_02",
    title: "Design premium dashboard visuals",
    project: "TaskFlow Core",
    priority: "medium",
    status: "todo",
    dueDate: "2026-05-26",
    assignee: "Mira",
    tags: ["ui", "motion"],
    progress: 10,
  },
  {
    id: "task_03",
    title: "Enable Hiro Wallet auth flow",
    project: "TaskFlow Core",
    priority: "high",
    status: "todo",
    dueDate: "2026-05-22",
    assignee: "Noah",
    tags: ["wallet", "auth"],
    progress: 0,
  },
  {
    id: "task_04",
    title: "Publish project milestones to Supabase",
    project: "Growth Ops",
    priority: "low",
    status: "done",
    dueDate: "2026-05-20",
    assignee: "Cleo",
    tags: ["db", "api"],
    progress: 100,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Jordan Lee",
    title: "Product Lead",
    quote: "TaskFlow made our DAO sprint planning feel effortless, with proof-of-work visibility built in.",
    company: "Nova Labs",
  },
  {
    name: "Talia Reed",
    title: "Founder",
    quote: "The combination of premium dashboards and on-chain reputation gives the team trust and momentum.",
    company: "Arcade Collective",
  },
];
