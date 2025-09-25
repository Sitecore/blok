import { useContext } from 'react';

import { ChatContext } from '../stream-messages';

export const useChatProvider = () => {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error('useChatProvider must be used within a ChatProvider');
  }

  return context;
};
