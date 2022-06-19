import Game from '../../../components/Game';

const game = new Game();

Page({
  build() {
    game.run();
  },
  onInit() {

  },

  onDestroy() {
    game.stop();
  },
});