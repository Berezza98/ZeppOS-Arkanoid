import { TEXT_STYLE } from './index.style';
import Game from '../../../components/Game';

const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
Page({
  build() {
    logger.debug('page build invoked')
    console.log('FIRST RENDER');
    // const text = hmUI.createWidget(hmUI.widget.TEXT, TEXT_STYLE);
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