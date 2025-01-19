import { processWithHuggingFace } from "../services/huggingFace";

export const handlePrompt = async (msg: string) => {
  const prompt = JSON.parse(msg);
  const result = await processWithHuggingFace(prompt.text);

  // אפשרות לשמור ל-DB או לשלוח תוצאה לתור נוסף
  console.log("Processed Result:", result);
  return result;
};
