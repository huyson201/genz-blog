
"use client"
import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SimpleMDE from 'easymde/types/easymde';
import "easymde/dist/easymde.min.css";
import { AlignCenterBtn, AlignJustifyBtn, AlignLeftBtn, AlignRightBtn, ImageButton } from './Custom'
import UploadImage from '../UploadImage/UploadImage';

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor").then(mod => mod.default), { ssr: false })

type Props = {}



const Editor = (props: Props) => {
    const [value, setValue] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [cm, setCm] = useState<CodeMirror.Editor | null>(null);

    const options: SimpleMDE.Options = useMemo(() => {
        ImageButton.onAction = () => {
            setOpenDialog(true)
        }

        return {
            autofocus: false,
            spellChecker: false,
            lineNumbers: false,
            insertText: {
                horizontalRule: ["", "\n\n-----\n\n"],
                link: ["[", "](https://)"],
                table: ["", "\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"]
            },
            toolbar: ["undo", "redo", "|", "bold", "italic", "strikethrough", "heading", "|",
                AlignLeftBtn, AlignCenterBtn, AlignRightBtn, AlignJustifyBtn, "|",
                "code", "quote", "unordered-list", "ordered-list", "clean-block", "|",
                "link", ImageButton, "table", "horizontal-rule", "|",
                "preview", "side-by-side", "fullscreen", "|", "guide"],
            tabSize: 4

        }
    }, []);

    const getCmInstanceCallback = React.useCallback((editor: CodeMirror.Editor) => {
        setCm(editor);
    }, []);

    const onChange = React.useCallback((value: string) => {
        setValue(value);
    }, []);

    const handleCloseDialog = React.useCallback(() => {
        setOpenDialog(false);
    }, []);

    const handleSelectImage = React.useCallback((url: string) => {
        if (!cm) return
        cm.replaceSelection(`\n ![alt](${url})`);
        setOpenDialog(false)
    }, [cm]);



    return (
        <>
            <SimpleMdeReact
                options={options}
                id='editor-custom'
                value={value}
                className='editor-custom'
                onChange={onChange}
                placeholder=''
                getCodemirrorInstance={getCmInstanceCallback} />
            <UploadImage open={openDialog} onRequestClose={handleCloseDialog} onSelectImage={handleSelectImage} />

        </>
    )
}

export default Editor