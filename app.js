import { LOCAL_STORAGE_KEY } from "./consts"
import LocalStorage from "./utils/LocalStorage"

App({
  globalData: {
    localStorage: null,
    currentLevel: 1
  },
  onCreate(options) {
    this.globalData.localStorage = new LocalStorage(LOCAL_STORAGE_KEY);
    // RESET CURRENT LEVEL TO 1
    // this.globalData.localStorage.set({
    //   currentLevel: 1
    // });

    const data = this.globalData.localStorage.get();
    this.globalData.currentLevel = data.currentLevel || 1;
  },

  onDestroy(options) {

  }
})
