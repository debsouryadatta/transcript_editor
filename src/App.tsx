// App.tsx
import React from "react";
import TranscriptEditor from "./components/TranscriptEditor";
import { TranscriptWord } from "./lib/types";

const initialTranscript: TranscriptWord[] = [
  { word: "Hello", start_time: 0, duration: 500 },
  { word: "world", start_time: 500, duration: 700 },
  { word: "This", start_time: 1200, duration: 300 },
  { word: "is", start_time: 1500, duration: 200 },
  { word: "a", start_time: 1700, duration: 100 },
  { word: "test", start_time: 1800, duration: 400 },
  { word: "transcript", start_time: 2200, duration: 600 },

  { word: "for", start_time: 2800, duration: 200 },

  { word: "playback", start_time: 3000, duration: 500 },

  { word: "and", start_time: 3500, duration: 250 },

  { word: "editing", start_time: 3750, duration: 800 },
  { word: "features.", start_time: 4550, duration: 650 },
];

const App: React.FC = () => {
  return (
    <div className="App flex flex-col items-center bg-teal-300 h-[100vh]">
      <div className="pt-24 pb-16">
        <h2 className="py-4 px-4 rounded-xl bg-lime-300 font-semibold text-4xl">Transcript Editor</h2>
      </div>
      <TranscriptEditor initialTranscript={initialTranscript} />
    </div>
  );
};

export default App;
