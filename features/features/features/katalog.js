const fs = require("fs");

const database =
"./database/produk.json";


function getProduk(){

return JSON.parse(
fs.readFileSync(database)
);

}


function formatProduk(data){

let pesan =
`╭─ ⋆｡˚✩ ${data.nama[0]} ✩˚｡⋆ ─╮

${data.nama}

╰──────────────╯

`;

data.paket.forEach(item=>{

pesan +=
`┃ • ${item.nama} — ${item.harga}
`;

});


pesan +=
`
┃
┃     ╰┈➤ Keterangan:
`;


data.keterangan.forEach(k=>{
pesan +=
`┃ • ${k}
`;
});


pesan +=
`
╰────────────────╯
`;

return pesan;

}



async function detail(sock,user,nama){

let produk =
getProduk();


let cari =
produk.find(
x =>
x.nama.toLowerCase()
===
nama.toLowerCase()
);


if(!cari){

await sock.sendMessage(
user,
{
text:
`Produk tidak ditemukan kak ✨

Silakan cek kembali nama produk.`
}
);

return;

}


await sock.sendMessage(
user,
{
text:
formatProduk(cari)
}
);


}


async function list(sock,user){

let produk =
getProduk();


let pesan =
`╭─ ⋆｡˚✩ Produk NZstore ✩˚｡⋆ ─╮

Silakan pilih produk:

`;


produk.forEach(p=>{

pesan +=
`┃ • ${p.nama}
`;

});


pesan +=
`
╰────────────────╯`;


await sock.sendMessage(
user,
{
text:pesan
}
);

}


module.exports={
detail,
list
};
