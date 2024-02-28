export interface Chat {
  id: number;
  name: string;
  model: string;
  lastActivity: string;
  messages: Message[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSummary {
  id: number;
  name: string;
  lastActivity: string;
}
