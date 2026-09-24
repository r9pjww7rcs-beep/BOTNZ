const fs = require("fs");

const database =
"./database/member.json";


function getMember(){

    return JSON.parse(
        fs.readFileSync(database)
    );

}


function saveMember(data){

    fs.writeFileSync(
        database,
        JSON.stringify(
            data,
            null,
            2
        )
    );

}


async function register(sock, user){

    let members=getMember();


    let check =
    members.find(
        x=>x.number===user
    );


    if(check){

        await sock.sendMessage(
            user,
            {
                text:
`╭─ ⋆｡˚✩ 𝓦𝓮𝓵𝓬𝓸𝓶𝓮 ✩˚｡⋆ ─╮

Selamat datang kembali di NZSTORE ✨

ID Member:
${check.id}

Ketik:
menu

untuk melihat layanan.

╰────────────────╯`
            }
        );

        return;

    }


    let id =
    "NZ" +
    String(
        members.length + 1
    ).padStart(4,"0");


    members.push({

        id:id,
        number:user,
        join:new Date()
        .toLocaleDateString()

    });


    saveMember(members);



    await sock.sendMessage(
        user,
        {
            text:
`╭─ ⋆｡˚✩ 𝓦𝓮𝓵𝓬𝓸𝓶𝓮 ✩˚｡⋆ ─╮

Selamat datang di NZSTORE ✨

Registrasi berhasil ✅

ID Member:
${id}

Silakan simpan ID member ini.

Ketik:
menu

untuk melihat layanan NZSTORE.

╰────────────────╯`
        }
    );

}


module.exports={
    register
};
