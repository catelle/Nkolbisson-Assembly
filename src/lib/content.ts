import { ObjectId } from "mongodb";
import type { Event, Ministry, Story, StoryBlock, Update, Question, Answer } from "@/lib/types";
import { getLocale, type Locale } from "@/lib/locale";
import { getDb } from "@/lib/mongo";
import { unstable_noStore as noStore } from "next/cache";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type LocalizedTags = {
  fr: string[];
  en: string[];
};

export type LocalizedContentBlock = {
  id: string;
  type: "paragraph" | "subtitle" | "image" | "image_text";
  text?: LocalizedText;
  image?: string;
  caption?: LocalizedText;
  align?: "left" | "right" | "center";
};

export type EventDoc = {
  _id: ObjectId;
  title: LocalizedText;
  description: LocalizedText;
  location: LocalizedText;
  ministry: LocalizedText;
  startAt: string;
  endAt?: string;
  image?: string;
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};

export type MinistryDoc = {
  _id: ObjectId;
  name: LocalizedText;
  summary: LocalizedText;
  leader: LocalizedText;
  meetingTime: LocalizedText;
  latestUpdate: LocalizedText;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateDoc = {
  _id: ObjectId;
  title: LocalizedText;
  slug: string;
  excerpt: LocalizedText;
  content: {
    fr: string[];
    en: string[];
  };
  tags: LocalizedTags;
  cover?: string;
  publishedAt?: string;
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};

export type StoryDoc = {
  _id: ObjectId;
  title: LocalizedText;
  subtitle: LocalizedText;
  slug: string;
  readingTime: number;
  tags: LocalizedTags;
  hero?: string;
  blocks: LocalizedContentBlock[];
  publishedAt?: string;
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};

export type QuestionDoc = {
  _id: ObjectId;
  questionText: string;
  createdAt: string;
  status: "new" | "answered" | "private";
  userId?: string;
  isAnonymous: boolean;
  publicAnswer?: string;
};

export type AnswerDoc = {
  _id: ObjectId;
  questionId: string;
  answerText: string;
  answeredAt: string;
  answeredBy: string;
  isPublic: boolean;
};

export type MessageDoc = {
  _id: ObjectId;
  questionId: string;
  senderRole: "admin" | "user";
  senderId?: string;
  text: string;
  createdAt: string;
};

const pick = (value: LocalizedText | undefined, locale: Locale) => {
  if (!value) return "";
  return value[locale] || value.fr || "";
};

const pickTags = (value: LocalizedTags | undefined, locale: Locale) => {
  if (!value) return [] as string[];
  return value[locale] || value.fr || [];
};

const pickContent = (value: { fr: string[]; en: string[] } | undefined, locale: Locale) => {
  if (!value) return [] as string[];
  return value[locale] || value.fr || [];
};

const mapEvent = (doc: EventDoc, locale: Locale): Event => ({
  id: doc._id.toString(),
  title: pick(doc.title, locale),
  description: pick(doc.description, locale),
  location: pick(doc.location, locale),
  startAt: doc.startAt,
  endAt: doc.endAt,
  ministry: pick(doc.ministry, locale),
  image: doc.image || "/images/event-prayer.svg",
  status: doc.status
});

const mapMinistry = (doc: MinistryDoc, locale: Locale): Ministry => ({
  id: doc._id.toString(),
  name: pick(doc.name, locale),
  summary: pick(doc.summary, locale),
  leader: pick(doc.leader, locale),
  meetingTime: pick(doc.meetingTime, locale),
  latestUpdate: pick(doc.latestUpdate, locale),
  image: doc.image || "/images/ministry-youth.svg"
});

const mapUpdate = (doc: UpdateDoc, locale: Locale): Update => ({
  id: doc._id.toString(),
  title: pick(doc.title, locale),
  slug: doc.slug,
  excerpt: pick(doc.excerpt, locale),
  content: pickContent(doc.content, locale),
  cover: doc.cover || "/images/news-healing.svg",
  tags: pickTags(doc.tags, locale),
  publishedAt: doc.publishedAt || ""
});

const mapStory = (doc: StoryDoc, locale: Locale): Story => ({
  id: doc._id.toString(),
  title: pick(doc.title, locale),
  subtitle: pick(doc.subtitle, locale),
  slug: doc.slug,
  readingTime: doc.readingTime,
  tags: pickTags(doc.tags, locale),
  hero: doc.hero || "/images/story-david.svg",
  blocks: doc.blocks.map((block) => ({
    id: block.id,
    type: block.type,
    text: block.text ? pick(block.text, locale) : undefined,
    image: block.image,
    caption: block.caption ? pick(block.caption, locale) : undefined,
    align: block.align
  })) as StoryBlock[],
  publishedAt: doc.publishedAt || ""
});

export async function getEvents(locale?: string) {
  noStore();
  const db = await getDb();
  const docs = await db.collection<EventDoc>("events").find({ status: "published" }).toArray();
  const lang = getLocale(locale);
  return docs.map((doc) => mapEvent(doc, lang));
}

export async function getEventMinistries(locale?: string) {
  const events = await getEvents(locale);
  return Array.from(new Set(events.map((event) => event.ministry)));
}

export async function getMinistries(locale?: string) {
  noStore();
  const db = await getDb();
  const docs = await db.collection<MinistryDoc>("ministries").find({}).toArray();
  const lang = getLocale(locale);
  return docs.map((doc) => mapMinistry(doc, lang));
}

export async function getUpdates(locale?: string) {
  noStore();
  const db = await getDb();
  const docs = await db.collection<UpdateDoc>("updates").find({ status: "published" }).toArray();
  const lang = getLocale(locale);
  return docs.map((doc) => mapUpdate(doc, lang));
}

export async function getStories(locale?: string) {
  noStore();
  const db = await getDb();
  const docs = await db.collection<StoryDoc>("stories").find({ status: "published" }).toArray();
  const lang = getLocale(locale);
  return docs.map((doc) => mapStory(doc, lang));
}

export async function getStoryTags(locale?: string) {
  const stories = await getStories(locale);
  return Array.from(new Set(stories.flatMap((story) => story.tags)));
}

export async function getStoryBySlug(locale: string | undefined, slug: string) {
  noStore();
  const db = await getDb();
  const doc = await db.collection<StoryDoc>("stories").findOne({ slug });
  if (!doc) return null;
  return mapStory(doc, getLocale(locale));
}

export async function getUpdateBySlug(locale: string | undefined, slug: string) {
  noStore();
  const db = await getDb();
  const doc = await db.collection<UpdateDoc>("updates").findOne({ slug });
  if (!doc) return null;
  return mapUpdate(doc, getLocale(locale));
}

export async function getPublicQuestions() {
  noStore();
  const db = await getDb();
  const docs = await db
    .collection<QuestionDoc>("questions")
    .find({ status: "answered", publicAnswer: { $exists: true, $ne: "" } })
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map<Question>((doc) => ({
    id: doc._id.toString(),
    questionText: doc.questionText,
    createdAt: doc.createdAt,
    status: doc.status
  }));
}

export async function getPublicAnswers() {
  noStore();
  const db = await getDb();
  const docs = await db
    .collection<QuestionDoc>("questions")
    .find({ status: "answered", publicAnswer: { $exists: true, $ne: "" } })
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map<Answer>((doc) => ({
    id: doc._id.toString(),
    questionId: doc._id.toString(),
    answerText: doc.publicAnswer || "",
    answeredAt: doc.createdAt,
    answeredBy: "Equipe pastorale",
    isPublic: true
  }));
}

export async function getQuestionsByUser(userId: string) {
  noStore();
  const db = await getDb();
  return db
    .collection<QuestionDoc>("questions")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getMessages(questionId: string) {
  noStore();
  const db = await getDb();
  return db
    .collection<MessageDoc>("messages")
    .find({ questionId })
    .sort({ createdAt: 1 })
    .toArray();
}

export async function createMessage(message: Omit<MessageDoc, "_id">) {
  const db = await getDb();
  const result = await db.collection<MessageDoc>("messages").insertOne(message as MessageDoc);
  return result.insertedId.toString();
}
