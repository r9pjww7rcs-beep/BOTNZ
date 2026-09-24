const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const qrcode = require("qrcode-terminal");

const { messageHandler } = require("./handler");


async function startBot(){

    const { state, saveCreds } =
    await useMultiFileAuthState("./session");


    const sock = makeWASocket({
        auth: state,
        logger: pino({level:"silent"})
    });


    sock.ev.on("creds.update", saveCreds);


    sock.ev.on("connection.update",
    ({connection, qr})=>{

        if(qr){
            qrcode.generate(qr,{
                small:true
            });
        }


        if(connection==="open"){
            console.log(
            "✅ NZstore Bot berhasil terhubung"
            );
        }


        if(connection==="close"){
            console.log(
            "Koneksi terputus, mencoba ulang..."
            );

            startBot();
        }

    });


    sock.ev.on(
    "messages.upsert",
    async(data)=>{

        const msg=data.messages[0];

        if(!msg.message) return;

        await messageHandler(
            sock,
            msg
        );

    });


}


module.exports={
    startBot
};
