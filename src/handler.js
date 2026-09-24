const config = require("../config");

const welcome = require("../features/welcome");
const menu = require("../features/menu");
const reseller = require("../features/reseller");


async function messageHandler(sock, msg){

    const from = msg.key.remoteJid;

    const text =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    "";


    const command =
    text.toLowerCase().trim();


    console.log(
        "Pesan masuk:",
        command
    );


    // START REGISTRASI
    if(command === ".start"){

        await welcome.register(
            sock,
            from
        );

        return;
    }


    // MENU
    if(command === "menu"){

        await menu.show(
            sock,
            from
        );

        return;
    }


    // RESELLER
    if(command === "reseller"){

        await reseller.info(
            sock,
            from
        );

        return;
    }


    // DEFAULT
    await sock.sendMessage(
        from,
        {
            text:
`╭─ ⋆｡˚✩ 𝓑𝓪𝓷𝓽𝓾𝓪𝓷 ✩˚｡⋆ ─╮

Pesan belum dikenali kak ✨

Silakan ketik:
menu

untuk melihat layanan NZSTORE.

╰────────────────╯`
        }
    );

}


module.exports={
    messageHandler
};
