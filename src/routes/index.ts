import { Router } from 'express';

export const index = Router();

index.get('/', (req, res) => res.send('Hello world!'));
