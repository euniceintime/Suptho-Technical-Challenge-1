import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import path from 'path';
import classNames from 'classnames';

import { listFiles } from '../files';

import css from './index.module.css';

import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/esm/styles/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const TYPE_TO_ICON = {
  'text/plain': IconPlaintextSVG,
  'text/markdown': IconMarkdownSVG,
  'text/javascript': IconJavaScriptSVG,
  'application/json': IconJSONSVG,
};

function FilesTable({ files, activeFile, setActiveFile }) {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ''
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type],
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {(() => {
                  let saved = localStorage.getItem(file.name)
                    ? JSON.parse(localStorage.getItem(file.name))
                    : null;
                  if (saved) {
                    return new Date(saved.lastModified).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    );
                  } else {
                    return new Date(file.lastModified).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    );
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func,
};

function Previewer({ file }) {
  const [value, setValue] = useState('');
  // //make value into markdown
  // const mdParser = new MarkdownIt(/* Markdown-it options */);

  // console.log(file.name);
  useEffect(() => {
    (async () => {
      let saved = localStorage.getItem(file.name)
        ? JSON.parse(localStorage.getItem(file.name))
        : null;

      if (saved) {
        if (
          (file.name.includes('.json') || file.name.includes('.js')) &&
          !saved.text.trim().startsWith('```')
        )
          setValue('```\n' + saved.text);
        else setValue(saved.text);
      } else {
        if (file.name.includes('.json') || file.name.includes('.js'))
          setValue('```\n' + (await file.text()));
        else setValue(await file.text());
      }
    })();
  }, [file]);

  return (
    // <div className={css.preview}>
    //   <div className={css.title}>{path.basename(file.name)}</div>
    //   <div className={css.content}>{value}</div>
    // </div>
    // <HomePage />
    <div data-color-mode="dark">
      <MDEditor height={400} width={400} value={value} onChange={setValue} />
      <button className={css.btn} onClick={() => setLocalvalue(file, value)}>
        Save doc
      </button>
    </div>
  );
}
function setLocalvalue(file, val) {
  // localStorage.clear();
  localStorage.setItem(
    file.name,
    JSON.stringify({
      lastModified: new Date(),
      text: val,
    })
  );

  // let n = localStorage.getItem(file.name);
  alert('File saved!');
}
Previewer.propTypes = {
  file: PropTypes.object,
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  // "text/plain": PlaintextEditor,
  // "text/markdown": MarkdownEditor,
};

function SupthoEditorChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  const write = (file) => {
    console.log('Writing soon... ', file.name);

    // TODO: Write the file to the `files` array
  };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Suptho Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Suptho Engineering Challenge</div>
          <h1>Fun With Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://suptho.co/">Suptho Inc.</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at brandon@suptho.co
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {Editor && <Editor file={activeFile} write={write} />}
            {!Editor && <Previewer file={activeFile} />}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default SupthoEditorChallenge;
