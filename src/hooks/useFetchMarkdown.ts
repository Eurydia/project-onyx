import { useEffect, useState } from "react";

export const useFetchMarkdown = (path: string) => {
  const [content, setContent] = useState<string | null>(
    null
  );

  useEffect(() => {
    let isWorking = true;
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        if (!isWorking) {
          return;
        }
        setContent(text);
      });
    return () => {
      isWorking = false;
    };
  }, [path]);

  return content;
};
