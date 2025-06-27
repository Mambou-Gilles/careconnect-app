

export const mockMessages = [
  {
    id: 'msg1',
    sender: 'Dr. Smith',
    subject: 'Your recent lab results',
    read: false, // Initial state, will be updated based on thread
    thread: [
      { id: 'thread1_1', sender: 'Dr. Smith', content: 'Hi there, your lab results are in. Everything looks normal.', date: '2025-06-25T10:00:00Z', read: false },
      { id: 'thread1_2', sender: 'You', content: 'That\'s great news, thank you Dr. Smith!', date: '2025-06-25T10:05:00Z', read: true },
    ],
  },
  {
    id: 'msg2',
    sender: 'Clinic Reception',
    subject: 'Appointment Reminder - June 28',
    read: true,
    thread: [
      { id: 'thread2_1', sender: 'Clinic Reception', content: 'Just a reminder about your appointment tomorrow at 2 PM. Please be on time.', date: '2025-06-27T09:00:00Z', read: true },
      { id: 'thread2_2', sender: 'You', content: 'Confirmed, thank you!', date: '2025-06-27T09:05:00Z', read: true },
    ],
  },
  {
    id: 'msg3',
    sender: 'Nurse Jane',
    subject: 'Follow-up on medication',
    read: false,
    thread: [
      { id: 'thread3_1', sender: 'Nurse Jane', content: 'Hi, just checking in to see how you are doing with the new medication. Any side effects?', date: '2025-06-26T14:30:00Z', read: false },
    ],
  },
];