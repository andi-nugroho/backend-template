export type QuestionStatus = "draft" | "submitted" | "validating" | "sealed" | "rejected";

export type QuestionType = "mcq" | "short" | "numerical" | "essay";

export interface ProfessorQuestion {
  id: string;
  subject: string;
  topic: string;
  type: QuestionType;
  marks: number;
  status: QuestionStatus;
  submittedAt: string;
  /** Preview only — in production, plaintext is never re-shown after seal */
  preview: string;
  /** Number of attached figures / option images */
  mediaCount?: number;
}

export interface ExamSession {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  startsAt: string;
  paperAssigned: "A" | "B" | "C" | null;
  status: "upcoming" | "live" | "completed";
  candidates: number;
}

export const professorProfile = {
  name: "Dr. Ananya Mehta",
  institution: "National Institute of Technology",
  department: "Computer Science",
  assignedTopics: ["Algorithms", "Operating Systems", "Discrete Math"],
  targetSubmissions: 30,
};

export const professorQuestions: ProfessorQuestion[] = [
  {
    id: "q-1042",
    subject: "Computer Science",
    topic: "Algorithms",
    type: "mcq",
    marks: 2,
    status: "sealed",
    submittedAt: "2026-07-20T09:12:00Z",
    preview: "Which of the following has the best average-case time for search?",
    mediaCount: 0,
  },
  {
    id: "q-1043",
    subject: "Computer Science",
    topic: "Algorithms",
    type: "short",
    marks: 5,
    status: "sealed",
    submittedAt: "2026-07-20T09:28:00Z",
    preview: "Explain the difference between Dijkstra and Bellman-Ford.",
    mediaCount: 1,
  },
  {
    id: "q-1048",
    subject: "Computer Science",
    topic: "Operating Systems",
    type: "mcq",
    marks: 2,
    status: "validating",
    submittedAt: "2026-07-23T14:02:00Z",
    preview: "In a multi-level queue scheduler, which queue is typically FCFS?",
    mediaCount: 2,
  },
  {
    id: "q-1051",
    subject: "Computer Science",
    topic: "Discrete Math",
    type: "numerical",
    marks: 3,
    status: "submitted",
    submittedAt: "2026-07-24T08:40:00Z",
    preview: "How many edges does a complete graph K₇ contain?",
    mediaCount: 1,
  },
  {
    id: "q-1039",
    subject: "Computer Science",
    topic: "Operating Systems",
    type: "essay",
    marks: 8,
    status: "rejected",
    submittedAt: "2026-07-18T11:05:00Z",
    preview: "Discuss paging vs segmentation with examples.",
    mediaCount: 0,
  },
  {
    id: "q-1052",
    subject: "Computer Science",
    topic: "Algorithms",
    type: "mcq",
    marks: 2,
    status: "draft",
    submittedAt: "2026-07-24T10:15:00Z",
    preview: "What is the space complexity of merge sort?",
    mediaCount: 0,
  },
];

export const upcomingExams: ExamSession[] = [
  {
    id: "ex-220",
    title: "Mid-Semester Examination — CS Core",
    subject: "Computer Science",
    durationMinutes: 180,
    startsAt: "2026-07-28T09:00:00Z",
    paperAssigned: null,
    status: "upcoming",
    candidates: 1240,
  },
  {
    id: "ex-218",
    title: "Discrete Mathematics — End Term",
    subject: "Discrete Math",
    durationMinutes: 120,
    startsAt: "2026-07-24T14:30:00Z",
    paperAssigned: "B",
    status: "live",
    candidates: 860,
  },
];

export const studentProfile = {
  name: "Arjun K.",
  roll: "CS21B042",
  institution: "National Institute of Technology",
};

export const examQuestions = [
  {
    id: 1,
    type: "mcq" as const,
    marks: 2,
    text: "Which data structure provides amortized O(1) insert and O(1) average lookup?",
    options: ["Array", "Hash table", "Binary search tree", "Linked list"],
  },
  {
    id: 2,
    type: "mcq" as const,
    marks: 2,
    text: "In virtual memory, a page fault occurs when:",
    options: [
      "The page is in RAM",
      "The page is not in RAM",
      "The TLB is full",
      "The process terminates",
    ],
  },
  {
    id: 3,
    type: "short" as const,
    marks: 5,
    text: "State the master theorem recurrence for merge sort and its asymptotic bound.",
    options: null,
  },
  {
    id: 4,
    type: "mcq" as const,
    marks: 2,
    text: "Which Bloom's taxonomy level best matches “design a new scheduling algorithm”?",
    options: ["Remember", "Understand", "Apply", "Create"],
  },
  {
    id: 5,
    type: "numerical" as const,
    marks: 3,
    text: "A graph has 12 vertices and is a tree. How many edges does it have?",
    options: null,
  },
];

export const adminStats = {
  professors: 128,
  questionsSealed: 3842,
  papersEncrypted: 36,
  activeExams: 2,
  validationPassRate: 87.4,
  avgValidationMs: 1240,
  syllabusCoverage: 94,
  duplicateRejects: 212,
  auditEventsToday: 18450,
};

export const pipelineStages = [
  {
    key: "submit",
    title: "Submit",
    description: "Professors contribute questions for assigned topics only.",
  },
  {
    key: "validate",
    title: "Validate",
    description: "AI checks duplicates, difficulty, Bloom level, and quality.",
  },
  {
    key: "seal",
    title: "Seal",
    description: "Each accepted item is encrypted immediately. No plaintext on disk.",
  },
  {
    key: "compose",
    title: "Compose",
    description: "AI builds statistically equivalent papers A, B, and C.",
  },
  {
    key: "release",
    title: "Release",
    description: "Keys unlock only at the scheduled examination time.",
  },
];
