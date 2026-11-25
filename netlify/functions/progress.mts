import type { Config } from "@netlify/functions";
import { getUser } from "@netlify/identity";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { studentProgress } from "../../db/schema.js";

const MAX_BYTES = 200_000;

// Fields the app stores in a student's progress. Anything else sent by the client is dropped.
// Dashboard fields (1.4.0): missed answers, study days, activity history, last activity, study time.
const ARRAY_KEYS = ["answered", "studied", "practiced", "listened", "exams", "filled", "wrote", "missed", "days", "log"];
const OBJECT_KEYS = ["flashSeen", "repeated", "readAns", "writings", "last"];
const NUMBER_KEYS = ["points", "done", "correct", "studySec", "trackSince", "notifSeen"];

function sanitizeProgress(input: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const k of ARRAY_KEYS) if (Array.isArray(input[k])) out[k] = input[k];
  for (const k of OBJECT_KEYS) {
    const v = input[k];
    if (v && typeof v === "object" && !Array.isArray(v)) out[k] = v;
  }
  for (const k of NUMBER_KEYS) {
    const v = input[k];
    if (typeof v === "number" && Number.isFinite(v) && v >= 0) out[k] = Math.floor(v);
  }
  return out;
}

export default async (req: Request) => {
  const user = await getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  if (req.method === "GET") {
    const [row] = await db
      .select()
      .from(studentProgress)
      .where(eq(studentProgress.userId, user.id));
    return Response.json({ progress: row ? row.progress : null, updatedAt: row?.updatedAt ?? null });
  }

  if (req.method === "PUT") {
    const raw = await req.text();
    if (raw.length > MAX_BYTES) return Response.json({ error: "Payload too large" }, { status: 413 });
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const rawProgress = (body as { progress?: unknown })?.progress;
    if (!rawProgress || typeof rawProgress !== "object" || Array.isArray(rawProgress)) {
      return Response.json({ error: "Invalid progress" }, { status: 400 });
    }
    const progress = sanitizeProgress(rawProgress as Record<string, unknown>);
    const name = user.name ?? null;
    const now = new Date();
    await db
      .insert(studentProgress)
      .values({ userId: user.id, email: user.email ?? "", name, progress, updatedAt: now })
      .onConflictDoUpdate({
        target: studentProgress.userId,
        set: { progress, email: user.email ?? "", name, updatedAt: now },
      });
    return Response.json({ ok: true, updatedAt: now });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/progress",
};
