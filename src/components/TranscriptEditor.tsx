import React, { useState, useEffect } from 'react';
import { TranscriptEditorProps, TranscriptWord } from '../lib/types';
import Word from './Word';

const TranscriptEditor: React.FC<TranscriptEditorProps> = ({ initialTranscript }) => {
  const [transcript, setTranscript] = useState<TranscriptWord[]>(initialTranscript);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isPlaying) {
      const startTime = Date.now() - currentTime;
      intervalId = window.setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        setCurrentTime(elapsedTime);
      }, 10);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleWordEdit = (index: number, newWord: string) => {
    const newTranscript = [...transcript];
    newTranscript[index].word = newWord;
    setTranscript(newTranscript);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const totalDuration = transcript[transcript.length - 1].start_time + 
                        transcript[transcript.length - 1].duration;

  if (currentTime >= totalDuration) {
    handleReset();
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between mb-4">
        <button 
          onClick={handlePlay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button 
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
      <div className="mt-4 text-lg leading-relaxed">
        {transcript.map((item, index) => (
          <Word 
            key={`${item.word}-${item.start_time}`}
            word={item.word}
            startTime={item.start_time}
            duration={item.duration}
            currentTime={currentTime}
            onEdit={(newWord) => handleWordEdit(index, newWord)}
          />
        ))}
      </div>
      <div className="mt-4">
        Progress: {Math.min(100, (currentTime / totalDuration) * 100).toFixed(2)}%
      </div>
    </div>
  );
};

export default TranscriptEditor;