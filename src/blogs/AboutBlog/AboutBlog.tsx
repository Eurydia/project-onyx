import rawContent from "$assets/blogs/about.txt";
import { CircularProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Markdown from "react-markdown";

export const AboutBlog: FC = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      return;
    }
    let busy = true;
    (async () => {
      await fetch(rawContent)
        .then((respond) => respond.text())
        .then((result) => {
          if (!busy) {
            return;
          }
          setContent(result);
          setLoading(false);
        });
    })();
    return () => {
      busy = false;
    };
  }, [loading]);

  if (loading) {
    return <CircularProgress variant="indeterminate" />;
  }

  return <Markdown>{content}</Markdown>;
};
