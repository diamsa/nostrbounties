import { RelayPool } from "nostr-relaypool";
import { nip19 } from "nostr-tools";
import { defaultRelays, defaultRelaysToPublish, allRelays } from "./const";
import { bech32 } from "bech32";

export function convertTimestamp(unixTimestamp: number): string {
  const now = Date.now();
  const diff = now - unixTimestamp * 1000;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 1) {
    return `${days} day ago`;
  } else if (days >= 2) {
    return `${days} days ago`;
  } else if (hours >= 1) {
    return `${hours} hours ago`;
  } else if (minutes >= 1) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
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

export function decodeNpubMention(content: string) {
  let npubs: string[] = [];
  const regex = /(nostr:)(.{1,63})/g;
  const match = content.match(regex);

  match?.map((item) => {
    let arrWithNpub = item.split(":");
    npubs.push(arrWithNpub[1]);
  });

  return npubs;
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
  currentStatus: string | null,
  bountyHunterNpub: string,
  dTag: string,
  posterPubkey: string,
  eventId: string,
  naddr: string
) {
  let relays = defaultRelays;
  let rootBountyUrl = `https://nostrbounties.com/b/${naddr}`;

  if (currentStatus === "") {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["d", dTag],
        ["status", "in progress"],
        ["t", "bounty-status"],
        ["a", `30023:${posterPubkey}:${dTag}`],
      ],
      content: `nostr:${bountyHunterNpub} was assigned to work on this bounty: ${rootBountyUrl} from nostrbounties.com`,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    if (EventMessageSigned.pubkey === posterPubkey) {
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);
    } else {
      console.log("you are not allowed to reply status");
    }
  }

  if (currentStatus === "in progress") {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["d", dTag],
        ["status", "paid"],
        ["t", "bounty-status"],
        ["a", `30023:${posterPubkey}:${dTag}`],
      ],
      content: `nostr:${bountyHunterNpub} got paid for completing this bounty: ${rootBountyUrl} from nostrbounties.com`,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    if (EventMessageSigned.pubkey === posterPubkey) {
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);
    } else {
      console.log("you are not allowed to reply status");
    }
  }

  if (currentStatus === "paid") {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["d", dTag],
        ["status", "in progress"],
        ["t", "bounty-status"],
        ["a", `30023:${posterPubkey}:${dTag}`],
      ],
      content: `nostr:${bountyHunterNpub} was assigned to work on this bounty: ${rootBountyUrl} from nostrbounties.com`,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);
    if (EventMessageSigned.pubkey === posterPubkey) {
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);
    } else {
      console.log("you are not allowed to reply status");
    }
  }
}

export async function addReward(
  amount: string,
  note: string,
  id: string,
  pubkey: string,
  dTag: string,
  naddr: string
) {
  let relays = defaultRelays;

  if (amount === "") {
    console.log("add a value");
  } else {
    let eventNote: string;
    let rootBountyUrl = `https://nostrbounties.com/b/${naddr}`;
    if (note.length > 0) {
      eventNote = `I just added ${amount} sats to ${rootBountyUrl}! ${note}`;
    } else {
      eventNote = `I just added ${amount} sats to ${rootBountyUrl}!`;
    }

    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["t", "bounty-added-reward"],
        ["reward", `${amount}`],
        ["a", `30023:${pubkey}:${dTag}`],
        ["e", `${id}`, "", "root"],
      ],
      content: eventNote,
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

export async function shareBounty(url: string) {
  try {
    await navigator.share({
      url: url,
    });
  } catch (error) {
    return true;
  }
}

export async function sendApplication(
  content: string,
  dTag: string,
  links: string[]
) {
  let relays = defaultRelays;

  if (content === "") {
    console.log("add a comment");
  } else {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [
        ["d", dTag],
        ["t", "bounty-application"],
        ["github", links[0]],
        ["personalWeb", links[1]],
      ],
      content: content,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
    }
    // @ts-ignore
    let EventMessageSigned = await window.nostr.signEvent(eventMessage);

    let relayPool = new RelayPool(relays);
    console.log("posted");
    relayPool.publish(EventMessageSigned, defaultRelays);
    return EventMessageSigned;
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

export async function deleteEvent(id: string) {
  let relays = allRelays;

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
  let relayNoProtocol: string;
  let url: string;

  if (relay.startsWith("wss://")) {
    relayNoProtocol = relay.replace(/^.{6}/, "");
    url = `https://${relayNoProtocol}`;
  } else {
    relayNoProtocol = relay.replace(/^.{5}/, "");
    url = `http://${relayNoProtocol}`;
  }

  let data = await fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      Accept: "application/nostr+json",
    },
  });

  return data.json();
}

