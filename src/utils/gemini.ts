const GEMINI_API_KEY = 'AIzaSyBM4Qwn6AgLcA_CjUNiztNWjIC9YccjK4w';

export const getTravelRecommendations = async (
  city: string,
  preferences: string[]
): Promise<string> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Give me travel recommendations for ${city} based on these preferences: ${preferences.join(', ')}. Include popular attractions, local cuisine, and budget-friendly tips.`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return 'Unable to fetch recommendations at this time. Please try again later.';
  }
};