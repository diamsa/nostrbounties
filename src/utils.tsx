import { RelayPool } from "nostr-relaypool";
import { nip19 } from "nostr-tools";

let defaultRelays = JSON.parse(localStorage.getItem("relays")!);

export function convertTimestamp(unixTimestamp: number): string {
  var myDate = new Date(unixTimestamp * 1000);
  let createdAt = myDate.toDateString();
  return createdAt;
}

export async function getPersonalRelays() {
  // @ts-ignore
  let personalRelays = await window.nostr.getRelays();
  return personalRelays;
}

export async function getPubKey() {
  // @ts-ignore
  let pubKey = await window.nostr.getPublicKey();
  return pubKey;
}

export async function sendReply(
  status: string | null,
  id: string,
  pubKey: string | undefined
) {
  if (status === null) {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["e", `${id}`],
        ["t", `bounty-reply`],
      ],
      content: "in progress",
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    if (EventMessageSigned.pubkey === pubKey) {
      let relays = defaultRelays;
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);
    } else {
      console.log("you are not allowed to reply status");
    }
  }

  if (status === "in progress") {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["e", `${id}`],
        ["t", "bounty-reply"],
      ],
      content: "paid",
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    if (EventMessageSigned.pubkey === pubKey) {
      let relays = defaultRelays;
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);
    } else {
      console.log("you are not allowed to reply status");
    }
  }

  if (status === "paid") {
    console.log("bounty paid");
  }
}

export async function addReward(amount: string, id: string) {
  if (amount === "") {
    console.log("add a value");
  } else {
    let formattedAmount = formatReward(amount);
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["t", "bounty-added-reward"],
        ["e", `${id}`],
      ],
      content: formattedAmount,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    console.log(EventMessageSigned.content);
    let relays = defaultRelays;
    let relayPool = new RelayPool(relays);

    relayPool.publish(EventMessageSigned, relays);
    console.log("posted");
  }
}

export function getNpub(pubkey: string) {
  let npub = nip19.npubEncode(pubkey);
  let arr_shortnpub = [];
  for (let i = 0; i < 20; i++) {
    arr_shortnpub.push(npub[i]);
  }
  let npubShortened = arr_shortnpub.join("");
  return npubShortened + "...";
}

export function formatReward(event: string) {
  const rewardUnformatted = parseInt(event);
  const rewardFormatted = rewardUnformatted
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return rewardFormatted;
}

export function getMetaData(pubkey: string) {
  let url = `https://rbr.bio/${pubkey}/metadata.json`;
  let data = fetch(url, {
    method: "get",
    mode: "cors",
  });

  return data;
}

