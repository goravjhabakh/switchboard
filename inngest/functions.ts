import { inngest } from "./client"
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI()

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "execute/workflow" },
  async ({ step }) => {
    const { steps } = await step.ai.wrap("generate-text", generateText, {
      system: "You are a helpful assistant.",
      prompt: "Write a vegetarian lasagna recipe for 4 people in less than 100 words.",
      model: google("gemini-2.5-flash")
    })
    return steps
  }
)