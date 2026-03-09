import { useEffect, useState } from "react";

const TYPING_SPEED = 100; // ms per character
const ERASING_SPEED = 60;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_ERASE = 400;

export function useTypingPlaceholder(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    if (isTyping) {
      if (text.length < currentWord.length) {
        const timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), PAUSE_AFTER_TYPE);
        return () => clearTimeout(timer);
      }
    } else {
      if (text.length > 0) {
        const timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, ERASING_SPEED);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }, PAUSE_AFTER_ERASE);
        return () => clearTimeout(timer);
      }
    }
  }, [text, isTyping, wordIndex, words]);

  return text;
}
