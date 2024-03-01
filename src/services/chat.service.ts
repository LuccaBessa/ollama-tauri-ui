import { Chat, ChatSummary, Message } from '@/services/models/chat';
import Database from '@tauri-apps/plugin-sql';

export async function createChat(name: string, model: string): Promise<number> {
  try {
    const db = await Database.load('sqlite:chats.db');

    const result = await db.execute('INSERT INTO chats (name, lastActivity, model) VALUES (?, ?, ?)', [name, new Date().toISOString(), model]);

    return result.lastInsertId;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw new Error(`Unable to create chat: ${error}.`);
  }
}

export async function addMessage(chatId: number, role: 'user' | 'assistant' | 'system', content: string): Promise<number> {
  try {
    const db = await Database.load('sqlite:chats.db');

    const result = await db.execute('INSERT INTO messages (chatId, role, content, timestamp) VALUES (?, ?, ?, ?)', [chatId, role, content, new Date().toISOString()]);

    return result.lastInsertId;
  } catch (error) {
    console.error('Error adding message:', error);
    throw new Error(`Unable to add message: ${error}.`);
  }
}

export async function deleteChat(chatId: number): Promise<boolean> {
  try {
    const db = await Database.load('sqlite:chats.db');

    await db.execute('DELETE FROM messages WHERE chatId = ?', [chatId]);
    await db.execute('DELETE FROM chats WHERE id = ?', [chatId]);

    return true;
  } catch (error) {
    console.error('Error deleting chat: ' + JSON.stringify(error));
    throw new Error(`Unable to delete chat: ${error}.`);
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
    throw new Error(`Unable to get chat: ${error}.`);
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
    throw new Error(`Unable to get all chats: ${error}.`);
  }
}

export async function updateChatName(chatId: number, newName: string): Promise<void> {
  try {
    const db = await Database.load('sqlite:chats.db');

    await db.execute('UPDATE chats SET name = ? WHERE id = ?', [newName, chatId]);

    console.log('Chat name updated successfully.');
  } catch (error) {
    console.error('Error updating chat name:', error);
    throw new Error(`Unable to update chat name: ${error}.`);
  }
}
