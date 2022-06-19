import Game from '../../../components/Game';

const game = new Game();

Page({
  build() {
    game.run();
  },
  onInit() {
    logger.debug('Game page onInit invoked')
  },

  onDestroy() {
    game.stop();

    logger.debug('Game page onDestroy invoked')
  },
});