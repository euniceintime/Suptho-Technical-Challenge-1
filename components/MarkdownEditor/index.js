import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/esm/styles/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);
const EditerMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

function HomePage() {
  const [value, setValue] = useState('**Hello world!!!**');
  return (
    <div data-color-mode="dark">
      <MDEditor height={400} width={400} value={value} onChange={setValue} />
      <div style={{ paddingTop: 50 }}>
        <EditerMarkdown source={value} />
      </div>
    </div>
  );
}

export default HomePage;
