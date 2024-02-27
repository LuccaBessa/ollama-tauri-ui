interface Chat {
  id: number;
  name: string;
  model: string;
  lastActivity: Date;
  messages: Message[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSummary {
  id: number;
  name: string;
  lastActivity: Date;
}
