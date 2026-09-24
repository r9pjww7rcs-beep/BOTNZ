async function show(sock,user){

await sock.sendMessage(
user,
{
text:
`╭─ ⋆｡˚✩ 𝓝𝓩𝓢𝓣𝓞𝓡𝓔 𝓜𝓮𝓷𝓾 ✩˚｡⋆ ─╮

Silakan pilih layanan:

┃ 🛒 Produk
┃ 💰 Harga
┃ 📌 Rules Grup
┃ 📦 Cara Order
┃ 🧾 Format Order
┃ 💳 Payment
┃ 👤 Admin
┃ 🎀 Reseller
┃ 📣 Promo
┃ ❓ Bantuan

Ketik nama menu yang ingin dilihat.

╰────────────────╯`
}
);

}


module.exports={
show
};
