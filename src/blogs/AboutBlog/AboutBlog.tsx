import rawContent from "$assets/blogs/about.txt";
import { FC, useEffect, useState } from "react";
import Markdown from "react-markdown";

export const AboutBlog: FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    (async () => {
      await fetch(rawContent)
        .then((respond) => respond.text())
        .then((result) => setContent(result));
    })();
  }, []);

  return <Markdown>{content}</Markdown>;
};
