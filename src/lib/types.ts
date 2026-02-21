export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  startAt: string;
  endAt?: string;
  ministry: string;
  image: string;
  status: "draft" | "published";
};

export type Ministry = {
  id: string;
  name: string;
  summary: string;
  leader: string;
  meetingTime: string;
  latestUpdate: string;
  image: string;
};

export type Update = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  cover: string;
  tags: string[];
  publishedAt: string;
};

export type StoryBlock = {
  id: string;
  type: "paragraph" | "subtitle" | "image" | "image_text";
  text?: string;
  image?: string;
  caption?: string;
  align?: "left" | "right" | "center";
};

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  readingTime: number;
  tags: string[];
  hero: string;
  blocks: StoryBlock[];
  publishedAt: string;
};

export type Question = {
  id: string;
  questionText: string;
  createdAt: string;
  status: "new" | "answered" | "private";
};

export type Answer = {
  id: string;
  questionId: string;
  answerText: string;
  answeredAt: string;
  answeredBy: string;
  isPublic: boolean;
};
