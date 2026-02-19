// lib/streak-utils.ts
import { differenceInDays, isToday, isYesterday, startOfDay } from "date-fns";

export function calculateHabitStats(completedDates: Date[]) {
    if (completedDates.length === 0) {
    // 👇 Explicitly return an empty array so the UI never gets 'undefined'
    return { currentStreak: 0, longestStreak: 0, totalCompletions: 0, completedDates: [] };
    }

  // 1. Sort dates from newest to oldest & normalize to midnight
  const sortedDates = completedDates
    .map(d => startOfDay(new Date(d)))
    .sort((a, b) => b.getTime() - a.getTime());

  // Remove duplicates just in case
  const uniqueDates = Array.from(new Set(sortedDates.map(d => d.getTime())))
    .map(time => new Date(time));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // 2. Calculate Longest Streak
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const diff = differenceInDays(uniqueDates[i], uniqueDates[i + 1]);
    if (diff === 1) {
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      tempStreak = 1;
    }
  }
  if (tempStreak > longestStreak) longestStreak = tempStreak;
  if (uniqueDates.length === 1) longestStreak = 1;

  // 3. Calculate Current Streak
  // A streak is "alive" if they completed it today OR yesterday.
  const newestDate = uniqueDates[0];
  if (isToday(newestDate) || isYesterday(newestDate)) {
    currentStreak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = differenceInDays(uniqueDates[i], uniqueDates[i + 1]);
      if (diff === 1) {
        currentStreak++;
      } else {
        break; // Streak broken
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalCompletions: uniqueDates.length,
    completedDates: uniqueDates // Pass this down for the calendar UI
  };
}