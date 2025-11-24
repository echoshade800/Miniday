/**
 * Date utility functions for countdown calculations
 */

/**
 * Calculate days between two dates
 */
export function calculateDaysDifference(targetDate) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diff = target.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
}

/**
 * Check if event is in the past
 */
export function isEventPast(targetDate) {
  return calculateDaysDifference(targetDate) < 0;
}

/**
 * Get formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[date.getDay()];

  return `${year}-${month}-${day}, ${weekday}`;
}

/**
 * Calculate next occurrence for repeating events
 */
export function getNextOccurrence(baseDate, repeatRule) {
  if (repeatRule === 'none') return baseDate;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let nextDate = new Date(baseDate);
  nextDate.setHours(0, 0, 0, 0);

  // Keep advancing until we find a future date
  while (nextDate <= now) {
    switch (repeatRule) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        return baseDate;
    }
  }

  return nextDate.toISOString();
}

/**
 * Sort events by date (future first, then past)
 */
export function sortEvents(events) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return [...events].sort((a, b) => {
    const dateA = new Date(a.targetDate);
    const dateB = new Date(b.targetDate);

    const aPast = dateA < now;
    const bPast = dateB < now;

    // Future events first
    if (!aPast && bPast) return -1;
    if (aPast && !bPast) return 1;

    // Both future: soonest first
    if (!aPast && !bPast) {
      return dateA - dateB;
    }

    // Both past: most recent first
    return dateB - dateA;
  });
}
