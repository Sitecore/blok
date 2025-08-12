import React from 'react';
import {
  ContentModelRead,
  ListUserChatMessagesModelResponseV2,
  Message,
} from '@sitecore/stream-ui-core';

import { MessageFeedback } from './MessageFeedback';
import { MessageAnnotation } from './types';

export interface FeedbackProps {
  message: Message &
    Pick<ListUserChatMessagesModelResponseV2, 'feedback'> & {
      content?: string | Array<ContentModelRead>;
    };
  isLastMessage: boolean;
  previousMessageContent?: string;
  messageId: string;
}

export function Feedback({
  messageId,
  message,
}: FeedbackProps): React.ReactNode {
  const messageAnnotation = message
    ?.annotations?.[0] as unknown as MessageAnnotation;
  const isMessageFeedbackAvailable = !!messageAnnotation?.id?.length;

  return (
    <div className='flex py-2 items-center rounded-lg w-full'>
      {isMessageFeedbackAvailable && (
        <>
          <MessageFeedback messageId={messageId} message={message} />
        </>
      )}
    </div>
  );
}
