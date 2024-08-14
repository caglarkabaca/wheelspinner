import { Scene } from 'phaser';
const TEXT_COLOR = '#3c005a';
const TEXT2_COLOR = '#EABFFF';

export class WinnerScene extends Scene {

    constructor() {
        super("WinnerScene");
    }

    preload() {
        this.load.image('logo', 'assets/icon.png')
    }

    create() {

        const winner = this.registry.get('winner')

        const logoImage = this.add.image(200, 200, 'logo')
        logoImage.setScale(0.2)
        const Ttext = this.add.text(200, 350, "KAZANDINIZ", {
            fontSize: '52px',
            color: TEXT_COLOR,
            fontFamily: 'Arial'
        });
        Ttext.setOrigin(0.5, 0.5);
        const text = this.add.text(200, 400, winner.title, {
            fontSize: '48px',
            color: TEXT_COLOR,
            fontFamily: 'Arial'
        });
        text.setOrigin(0.5, 0.5);

        const codetext = this.add.text(200, 450, winner.code, {
            fontSize: '52px',
            color: TEXT2_COLOR,
            fontFamily: 'Arial'
        });
        codetext.setOrigin(0.5, 0.5);

        const alttext = this.add.text(200, 525, winner.description, {
            fontSize: '18px',
            color: TEXT_COLOR,
            fontFamily: 'Arial',
            wordWrap: { width: 300, useAdvancedWrap: true },
            align: "center"
        });
        alttext.setOrigin(0.5, 0.5);

        // Button
        var buttonGraphics = this.add.graphics();
        buttonGraphics.fillStyle(0x3c005a, 1);
        buttonGraphics.fillRoundedRect(50, 600, 300, 50, 12);

        // Create the button text
        var buttonText = this.add.text(50 + 300 / 2, 600 + 50 / 2, 'Kuponu kullan', {
            fontSize: '24px',
            fill: '#ffffff'
        });
        buttonText.setOrigin(0.5, 0.5);
        buttonGraphics.setInteractive(new Phaser.Geom.Rectangle(50, 600, 300, 50), Phaser.Geom.Rectangle.Contains);

        buttonGraphics.on('pointerdown', function () {
            console.log('Button clicked!');
            buttonText.setText('Clicked!');
        });
    }

}