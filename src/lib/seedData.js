const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const seedWeekly = () =>
  days.map((d, i) => ({
    day: d,
    avg: 95 + (i % 2 ? 20 : 0) + (i === 5 ? 40 : 0),
  }));

export const seedMonthly = () => [
  { month: 'Jan', reports: 165 },
  { month: 'Feb', reports: 150 },
  { month: 'Mar', reports: 170 },
];

export const seedData = {
  patients: [],
  updates: [],
  weekly: seedWeekly(),
  monthly: seedMonthly(),
};
