import { gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer.You write readable, maintainable code. You write simple Next.js & React code use proper styling as well",
      model: gemini({ model: "gemini-1.5-flash" }),
    });
    const { output } = await codeAgent.run(
      `Write the  code for the given input: ${event.data.value}`
    );

    return { output };
  }
);
