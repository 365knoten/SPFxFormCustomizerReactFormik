import * as React from 'react';
import { FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react";


export interface IFormixCustomizerProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: (item: any) => void;
  onClose: () => void;
  item: any; //<-- New  
}

export const FormixCustomizer = (props: IFormixCustomizerProps) => {
  const [text, setText] = React.useState(props.item.Title)
  return <div>
    <TextField
      name="Title"
      value={text}
      label="Title"
      onChange={(e, value) => {
        setText(value);
      }}
    />
    <PrimaryButton text="Save" onClick={
      () => {
        props.item.Title = text;
        props.onSave(props.item)
      }
    } />
    <DefaultButton text="Cancel" onClick={
      () => {
        props.onClose()
      }
    } />
  </div>
}

export default FormixCustomizer;
