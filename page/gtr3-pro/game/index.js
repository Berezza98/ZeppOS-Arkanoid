import Game from '../../../components/Game';

const game = new Game(getApp()._options.globalData.currentLevel);

Page({
  build() {
    // Disable scroll and gestures
    hmApp.registerGestureEvent(event => true);
    hmUI.setLayerScrolling(false);
    
    game.run();
  },
  onInit() {

  },

  onDestroy() {
    game.stop();
  },
});