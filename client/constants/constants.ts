export const questions: Question[] = [
  { value: "Which country do you want to visit?", placeholder: "e.g., Spain", type: "text" },
  { value: "Which city in the selected country?", placeholder: "e.g., Barcelona", type: "text" },
  { value: "When are you planning your trip?", placeholder: "Select start date", type: "date" },
  { value: "When is your trip ending?", placeholder: "Select end date", type: "date" },
  { value: "What's your budget?", placeholder: "e.g., $1500", type: "text" },
  { value: "What kind of trip is it?", placeholder: "e.g., Adventure", type: "text" },
  { value: "What are you into?", placeholder: "e.g., Food, History", type: "textarea" },
  { value: "Do you want flights included?", placeholder: "e.g., Yes/No", type: "radio" },
  { value: "Do you need a hotel?", placeholder: "e.g., Yes/No", type: "radio" },
  { value: "Interested in tours and local experiences?", placeholder: "e.g., Yes/No", type: "radio" }
];

export const planOptions = [
  { title: 'Quick Plan', description: 'Basic trip essentials' },
  { title: 'Detailed Plan', description: 'Comprehensive itinerary' },
  { title: 'Full Experience', description: 'Complete trip with all details' }
]; 