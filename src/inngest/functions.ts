import { Sandbox } from "@e2b/code-interpreter";
import { gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("zolteon-nextjs-asai-123");
      return sandbox.sandboxId;
    });
    // add a code agent with a proper prompt
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer.You write readable, maintainable code. You write simple Next.js & React code use proper styling as well",
      model: gemini({ model: "gemini-1.5-flash" }),
    });
    const { output } = await codeAgent.run(
      `Write the  code for the given input: ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });

    return { output, sandboxUrl };
  }
);
