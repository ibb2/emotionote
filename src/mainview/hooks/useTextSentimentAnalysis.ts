import {
  analyzeTextSentiment,
  type TextSentiment,
} from "@/mainview/lib/analyzeTextSentiment";
import { useState } from "react";

export const useTextSentimentAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState<TextSentiment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setSentiment(null);
      setError("Write some note text before analyzing.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setSentiment(await analyzeTextSentiment(trimmedText));
    } catch (cause) {
      console.error("Failed to analyze text sentiment", cause);
      setError("Could not analyze this note.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeText,
    error,
    isLoading,
    sentiment,
  };
};
