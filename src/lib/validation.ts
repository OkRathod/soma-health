// src/lib/validation.ts
// Requires: npm i zod
import { z } from "zod";

// --- AI log parsing: never trust the model's shape blindly. ---
export const AiFoodSchema = z.object({
  name: z.string().default("Unknown"),
  calories: z.coerce.number().finite().nonnegative().default(0),
  protein: z.coerce.number().finite().nonnegative().default(0),
  carbs: z.coerce.number().finite().nonnegative().default(0),
  fats: z.coerce.number().finite().nonnegative().default(0),
});

export const AiExerciseSchema = z.object({
  name: z.string().default("Activity"),
  calories_burned: z.coerce.number().finite().nonnegative().default(0),
  duration_minutes: z.coerce.number().finite().nonnegative().default(0),
});

export const AiLogSchema = z.object({
  foods: z.array(AiFoodSchema).default([]),
  exercises: z.array(AiExerciseSchema).default([]),
  total_calories_in: z.coerce.number().finite().nonnegative().default(0),
  total_calories_out: z.coerce.number().finite().nonnegative().default(0),
  ai_feedback: z.string().default(""),
  next_step: z.string().default(""),
});
export type AiLog = z.infer<typeof AiLogSchema>;

/** Parse + repair AI JSON. Recomputes totals from items if the model's totals look wrong. */
export function parseAiLog(raw: unknown): AiLog {
  const data = AiLogSchema.parse(raw);
  const foodCals = data.foods.reduce((a, f) => a + f.calories, 0);
  const exCals = data.exercises.reduce((a, e) => a + e.calories_burned, 0);
  if (data.total_calories_in === 0 && foodCals > 0) data.total_calories_in = Math.round(foodCals);
  if (data.total_calories_out === 0 && exCals > 0) data.total_calories_out = Math.round(exCals);
  return data;
}

// --- Request body schemas ---
export const TaskCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional().nullable(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW", "HABIT"]).default("MEDIUM"),
  date: z.string(),
  startTime: z.string().nullable().optional(),
  isRecurring: z.boolean().default(false),
  duration: z.coerce.number().int().positive().max(1440).optional(),
  subtasks: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        targetValue: z.coerce.number().int().optional().nullable(),
        unit: z.string().max(20).optional().nullable(),
      })
    )
    .default([]),
});

export const HabitTemplateSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional().nullable(),
  startTime: z.string().nullable().optional(),
  durationMins: z.coerce.number().int().positive().max(1440).optional().nullable(),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).default([0, 1, 2, 3, 4, 5, 6]),
  isActive: z.boolean().default(true),
  subtasks: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().min(1).max(200),
        targetValue: z.coerce.number().int().optional().nullable(),
        unit: z.string().max(20).optional().nullable(),
      })
    )
    .default([]),
});
export type HabitTemplateInput = z.infer<typeof HabitTemplateSchema>;