import Image from "next/image";
import { useEffect, useState } from "react";

const ShimmerMessages = () => {
  const messages = [
    "Spinning my brain",
    "Thinking about your request",
    "Loading your message",
    "Processing your thoughts",
    "Generating a response",
    "Crafting a reply",
    "Formulating an answer",
    "Preparing your message",
    "Working on your request",
    "Creating a piece of art",
    "Designing your masterpiece",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image 
                    src="/logo.svg"
                    alt="Zolteon"
                    width={18}
                    height={18}
                    className="shrink-0"
                />
                <span className="text-sm font-medium">
                    Zolteon
                </span>
            </div>
            <div className="pl-8.5 flex flex-col gap-y-4">
                <ShimmerMessages/>
            </div>
        </div>
    )
};
