import { Chat, ChatSummary, Message } from '@/services/models/chat';
import Database from '@tauri-apps/plugin-sql';

export async function createChat(name: string): Promise<number | null> {
  try {
    const db = await Database.load('sqlite:chats.db');

    const result = await db.execute('INSERT INTO chats (name, lastActivity) VALUES (?, ?)', [name, new Date().toISOString()]);
    return result.lastInsertId;
  } catch (error) {
    console.error('Error creating chat:', error);
    return null;
  }
}

export async function addMessage(chatId: number, role: 'user' | 'assistant', content: string): Promise<boolean> {
  try {
    const db = await Database.load('sqlite:chats.db');

    await db.execute('INSERT INTO messages (chatId, role, content, timestamp) VALUES (?, ?, ?, ?)', [chatId, role, content, new Date().toISOString()]);
    return true;
  } catch (error) {
    console.error('Error adding message:', error);
    return false;
  }
}

export async function deleteChat(chatId: number): Promise<boolean> {
  try {
    const db = await Database.load('sqlite:chats.db');

    await db.execute('DELETE FROM messages WHERE id = ?', [chatId]);
    await db.execute('DELETE FROM chats WHERE id = ?', [chatId]);

    return true;
  } catch (error) {
    console.error('Error deleting chat:', error);
    return false;
  }
}

export async function getChat(chatId: number): Promise<Chat | null> {
  try {
    const db = await Database.load('sqlite:chats.db');

    const chatResult: Chat[] = await db.select('SELECT * FROM chats WHERE id = $1', [chatId]);

    if (chatResult.length === 0) {
      return null;
    }

    const chat = chatResult[0];

    const messagesResult: Message[] = await db.select('SELECT * FROM messages WHERE chatId = $1 ORDER BY timestamp', [chatId]);

    return {
      id: chat.id,
      name: chat.name,
      model: chat.model,
      lastActivity: chat.lastActivity,
      messages: messagesResult,
    };
  } catch (error) {
    console.error('Error getting chat: ' + error);
    return null;
  }
}

export async function getAllChats(): Promise<ChatSummary[]> {
  try {
    const db = await Database.load('sqlite:chats.db');

    console.log(db);

    const chatSummaries: ChatSummary[] = [];

    const chatResults = (await db.select('SELECT id, name, lastActivity FROM chats')) as ChatSummary[];

    for (const chat of chatResults) {
      chatSummaries.push({
        id: chat.id,
        name: chat.name,
        lastActivity: new Date(chat.lastActivity).toISOString(),
      });
    }

    return chatSummaries;
  } catch (error) {
    console.error('Error getting all chats:', error);
    return [];
  }
}
