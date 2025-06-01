import { setupWorker } from 'msw/browser';
import { mutationHandlers } from '../handler';

export const worker = setupWorker(...mutationHandlers);
