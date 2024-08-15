import { Game } from 'phaser';

import {GameScene} from './scenes/GameScene.js'
import {WinnerScene} from './scenes/WinnerScene.js'

//  Find out more information about the Game Config at: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 866,
    parent: 'game-container',
    backgroundColor: '#080950',
    scene: [
        GameScene,
        WinnerScene
    ]
};

export default new Game(config);

