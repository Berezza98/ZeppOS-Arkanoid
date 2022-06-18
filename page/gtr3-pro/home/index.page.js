import Game from '../../../components/Game';

Page({
  build() {
    const game = new Game();
    game.run();
  },
  onInit() {
    logger.debug('page onInit invoked')
  },

  onDestroy() {
    logger.debug('page onDestroy invoked')
  },
})