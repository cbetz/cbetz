import type { Document, Node, Block, Inline, Text } from "@contentful/rich-text-types";

export function richTextToMarkdown(doc: Document): string {
  return renderNodes(doc.content).trim() + "\n";
}

function renderNodes(nodes: readonly (Block | Inline | Text)[]): string {
  return nodes.map(renderNode).join("");
}

function renderNode(node: Node): string {
  switch (node.nodeType) {
    case "paragraph":
      return renderInline((node as Block).content) + "\n\n";
    case "heading-1":
      return "# " + renderInline((node as Block).content) + "\n\n";
    case "heading-2":
      return "## " + renderInline((node as Block).content) + "\n\n";
    case "heading-3":
      return "### " + renderInline((node as Block).content) + "\n\n";
    case "heading-4":
      return "#### " + renderInline((node as Block).content) + "\n\n";
    case "heading-5":
      return "##### " + renderInline((node as Block).content) + "\n\n";
    case "heading-6":
      return "###### " + renderInline((node as Block).content) + "\n\n";
    case "unordered-list":
      return renderList((node as Block).content, "- ") + "\n";
    case "ordered-list":
      return renderList((node as Block).content, null) + "\n";
    case "blockquote":
      return (
        "> " +
        renderInline((node as Block).content).replace(/\n/g, "\n> ") +
        "\n\n"
      );
    case "hr":
      return "---\n\n";
    case "embedded-asset-block": {
      const data = (node as Block).data as { target?: { fields?: { file?: { url?: string }; title?: string } } };
      const url = data.target?.fields?.file?.url;
      const title = data.target?.fields?.title ?? "";
      return url ? `![${title}](${url})\n\n` : "";
    }
    default:
      return renderInline((node as Block).content ?? []);
  }
}

function renderList(items: readonly (Block | Inline | Text)[], bullet: string | null): string {
  return items
    .map((item, i) => {
      const prefix = bullet ?? `${i + 1}. `;
      const content = (item as Block).content
        .map((child) => {
          if ((child as Block).nodeType === "paragraph") {
            return renderInline((child as Block).content);
          }
          return renderNode(child as Node);
        })
        .join("")
        .trim();
      return prefix + content;
    })
    .join("\n");
}

function renderInline(nodes: readonly (Block | Inline | Text)[]): string {
  return nodes
    .map((n) => {
      if ((n as Text).nodeType === "text") return renderText(n as Text);
      if ((n as Inline).nodeType === "hyperlink") {
        const inline = n as Inline;
        const uri = (inline.data as { uri?: string }).uri ?? "";
        return `[${renderInline(inline.content)}](${uri})`;
      }
      return renderInline((n as Block).content ?? []);
    })
    .join("");
}

function renderText(node: Text): string {
  let text = node.value;
  for (const mark of node.marks ?? []) {
    if (mark.type === "code") text = `\`${text}\``;
    else if (mark.type === "bold") text = `**${text}**`;
    else if (mark.type === "italic") text = `_${text}_`;
    else if (mark.type === "underline") text = `<u>${text}</u>`;
  }
  return text;
}
