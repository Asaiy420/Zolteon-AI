import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { projectId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  );

  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    })
  );

  return (
    <HydrationBoundary>
      ProjectId: {projectId}
    </HydrationBoundary>
  )
};

export default Page;
