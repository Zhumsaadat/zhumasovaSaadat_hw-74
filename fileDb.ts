import { promises as fs } from 'fs';
import { Message, MessageWithDateId } from './types';
import path from 'path';

let data: MessageWithDateId[] = [];
const messagesFolderPath = path.join(__dirname, 'messages');

const fileDb = {
    async init() {
        try {
            const files = await fs.readdir(messagesFolderPath);
            for (const file of files) {
                const filePath = path.join(messagesFolderPath, file);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const messageData = JSON.parse(fileContent);
                data.push(messageData);
            }
        } catch (e) {
            data = [];
        }
    },
    async getMessages() {
        data.reverse();
        const lastFiveObjects = data.slice(0, 5);
        data.reverse();
        return lastFiveObjects;
    },
    async addMessage(message: Message) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const messageWithDate = {id, date, ...message};
        data.push(messageWithDate);
        await this.save();
        return messageWithDate;
    },
    async save() {
            const messagesFolderPath = path.join(__dirname, 'messages');

            await Promise.all(data.map(async (message) => {
                const filename = path.join(messagesFolderPath, `${message.date}.txt`);
                await fs.writeFile(filename, JSON.stringify(message));
            }));
        }
};

export default fileDb;