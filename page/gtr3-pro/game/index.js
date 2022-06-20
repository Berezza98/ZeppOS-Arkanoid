import Game from '../../../components/Game';

const game = new Game();

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