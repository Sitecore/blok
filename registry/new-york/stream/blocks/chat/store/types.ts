export interface ArtifactsProperties {
  open: boolean;
}

export interface Artifacts {
  [key: string]: ArtifactsProperties;
}

export type BrainstormingSearchTypeOptions =
  | 'web'
  | 'knowledge'
  | 'knowledge_web';

export type BrainstormingOptions =
  | {
      mode: 'brainstorming';
      params: {
        searchType: BrainstormingSearchTypeOptions;
      };
    }
  | undefined;

export type BrandKitDetailsModalStateOptions = 'create' | 'edit' | 'idle';

export type IsMessageAlreadyGeneratedProps = (message: string) => boolean;
