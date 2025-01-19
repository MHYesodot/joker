import axios from "axios";

export const processWithHuggingFace = async (prompt: string) => {
  const url = "https://api-inference.huggingface.co/models/naltukhov/joke-generator-rus-t5";
  const headers = { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` };

  try {
    const response = await axios.post(
      url,
      { inputs: prompt },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error processing with Hugging Face:", error);
    throw new Error("Failed to process prompt.");
  }
};
