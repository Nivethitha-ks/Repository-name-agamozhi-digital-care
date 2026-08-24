// AGAMOZHI DIGITAL CARE — CENTRALIZED TIMEZONE UTILITIES (Asia/Kolkata - IST)

/**
 * Returns 'YYYY-MM-DD' formatted date string in Asia/Kolkata timezone.
 * @param {Date | string | number} date
 * @returns {string} e.g. "2026-08-23"
 */
export function getISTDateString(date = new Date()) {
  try {
    const d = date instanceof Date ? date : new Date(date)
    if (isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d)
  } catch {
    return ''
  }
}

/**
 * Checks whether a given timestamp falls on "Today" in Asia/Kolkata (IST).
 * @param {string | Date} dateInput
 * @returns {boolean}
 */
export function isTodayInIST(dateInput) {
  if (!dateInput) return false
  const targetDateStr = getISTDateString(dateInput)
  const todayDateStr = getISTDateString(new Date())
  return Boolean(targetDateStr && targetDateStr === todayDateStr)
}

/**
 * Returns ISO strings for the start and end of "Today" in Asia/Kolkata (IST).
 * @param {Date | string} referenceDate
 * @returns {{ startIST: string, endIST: string, istDateStr: string }}
 */
export function getISTStartAndEndOfDay(referenceDate = new Date()) {
  const istDateStr = getISTDateString(referenceDate) || getISTDateString(new Date())
  // 00:00:00.000 IST represented in UTC ISO format
  const startIST = new Date(`${istDateStr}T00:00:00+05:30`).toISOString()
  // 23:59:59.999 IST represented in UTC ISO format
  const endIST = new Date(`${istDateStr}T23:59:59.999+05:30`).toISOString()
  return { startIST, endIST, istDateStr }
}
