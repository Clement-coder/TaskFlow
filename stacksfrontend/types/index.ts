export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  reputation: number;
  role: "owner" | "editor" | "viewer";
  walletAddress: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  members: number;
  premium: boolean;
}

export interface Project {
  id: string;
  name: string;
  status: "active" | "paused" | "launched";
  progress: number;
  dueDate: string;
  description: string;
  labels: string[];
}

export interface Task {
  id: string;
  title: string;
  project: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  assignee: string;
  tags: string[];
  progress: number;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  company: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  totalScore: number;
  github: {
    stacksCommits: number;
    otherCommits: number;
  };
  onchain: {
    feesGeneratedMicroStx: number;
    uniqueCallers: number;
    contractDeployments: number;
    transactions: number;
  };
  npm: {
    packageDownloads: number;
    packages: number;
  };
  isCurrentUser?: boolean;
}
