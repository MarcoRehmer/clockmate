export const mockBookings: ReadonlyArray<{
  id: number;
  duration: string;
  client?: string;
  project?: string;
  issue?: string;
  remarks?: string;
}> = [
  {
    id: 1,
    duration: '1:45', // recalculate to minutes
    client: 'Kunde 1',
    project: 'Projekt 1',
    issue: '1234',
  },
  {
    id: 2,
    duration: '0:30', // recalculate to minutes
    client: 'Kunde 1',
    project: 'Projekt 1',
    issue: '5500',
    remarks: 'Support',
  },
  {
    id: 3,
    duration: '2:30', // recalculate to minutes
    client: 'Kunde 2',
    issue: '2304',
    remarks: 'Refactoring',
  },
];
