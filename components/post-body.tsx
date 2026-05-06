import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import markdownStyles from "./markdown-styles.module.css";
import type { Post } from "../lib/types";

export default function PostBody({ content }: { content: Post["content"] }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles["markdown"]}>
        {documentToReactComponents(content.json)}
      </div>
    </div>
  );
}
