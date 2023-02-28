export function convertTimestamp (unixTimestamp: number): string{
    var myDate = new Date( unixTimestamp * 1000);
    let createdAt = myDate.toDateString();
    return createdAt
}

export async function getPersonalRelays(){
let personalRelays = await window.nostr.getRelays();
return personalRelays
}

export async function getPubKey(){
    let pubKey = await window.nostr.getPublicKey();
    return pubKey
}