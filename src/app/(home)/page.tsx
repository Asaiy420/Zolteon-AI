import { ProjectForm } from "@/modules/home/ui/components/project-form";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl w-full mx-auto">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Zolteon"
            width={50}
            height={50}
            className="hidden md:block dark:invert"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Make your ideas come true with Zolteon
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create apps and websites by just writing a simple prompt.
        </p>
        <div className="max-w-3xl mx-auto w-full pt-15">
          <ProjectForm/> 
        </div>
      </section>
    </div>
  );
};

export default Page;
