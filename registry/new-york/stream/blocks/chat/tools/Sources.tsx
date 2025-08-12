import React from 'react';

import { Anchors } from '../Anchors';
import { LightBox } from '../LightBox';
import type { Source } from '../types';

export interface SourcesProps {
  testId?: string;
  sources: Source[];
}

export function Sources({
  testId = 'sources',
  sources,
}: SourcesProps): React.ReactNode {
  if (!sources?.length) return null;

  const urls = sources.filter(
    ({ type, url }) => type !== 'image' && !!url?.length
  );
  const images = sources.filter(
    ({ type, url }) => type === 'image' && !!url?.length
  );

  return (
    <div data-testid={testId} className='flex flex-col'>
      <LightBox images={images} />
      <Anchors testId={testId} items={urls} />
    </div>
  );
}
