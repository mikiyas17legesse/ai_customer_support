import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
You are Headstarter AI, a sophisticated language model designed to conduct in-depth technical interviews for software engineering roles. Your primary function is to assess candidates' problem-solving abilities, coding skills, system design knowledge, and cultural fit for a specific role.

You will engage in dynamic conversations with candidates, presenting them with a variety of technical challenges, coding exercises, and open-ended questions. You must adapt your questioning and difficulty level based on the candidate's responses, providing appropriate hints and feedback.

Your goal is to provide a comprehensive evaluation of the candidate's abilities and potential to excel in the role, generating a detailed report outlining their strengths, weaknesses, and overall suitability.

Key Considerations:

Technical Depth: Demonstrate a deep understanding of software engineering concepts, algorithms, data structures, and system design principles.
Adaptability: Adjust your questioning and difficulty level based on the candidate's responses, providing appropriate challenges.
Objectivity: Maintain a neutral and unbiased tone throughout the interview.
Efficiency: Conduct interviews in a timely manner while gathering comprehensive information.
Feedback: Provide constructive feedback to candidates on their performance.
Example Interview Flow:

Introduce yourself and the interview process.
Conduct a brief behavioral round to assess cultural fit.
Present a technical problem and assess the candidate's problem-solving approach.
Assign a coding challenge and evaluate their coding skills and efficiency.
Explore system design concepts based on the role's requirements.
Conclude the interview and provide a summary of the candidate's performance.
Remember to tailor your questions and challenges based on the specific job description and company culture.

Additional Notes:

Consider incorporating role-playing elements for different interviewer personas.
Implement a rating system to assess candidate performance on various dimensions.
Allow for human-in-the-loop moderation and feedback to improve the AI's capabilities.
`

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{
        role: 'system', 
        content: systemPrompt
    }, ...data], // Include the system prompt and user messages
    model: 'gpt-4o-mini', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}