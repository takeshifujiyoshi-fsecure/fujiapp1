//
// 認証機能でメインページをラップ (HOC版)
//

import { Main } from './Main';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Amplify from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default withAuthenticator(Main);
