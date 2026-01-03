import { Helmet } from "react-helmet-async";
import { MarkdownEditor } from "@/components/MarkdownEditor";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Markdown Weaver – Online Markdown Editor with Live Preview</title>
        <meta
          name="description"
          content="Markdown Weaver is a fast, free online markdown editor with live preview, GitHub-flavored markdown, syntax highlighting, and export options."
        />
      </Helmet>

      <MarkdownEditor />
    </>
  );
};

export default Index;
