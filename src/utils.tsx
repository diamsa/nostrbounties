import { RelayPool } from "nostr-relaypool";
import { nip19 } from "nostr-tools";
import { defaultRelays, defaultRelaysToPublish } from "./const";

export function convertTimestamp(unixTimestamp: number): string {
  var myDate = new Date(unixTimestamp * 1000);
  let createdAt = myDate.toDateString();
  return createdAt;
}

export async function editBounty(event: any) {
  let relays = defaultRelaysToPublish;

  // @ts-ignore
  if (!window.nostr) {
    console.log("you need to install an extension");
  }
  // @ts-ignore
  let EventMessageSigned = await window.nostr.signEvent(event);
  console.log(EventMessageSigned.content);
  let relayPool = new RelayPool(relays);
  relayPool.publish(EventMessageSigned, relays);
  console.log("edited");
  return EventMessageSigned;
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
  pubKey: string,
  dTag: string
) {
  let relays = defaultRelays;

  if (status === "") {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["d", `${dTag}`],
        ["t", `bounty-reply`],
        ["a", `30023:${pubKey}:${dTag}`],
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
        ["d", `${dTag}`],
        ["t", "bounty-reply"],
        ["a", `30023:${pubKey}:${dTag}`],
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
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);
    } else {
      console.log("you are not allowed to reply status");
    }
  }

  if (status === "paid") {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["d", `${dTag}`],
        ["t", "bounty-reply"],
        ["a", `30023:${pubKey}:${dTag}`],
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
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);
    } else {
      console.log("you are not allowed to reply status");
    }
  }
}

export async function addReward(
  amount: string,
  pubkey: string,
  dTag: string
) {
  let relays = defaultRelays;

  if (amount === "") {
    console.log("add a value");
  } else {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["t", "bounty-added-reward"],
        ["a", `30023:${pubkey}:${dTag}`],
      ],
      content: amount,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    console.log(EventMessageSigned.content);

    let relayPool = new RelayPool(relays);

    relayPool.publish(EventMessageSigned, relays);
    console.log("posted");
  }
}
export async function sendComment(
  message: string,
  pubkey: string,
  dTag: string
) {
  let relays = defaultRelays;

  if (message === "") {
    console.log("add a comment");
  } else {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["d", dTag],
        ["t", "bounty-comment"]
      ],
      content: message,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    console.log(EventMessageSigned.content);

    let relayPool = new RelayPool(relays);

    relayPool.publish(EventMessageSigned, defaultRelays);
    console.log("posted");
  }
}

export function getNpub(pubkey: string) {
  let npub = nip19.npubEncode(pubkey);
  let arr_shortnpub = [];
  for (let i = 0; i < 12; i++) {
    arr_shortnpub.push(npub[i]);
  }
  let npubShortened = arr_shortnpub.join("");
  return npubShortened + "...";
}

export function formatReward(event: string | number) {
  if (typeof event === "string") {
    const rewardUnformatted = parseInt(event);
    const rewardFormatted = Intl.NumberFormat().format(rewardUnformatted);
    return rewardFormatted;
  } else {
    const rewardFormatted = Intl.NumberFormat().format(event);
    return rewardFormatted;
  }
}

export function getMetaData(pubkey: string) {
  let url = `https://rbr.bio/${pubkey}/metadata.json`;
  let data = fetch(url, {
    method: "get",
    mode: "cors",
  });

  return data;
}

export function isDarkTheme() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export async function deleteBounty(id: string) {
  let relays = defaultRelaysToPublish;

  let eventMessage = {
    id: null,
    pubkey: null,
    content: "",
    created_at: Math.floor(Date.now() / 1000),
    kind: 5,
    tags: [["e", `${id}`]],
    sig: null,
  };
  // @ts-ignore
  let EventMessageSigned = await window.nostr.signEvent(eventMessage);
  let relayPool = new RelayPool(relays);
  relayPool.publish(EventMessageSigned, relays);
  return EventMessageSigned;
}

export async function getRelayData(relay: string) {
  let url = `https://${relay}`;
  let data = await fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      Accept: "application/nostr+json",
    },
  });

  return data.json();
}
