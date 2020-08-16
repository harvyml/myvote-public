import React, { Component } from 'react'
import { Editor, ButtonBar, ButtonGroup, Field, Preview } from './pulse-editor'
import {
  Base,
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  Image,
  OrderedList,
  UnorderedList,
  Quote,
  Heading,
  Youtube,
} from './pulse-editor/buttons'

class MyEditor extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <Editor
          name="main-editor"
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange ? this.props.onChange : this.props.onChangedMarkdown}
          onDrop={this.props.onDrop}
          editorRef={this.props.editorRef}
          onFocus={this.props.onFocus}
        >
          <ButtonBar>
            <ButtonGroup>
              <Bold><strong>N</strong></Bold>
              <Italic><em>I</em></Italic>
            </ButtonGroup>

            <ButtonGroup>
              <Code>Insertar Codigo</Code>
              <Link>Link</Link>
              <Image>Imagen</Image>
            </ButtonGroup>

            <ButtonGroup>
              <OrderedList>1.</OrderedList>
              <UnorderedList>°</UnorderedList>
              <Quote>Frase</Quote>
              <Heading>T</Heading>
              <Youtube>YT</Youtube>
            </ButtonGroup>
          </ButtonBar>

          {/* you can use any DOM element or event custom components */}
          <div className="main-markdown-fields">
            {/* you can force an initial height for the field if it's server rendered */}
            <Field style={{ height: '39px' }} />
            <Preview />
          </div>

        </Editor>
        {
          this.props.button ? <button type="button" className="btn hoverable waves" onClick={this.props.send}>{this.props.buttonValue}</button>
          : null
        }
      </form>
    )
  }
}

export default MyEditor