import { atom } from 'jotai';

export const defaultChat = {
  id: 0,
  name: 'Untitled chat',
  model: '',
  lastActivity: '',
  messages: [],
};

export const currentChatIdAtom = atom<number | undefined>(undefined);
