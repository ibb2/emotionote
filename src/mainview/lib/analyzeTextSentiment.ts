import { pipeline } from "@huggingface/transformers";

export type TextSentiment = {
  label: string;
  score: number;
};

type SentimentAnalyzer = (
  text: string,
  options: { top_k: null },
) => Promise<TextSentiment[]>;

const MODEL_ID = "onnx-community/emotion-english-distilroberta-base-ONNX";

let analyzerPromise: Promise<SentimentAnalyzer> | null = null;

const getAnalyzer = async (): Promise<SentimentAnalyzer> => {
  analyzerPromise ??= pipeline("text-classification", MODEL_ID).then(
    (analyzer) => analyzer as SentimentAnalyzer,
  );

  return analyzerPromise;
};

export const analyzeTextSentiment = async (
  text: string,
): Promise<TextSentiment> => {
  const analyzer = await getAnalyzer();
  const result = await analyzer(text, { top_k: null });
  const topSentiment = result[0];

  if (!topSentiment) {
    throw new Error("No sentiment result returned.");
  }

  return topSentiment;
};
