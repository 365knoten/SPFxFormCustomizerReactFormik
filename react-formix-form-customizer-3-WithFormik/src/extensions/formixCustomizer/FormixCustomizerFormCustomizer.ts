import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FormDisplayMode } from '@microsoft/sp-core-library';
import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';

import FormixCustomizer, { IFormixCustomizerProps } from './components/FormixCustomizer';

import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFormixCustomizerFormCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}


export default class FormixCustomizerFormCustomizer
  extends BaseFormCustomizer<IFormixCustomizerFormCustomizerProperties> {

  private _spfi: SPFI;
  private _item: any = {};

  public onInit(): Promise<void> {
    // Setup PnPjs
    this._spfi = spfi().using(SPFx(this.context));

    if (this.context.itemId !== undefined) {
      // itemId is set on an Edit and Displayform
      // if it is set load data from SharePoint
      return this._spfi
        .web
        .lists
        .getById(this.context.list.guid.toString())
        .items
        .getById(this.context.itemId)()
        .then((item: any) => {
          // The following fields need to be removed from the item, if we want to save the object again
          delete item["odata.editLink"];
          delete item["odata.etag"];
          delete item["odata.id"];
          delete item["odata.metadata"];
          delete item["odata.type"];
          delete item.odata;
          this._item = item;
          console.log(item);
        })
    }

    return Promise.resolve();
  }

  public render(): void {
    // Use this method to perform your custom rendering.

    const formixCustomizer: React.ReactElement<{}> =
      React.createElement(FormixCustomizer, {
        item: this._item,
        context: this.context,
        displayMode: this.displayMode,
        onSave: this._onSave,
        onClose: this._onClose
      } as IFormixCustomizerProps);

    ReactDOM.render(formixCustomizer, this.domElement);
  }

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  private _onSave = (item: any): void => {

    // If we are in Edit Mode: Update the existing item
    if (this.displayMode === FormDisplayMode.Edit && this.context.itemId !== undefined) {
      this._spfi
        .web
        .lists
        .getById(this.context.list.guid.toString())
        .items
        .getById(this.context.itemId)
        .update(item)
        .then(() => {
          this.formSaved();
        })
    };

    // If we are in New Mode: Create a new Item
    if (this.displayMode === FormDisplayMode.New) {
      this._spfi
        .web
        .lists
        .getById(this.context.list.guid.toString())
        .items
        .add(item)
        .then(() => {
          this.formSaved();
        })
    }
  }

  private _onClose = (): void => {
    // You MUST call this.formClosed() after you close the form.
    this.formClosed();
  }
}
