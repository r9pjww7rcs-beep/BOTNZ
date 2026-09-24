const fs = require("fs");

const database =
"./database/order.json";


function getOrder(){

return JSON.parse(
fs.readFileSync(database)
);

}


function saveOrder(data){

fs.writeFileSync(
database,
JSON.stringify(
data,
null,
2
)
);

}


function generateID(){

let data=getOrder();

return "NZORD" +
String(data.length+1)
.padStart(4,"0");

}



async function createOrder(
sock,
user,
detail
){

let orders=getOrder();


let id =
generateID();


let order={

id:id,

member:user,

produk:detail.produk,

paket:detail.paket,

nama:detail.nama,

status:"Menunggu Pembayaran",

tanggal:
new Date()
.toLocaleString()

};


orders.push(order);

saveOrder(orders);



await sock.sendMessage(
user,
{
text:
`╭─ ⋆｡˚✩ 𝓘𝓷𝓿𝓸𝓲𝓬𝓮 ✩˚｡⋆ ─╮

ID Order:
${id}

┃ Produk:
┃ ${detail.produk}

┃ Paket:
┃ ${detail.paket}

┃ Nama:
┃ ${detail.nama}

┃ Status:
┃ Menunggu Pembayaran

Silakan lanjut pembayaran
melalui payment NZSTORE ✨

╰────────────────╯`
}
);


// kirim admin

await sock.sendMessage(
process.env.OWNER_NUMBER+"@s.whatsapp.net",
{
text:
`🔔 ORDER BARU NZSTORE

ID:
${id}

Produk:
${detail.produk}

Paket:
${detail.paket}

Nama:
${detail.nama}

Status:
Menunggu Pembayaran`
}
);


}


module.exports={
createOrder
};
