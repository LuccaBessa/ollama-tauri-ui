export interface Chat {
  id: number;
  name: string;
  model: string;
  lastActivity: string;
  messages: Message[];
}

export interface Message {
  id?: number;
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[];
  timestamp?: string;
}

export interface ChatRequestOptions {
  model: string;
  messages: Message[];
  format?: string;
  template?: string;
  stream?: boolean;
  keep_alive?: string;
}

export interface ChatResponse {
  model: string;
  created_at: string;
  message: {
    role: 'system' | 'user' | 'assistant';
    content: string;
    images?: string[];
  };
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

export interface ChatSummary {
  id: number;
  name: string;
  lastActivity: string;
}
