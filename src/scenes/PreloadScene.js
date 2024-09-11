class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.script(
            "webfont",
            "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        );
    }

    create() {
        WebFont.load({
            google: {
                families: ["Montserrat"],
            },
        });
        this.spinnable = false;

        // const searchParams = new URLSearchParams(window.location.search);
        // var uniqueCode = searchParams.get("code");
        // if (uniqueCode.length <= 0) return;
        // const host = window.location.origin;
        // var url = host + "/CampaignCoupon/" + uniqueCode;
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         var datas = []
        //         json.coupons.forEach(data => {
        //             datas.push(data)
        //         });
        //         this.registry.set('datas', datas)

        //         if (json.setting == null) {
        //             json.setting = {
        //                 logoUrl: "https://winfluencer.app/wp-content/uploads/w-logo.png",
        //                 backgroundColor: "#080950",
        //                 startButtonText: "Çevirmek için tıkla",
        //                 endButtonText: "Siteye git",
        //                 successText: "Tebrikler {title} adlı kuponu kazandınız!\n{code} kodunu ile kuponunuzu kullanabilirsiniz.",
        //             }
        //         }
        //         this.registry.set('config', json.setting)

        //         document.getElementById("loader").remove()
        //         document.getElementById("mainApp").style.display = "flex"

        //         this.scene.start("GameScene");
        //     })

        // örnek bir kampanya verisi
        // {
        //     title: "TEST1",
        //     code: "CODE1",
        //     description: "DESC1",
        //     redirectUrl: "https://github.com",
        //     customcustomRedirectUrl: null
        // }

        // var datas = [
        //     {
        //         title: "TEST1",
        //         code: "CODE1",
        //         description: "DESC1",
        //         redirectUrl: "https://github.com",
        //     },
        //     {
        //         title: "TEST2",
        //         code: "CODE2",
        //         description: "DESC2",
        //         redirectUrl: "https://github.com",
        //     },
        //     {
        //         title: "TEST3",
        //         code: "CODE3",
        //         description: "DESC3",
        //         redirectUrl: "https://github.com",
        //     },
        //     {
        //         title: "TEST4",
        //         code: "CODE4",
        //         description: "DESC4",
        //         redirectUrl: "https://github.com",
        //     },
        // ];

        const searchParams = new URLSearchParams(window.location.search);
        var data = searchParams.get("data");

        if (data == null) {
            console.log("no data recieved");
            return;
        }

        var datas = JSON.parse(atob(data));

        this.registry.set("datas", datas);
        this.registry.set("config", {
            logoUrl: "https://winfluencer.app/wp-content/uploads/w-logo.png",
            backgroundColor: "#080950",
            startButtonText: "Çevirmek için tıkla",
            endButtonText: "Siteye git",
            successText:
                "Tebrikler {title} adlı kuponu kazandınız!\n{code} kodunu ile kuponunuzu kullanabilirsiniz.",
        });

        document.getElementById("loader").remove();
        document.getElementById("mainApp").style.display = "flex";

        this.scene.start("GameScene");
    }
}
