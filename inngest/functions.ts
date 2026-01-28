import prisma from "@/lib/prisma"
import { inngest } from "./client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ step }) => {
    await step.sleep("Fetching Video", "5s")
    await step.sleep("Transcribing Video", "5s")
    await step.sleep("Sending to Gemini", "5s")

    const workflow = await step.run("creating-workflow", async () => {
      return await prisma.workflow.create({ 
        data: { name: 'test-workflow' }
      })
    })

    return workflow
  }
)