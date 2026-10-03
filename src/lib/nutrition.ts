// src/lib/nutrition.ts
// Auto goals (Mifflin–St Jeor BMR + activity → TDEE) and adaptive re-tuning.

type Gender = "Male" | "Female" | "Other" | string | null | undefined;

const ACTIVITY_FACTORS: Record<string, number> = {
  Sedentary: 1.2,
  Moderate: 1.45,
  Active: 1.65,
};

export interface GoalInputs {
  age?: number | null;
  gender?: Gender;
  height?: number | null; // cm
  weight?: number | null; // kg
  activityLevel?: string | null;
  weightGoal?: string | null; // "Lose" | "Maintain" | "Gain"
}

/** Basal Metabolic Rate (kcal/day). Returns null if inputs are insufficient. */
export function bmr({ age, gender, height, weight }: GoalInputs): number | null {
  if (!age || !height || !weight) return null;
  const base = 10 * weight + 6.25 * height - 5 * age;
  if (gender === "Male") return base + 5;
  if (gender === "Female") return base - 161;
  return base - 78; // neutral midpoint when unspecified
}

/** Total Daily Energy Expenditure (kcal/day). */
export function tdee(inputs: GoalInputs): number | null {
  const b = bmr(inputs);
  if (b == null) return null;
  const factor = ACTIVITY_FACTORS[inputs.activityLevel ?? "Sedentary"] ?? 1.2;
  return Math.round(b * factor);
}

/** Suggested daily calorie goal, adjusted for the weight goal. */
export function calorieGoal(inputs: GoalInputs): number | null {
  const t = tdee(inputs);
  if (t == null) return null;
  let goal = t;
  if (inputs.weightGoal === "Lose") goal = t - 400; // ~0.4 kg/week deficit
  if (inputs.weightGoal === "Gain") goal = t + 300;
  return Math.max(1200, Math.round(goal / 10) * 10); // safety floor
}

/** Suggested water goal (ml) ≈ 35 ml per kg, clamped. */
export function waterGoal(inputs: GoalInputs): number | null {
  if (!inputs.weight) return null;
  return Math.min(4000, Math.max(1500, Math.round((inputs.weight * 35) / 100) * 100));
}

/**
 * Adaptive nudge: given the last 14 days of intake vs the current goal and the
 * weight trend, suggest a small correction (±100 kcal max).
 */
export function adaptiveCalorieGoal(
  currentGoal: number,
  avgIntake: number | null,
  weightTrendKgPerWeek: number | null,
  weightGoal: string | null
): number {
  if (avgIntake == null) return currentGoal;
  let delta = 0;

  if (weightGoal === "Lose" && (weightTrendKgPerWeek ?? 0) > -0.1) delta = -100;
  else if (weightGoal === "Gain" && (weightTrendKgPerWeek ?? 0) < 0.1) delta = +100;
  else if (weightGoal === "Maintain" && Math.abs(weightTrendKgPerWeek ?? 0) > 0.3)
    delta = (weightTrendKgPerWeek ?? 0) > 0 ? -100 : +100;

  return Math.max(1200, Math.round((currentGoal + delta) / 10) * 10);
}