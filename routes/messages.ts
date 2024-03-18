import express from 'express';

const messagesRouter = express.Router()

messagesRouter.get('/', (req, res) => {
    res.send('List of messages will be here');
});


messagesRouter.get('/:id', (req, res) => {
    res.send('A single message by id will be here');
});

messagesRouter.post('/', (req, res) => {
    console.log(req.body)
   return res.send('Will create new');
});

export default messagesRouter;