import { Scene } from 'phaser';

export class PreloadScene extends Scene {
    constructor() {
        super("PreloadScene")
    }

    preload() {

    }

    create() {
        var uniqueCode = window.location.pathname.split('/')[1]
        if (uniqueCode.length <= 0)
            return
        var url = "https://localhost:7031/CampaignCoupon/" + uniqueCode
        this.spinnable = false
        fetch(url)
            .then((response) => response.json())
            .then((json) => {

                var datas = []
                json.coupons.forEach(data => {
                    datas.push(data)
                });
                this.registry.set('datas', datas)
                
                if (json.setting == null) {
                    json.setting = {
                        logoUrl: "https://winfluencer.app/wp-content/uploads/w-logo.png",
                        backgroundColor: "#080950",
                        startButtonText: "Çevirmek için tıkla",
                        endButtonText: "Kuponu kullanmak için tıkla",
                        successText: "Kazandınız\\n{title}\\nKodunuz: {code}\\n{description}",
                    }
                }
                this.registry.set('config', json.setting)
                this.scene.start("GameScene");
            })
    }
}