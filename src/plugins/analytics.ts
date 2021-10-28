// Import the functions you need from the SDKs you need

import * as firebase from 'firebase/app';

import { FirebaseApp } from 'firebase/app';
import { Analytics, getAnalytics, isSupported } from 'firebase/analytics';

import app from '@/plugins/app';

type FBState = {
  fb?: FirebaseApp;
  analytics?: Analytics;
};

const fbApp = firebase.initializeApp(JSON.parse(app.fbConfig));

const state: FBState = {
  fb: fbApp,
};

isSupported().then((val) => {
  if (val) {
    state.analytics = getAnalytics(state.fb);
  }
});

export default state;
