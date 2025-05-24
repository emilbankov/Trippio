export interface Question {
  value: string;
  placeholder: string;
  type: 'text' | 'date' | 'textarea' | 'radio';
}

export interface PlanOption {
  title: string;
  description: string;
}

export interface SpeechBubbleProps {
  text: string;
}

export interface InitialViewProps {
  onStartPlanning: () => void;
}

export interface PlanSelectionProps {
  onSelectPlan: (plan: string) => void;
}

export interface QuestionsViewProps {
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

export interface PreviewViewProps {
  selectedPlan: string;
  answers: string[];
  onBack: () => void;
} 