export function getLNService(address: string) {
  let isLNUrl = address.toLowerCase().startsWith("lnurl");
  let isDecodedAddress = address.includes("@");

  if (isLNUrl) {
    let decoded = bech32.decode(address, 2000);
    let buf = bech32.fromWords(decoded.words);
    let decodedLNurl = new TextDecoder().decode(Uint8Array.from(buf));

    let service = decodedLNurl.split("@");
    let url = `https://${service[1]}/.well-known/lnurlp/${service[0]}`;

    let data = fetch(url).then((response) => {
      return response.json();
    });

    return data;
  }

  if (isDecodedAddress) {
    let service = address.split("@");
    let url = `https://${service[1]}/.well-known/lnurlp/${service[0]}`;

    let data = fetch(url).then((response) => {
      return response.json();
    });

    return data;
  }
}

export async function getLNInvoice(
  zapEvent: any,
  comment: string,
  LNService: any,
  amount: string
) {
  let hasPubkey = LNService.nostrPubkey;
  function getLNURL(url: string) {
    let data = fetch(url);

    return data;
  }

  if (hasPubkey) {
    if (comment !== "") {
      let baseUrl = `${LNService.callback}?amount=${amount}&comment=${comment}&nostr=${zapEvent}`;
      let data = getLNURL(baseUrl);
      return data;
    } else {
      let baseUrl = `${LNService.callback}?amount=${amount}&nostr=${zapEvent}`;
      let data = getLNURL(baseUrl);
      return data;
    }
  } else {
    if (comment !== "") {
      let baseUrl = `${LNService.callback}?amount=${amount}&comment=${comment}`;
      let data = getLNURL(baseUrl);
      return data;
    } else {
      let baseUrl = `${LNService.callback}?amount=${amount}`;
      let data = getLNURL(baseUrl);
      return data;
    }
  }
}

export async function getZapEvent(
  content: string,
  bountyHunterPubkey: string,
  posterPubkey: string,
  amount: string,
  nadrr: string
) {
  let eventMessage = {
    id: null,
    pubkey: null,
    created_at: Math.floor(Date.now() / 1000),
    kind: 9734,
    tags: [
      ["p", `${bountyHunterPubkey}`],
      ["a", `${nadrr}`],
      [
        "relays",
        "wss://relay.damus.io",
        "wss://nos.lol",
        "wss://nostr-pub-wellorder.net/",
        "wss://nostr.pleb.network",
      ],
      ["amount", `${amount}`],
    ],
    content: content,
    sig: null,
  };

  // @ts-ignore
  if (!window.nostr) {
    console.log("you need to install an extension");
  }
  // @ts-ignore
  let EventMessageSigned = await window.nostr.signEvent(eventMessage);
  if (EventMessageSigned.pubkey === posterPubkey) {
    return EventMessageSigned;
  } else {
    console.log("you are not allowed to pay this bounty");
  }
}

export function shortenedLNurl(element: string) {
  let arr_shortElementVersion = [];
  for (let i = 0; i < 26; i++) {
    arr_shortElementVersion.push(element[i]);
  }
  let elementShortened = arr_shortElementVersion.join("");
  return elementShortened + "...";
}
