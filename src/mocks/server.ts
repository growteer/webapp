import { setupServer } from 'msw/node';
import { genericHandlers } from './generic.handlers';
import { profileHandlers } from './profile.handlers';
import { appkitHandlers } from './appkit.handlers';

export const server = setupServer(...genericHandlers, ...profileHandlers, ...appkitHandlers);
