interface Question {
  value: string;
  placeholder: string;
  type: 'text' | 'date' | 'textarea' | 'radio';
}

interface PlanOption {
  title: string;
  description: string;
}

interface SpeechBubbleProps {
  text: string;
}

interface InitialViewProps {
  onStartPlanning: () => void;
}

interface PlanSelectionProps {
  onSelectPlan: (plan: string) => void;
}

interface QuestionsViewProps {
  currentQuestionIndex: number;
  answers: string[];
  onInputChange: (text: string) => void;
  onNextQuestion: () => void;
  datePickerVisible: boolean;
  showDatePicker: () => void;
  hideDatePicker: () => void;
  handleConfirm: (date: Date) => void;
  selectedDate: Date | null;
}

interface PreviewViewProps {
  selectedPlan: string;
  answers: string[];
  onBack: () => void;
} 