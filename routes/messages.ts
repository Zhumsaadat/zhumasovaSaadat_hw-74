import express from 'express';
import fileDb from '../fileDb';
import { Message } from '../types';

const messagesRouter = express.Router()

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessages();
    res.send(messages);
});


messagesRouter.get('/:id', async (req, res) => {
    const messages = await fileDb.getMessages();
    const message = messages.find(message => message.id === req.params.id);
    res.send(message);
});

messagesRouter.post('/', async (req, res) => {
    const message: Message = {
        message: req.body.message,
    };

    const savedMessage = await fileDb.addMessage(message);
    console.log(req.body);
    return res.send(savedMessage);

});

export default messagesRouter;