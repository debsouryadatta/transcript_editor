// types.ts
export interface TranscriptWord {
    word: string;
    start_time: number;
    duration: number;
  }
  
  export interface TranscriptEditorProps {
    initialTranscript: TranscriptWord[];
  }