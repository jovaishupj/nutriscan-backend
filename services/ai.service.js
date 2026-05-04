import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeFoodImage = async (imageUrl) => {
  try {
    const imageBase64 = fs.readFileSync(imageUrl, {
      encoding: "base64",
    });
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      temperature: 0,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Analyze this image.

If it contains food:
- Set "is_food": true
Analyze this food image.

- Identify all food items clearly.
- Estimate calories based on standard portion sizes.
- Be consistent in estimation and avoid large variation.
- Do not guess widely different values for the same item.
- If multiple food items are present, return an array of items with:
  name, calories, protein, carbs, fat
- Also include "total_calories" as sum of all items


If it is not a food image:
- Set "is_food": false
For each food item, include a confidence score between 0 and 1 indicating how certain you are. and 
include average confidence as overall_confidence in score between 0 and 1
Be consistent in calorie estimation. Avoid large variation.
Return ONLY valid JSON. No markdown, no explanation.



Return ONLY valid JSON.

Expected format:

{
  "is_food": true,
  "items": [
    {
      "name": "food item",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number
      "confidence": number"
    }
  ],
  "overall_confidence:number
  "total_calories": number
}`,
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${imageBase64}`,
            },
          ],
        },
      ],
    });

    let output = response.output[0].content[0].text;

    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(output);
    parsed.items = parsed.items.map((item) => ({
      ...item,
      calories: Math.round(item.calories),
      protein: Math.round(item.protein),
      carbs: Math.round(item.carbs),
      fat: Math.round(item.fat),
    }));
    return parsed;
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("AI analysis failed");
  }
};

export default analyzeFoodImage;
