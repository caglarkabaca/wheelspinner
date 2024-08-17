import { Scene } from 'phaser';
const colors = [0xEABFFF, 0xD580FF];
const TEXT_COLOR = '#3c005a';


export class GameScene extends Scene {

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.baseURL = 'https://dummyimage.com/';
        this.load.crossOrigin = 'anonymous';
        this.load.image('logo', '600x200/000/fff')

        this.datas = []
        // api olayları
        var uniqueCode = window.location.pathname.split('/')[1]
        if (uniqueCode.length <= 0)
            return
        var url = "https://localhost:7031/CampaignCoupon/" + uniqueCode
        this.spinnable = false
        console.log(customObj.name);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                json.forEach(data => {
                    this.datas.push(data)
                });
                this.spinnable = true
                var h = 150 + 275;
                this.createSpinWheel(h)
            })
    }

    create() {
        const logoImage = this.add.image(200, 150, 'logo')
        logoImage.setScale(0.6)

        const alttext = this.add.text(200, 750, 'Çevirmek için tıklayın', {
            fontSize: '28px',
            color: "#ffffff",
            fontFamily: 'Arial'
        });
        alttext.setOrigin(0.5, 0.5);
        const bonsss = alttext.getBounds()

        var graphics = this.make.graphics();
        graphics.fillStyle(0x3c005a, 1);
        graphics.fillRoundedRect(0, 0, bonsss.width + 50, bonsss.height + 50);
        graphics.generateTexture("asdas", bonsss.width + 50, bonsss.height + 50);
        const alttextbg = this.add.sprite(bonsss.centerX, bonsss.centerY, "asdas")
        alttextbg.setOrigin(0.5, 0.5)
        alttextbg.depth = -1

        this.input.on("pointerdown", this.spin, this)
    }

    spin() {
        if (!this.spinnable)
            return;

        this.spinnable = false
        const angle = 360 / this.datas.length;
        var rounds = Phaser.Math.Between(2, 4);
        var prize = Phaser.Math.Between(0, this.datas.length - 1);

        this.tweens.add({

            targets: [this.wheel],
            angle: 360 * rounds + (240 - prize * angle) % 360,
            duration: 2000,
            ease: "Cubic.easeOut",
            callbackScope: this,

            onComplete: function (_) {
                const winner = this.datas[prize]
                this.registry.set('winner', winner)
                this.spinnable = true

                this.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                        this.scene.start("WinnerScene");
                    }
                })

            }
        });
    }

    createSpinWheel(h) {
        // bg
        {
            var graphics = this.make.graphics({
                x: 0,
                y: 0,
                add: false
            });
            graphics.fillStyle(0xFFBFFF, 1);
            graphics.fillCircle(180, 180, 180);
            graphics.generateTexture("wheelbg", 180 * 2, 180 * 2);
            const bg = this.add.sprite(200, h, "wheelbg")
            var graphics = this.make.graphics({
                x: 0,
                y: 0,
                add: false
            });
            graphics.fillStyle(TEXT_COLOR, 1);
            graphics.fillTriangle(170, 0, 190, 0, 180, 15)
            graphics.generateTexture("wheelbgTriangle", 180 * 2, 180 * 2);
            const bgTriangle = this.add.sprite(200, h, "wheelbgTriangle")
            bgTriangle.depth = 1
        }

        // wheel

        const parts = []
        const angle = 360 / this.datas.length;

        // looping through each slice
        for (var i = 0; i < this.datas.length; i++) {
            // making a graphic object without adding it to the game
            var graphics = this.make.graphics({
                x: 0,
                y: 0,
                add: false
            });
            // setting graphics fill style
            graphics.fillStyle(colors[i % 2], 1);
            // drawing the slice
            graphics.slice(175, 175, 175, Phaser.Math.DegToRad(i * angle), Phaser.Math.DegToRad((i + 1) * angle), false);
            // filling the slice
            graphics.fillPath();
            graphics.generateTexture("label" + i, 175 * 2, 175 * 2);
            const _part = this.add.sprite(0, 0, "label" + i)
            _part.setOrigin(0.5, 0.5)
            _part.depth = -1

            const radianAngle = Phaser.Math.DegToRad(angle * i + angle / 2);

            const text = this.add.text(175 * 0.5 * Math.cos(radianAngle), 175 * 0.5 * Math.sin(radianAngle), this.datas[i].title, {
                fontSize: '22px',
                color: TEXT_COLOR,
                fontFamily: 'Arial',
                strokeThickness: 5
            });
            text.setOrigin(0.5, 0.5)
            text.angle = angle * i + angle / 2
            parts.push(this.add.container(0, 0, [_part, text]))
        }
        this.wheel = this.add.container(200, h, parts);
    }
}