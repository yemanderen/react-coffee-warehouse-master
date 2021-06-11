import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import content from '../resources/content';

export const Richtext = (props) => {
const {
    Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent, OrderedList, UnorderedList,
    Undo, Redo, FontSize, FontName, FormatBlock,
    Link, Unlink, InsertImage, ViewHtml,
    InsertTable,
    AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter,
    DeleteRow, DeleteColumn, DeleteTable,
    MergeCells, SplitCell
} = EditorTools;

return (
    <Editor
        tools={[
            [Bold, Italic, Underline, Strikethrough],
            [Subscript, Superscript],
            [AlignLeft, AlignCenter, AlignRight, AlignJustify],
            [Indent, Outdent],
            [OrderedList, UnorderedList],
            FontSize, FontName, FormatBlock,
            [Undo, Redo],
            [Link, Unlink, InsertImage, ViewHtml],
            [InsertTable],
            [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
            [DeleteRow, DeleteColumn, DeleteTable],
            [MergeCells, SplitCell]
        ]}
        contentStyle={{ height: 630 }}
        defaultContent={content}
    />
);

}