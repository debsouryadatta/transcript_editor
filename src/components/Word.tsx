import React, { useState } from 'react';

interface WordProps {
  word: string;
  startTime: number;
  duration: number;
  currentTime: number;
  onEdit: (newWord: string) => void;
}

const Word: React.FC<WordProps> = ({ word, startTime, duration, currentTime, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWord, setEditedWord] = useState(word);

  const isHighlighted = currentTime >= startTime && currentTime < startTime + duration;

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedWord.trim() !== '') {
      onEdit(editedWord);
    } else {
      setEditedWord(word);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
      <input
        value={editedWord}
        onChange={(e) => setEditedWord(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1"
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer mr-1 px-1 rounded ${
        isHighlighted ? 'bg-yellow-200' : ''
      } hover:bg-gray-100 transition-colors duration-150`}
    >
      {word}
    </span>
  );
};

export default Word;