import * as React from "react"

import { AutoCompletionContainer } from "./components/AutoCompletion"
import { Background } from "./components/Background"
import { Cursor } from "./components/Cursor"
import { CursorLine } from "./components/CursorLine"
import { EditorHost } from "./components/EditorHost"
import { Logs } from "./components/Logs"
import { MenuContainer } from "./components/Menu"
import { QuickInfoContainer, SignatureHelpContainer } from "./components/QuickInfo"

import { IEditor } from "./../Editor/Editor"

interface IRootComponentProps {
    editor: IEditor
}

export class RootComponent extends React.Component<IRootComponentProps, void> {
    public render() {

        return <div className="container full">
            <div className="layer">
                <Background />
            </div>
            <div className="layer">
                <div className="container full">
                    <EditorHost editor={this.props.editor} />
<<<<<<< HEAD
=======
                    <Cursor />
                    <CursorLine lineType={"line"} />
                    <CursorLine lineType={"column"} />
                    <SignatureHelpContainer />
                    <QuickInfoContainer />
                    <SignatureHelpContainer />
                    <MenuContainer />
                    <AutoCompletionContainer />
                    <Logs />
>>>>>>> parent of 17bad69... Refactor containers to separate files
                </div>
            </div>
            <div className="layer">
                <Cursor />
                <CursorLine lineType={"line"} />
                <CursorLine lineType={"column"} />
                <QuickInfoContainer />
                <SignatureHelpContainer />
                <MenuContainer />
                <AutoCompletionContainer />
                <Logs />
            </div>
        </div>
    }
}
