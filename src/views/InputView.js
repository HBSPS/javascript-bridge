const MissionUtils = require('@woowacourse/mission-utils');
const BRIDGE = require('../utils/Constants');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(funcList) {
    const [func1, func2, func3] = funcList;
    MissionUtils.Console.readLine('다리의 길이를 입력해주세요.\n', (input) => {
      try {
        func1.call(this, input);
        InputView.readMoving.call(this, func2, func3);
      }
      catch (error) {
        InputView.inputError(error);
      }
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(func2, func3) {
    MissionUtils.Console.readLine(`\n이동할 칸을 선택해주세요. (위: ${BRIDGE.letter.up}, 아래: ${BRIDGE.letter.down})\n`, (input) => {
      try {
        const [isEnd, isWin] = func2.call(this, input);
        if (isWin) InputView.gameEnd();
        else if (isEnd) InputView.readGameCommand.call(this, func3);
        else InputView.readMoving.call(this, func2, func3);
      }
      catch (error) {
        InputView.inputError(error);
      }
    });
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(func3) {
    MissionUtils.Console.readLine(`\n게임을 다시 시도할지 여부를 입력해주세요. (재시도: ${BRIDGE.game.retry}, 종료: ${BRIDGE.game.quit})\n`, (input) => {
      try {
        func3.call(this, input);
      }
      catch (error) {
        InputView.inputError(error);
      }
    });
  },

  gameEnd() {
    MissionUtils.Console.close();
  },

  inputError(error) {
    MissionUtils.Console.print(error);
    MissionUtils.Console.close();
  }
};

module.exports = InputView;
