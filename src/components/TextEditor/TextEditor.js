import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState, useEffect } from 'react';

function MyEditor() {
  const [editorState, setEditorState] = useState('');
  function handleChangeText(state) {}

  return <Editor editorState={editorState} onChange={setEditorState} />;
}

export default MyEditor;
