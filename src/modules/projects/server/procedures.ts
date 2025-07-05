import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
  getOne: baseProcedure

    .input(
      z.object({
        id: z.string().min(1, { message: "ID is required" }),
      })
    )

    .query(async ({ input }) => {
      const existingProjects = await prisma.project.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!existingProjects) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Project with ID ${input.id} not found`,
        });
      }

      return existingProjects;
    }),

  getMany: baseProcedure.query(async () => {
    const projects = await prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return projects;
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "Prompt is required" }).max(10000, {
          message: "Prompt must be less than 10,000 characters",
        }),
      })
    )
    .mutation(async ({ input }) => {
      const createdProject = await prisma.project.create({
        data: {
          name: generateSlug(2, {
            format: "kebab", // e.g., "my-project"
          }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
});
