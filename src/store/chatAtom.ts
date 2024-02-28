import { Chat } from '@/services/models/chat';
import { atom } from 'jotai';

export const defaultChat = {
  id: 0,
  name: 'Untitled chat',
  model: '',
  lastActivity: '',
  messages: [],
};

export const chatAtom = atom<Chat>(defaultChat);
