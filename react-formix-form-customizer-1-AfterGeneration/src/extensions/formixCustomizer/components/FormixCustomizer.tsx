import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';

import styles from './FormixCustomizer.module.scss';

export interface IFormixCustomizerProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'FormixCustomizer';

export default class FormixCustomizer extends React.Component<IFormixCustomizerProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: FormixCustomizer mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: FormixCustomizer unmounted');
  }

  public render(): React.ReactElement<{}> {
    return <div className={styles.formixCustomizer} />;
  }
}
