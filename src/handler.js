const config = require("../config");

const welcome = require("../features/welcome");
const menu = require("../features/menu");
const reseller = require("../features/reseller");
const katalog = require("../features/katalog");

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
// DAFTAR PRODUK
if(command === "produk"){

    await katalog.list(
        sock,
        from
    );

    return;
}


// DETAIL PRODUK
if(command.startsWith("cari ")){

    let nama =
    command.replace(
        "cari ",
        ""
    );

    await katalog.detail(
        sock,
        from,
        nama
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
