# Nostr Bounty Event Format

`draft`

The [nostrbounties.com](https://nostrbounties.com) website serves as a client for finding and posting bounties to Nostr. This document outlines the structure of the tags used by this event type, aiming to enhance collaboration and compatibility with other bounty systems.

## Event format

This document specifies the use of event type `30023` (long form content) for Nostr bounty events:

- `t` hashtag(s)
- `title` bounty title
- `reward` bounty reward (in sats)
- `published_at` bounty publication Unix timestamp (seconds)
- `d` timestamp (seconds)

```json
{
  "id": "<event id>",
  "pubkey": "<bounty creator public key>",
  "created_at: <event creation timestamp>,
  "kind": <30023>,
  "tags": [
    ["t", <hashtag>],
    ["title", <bounty title>],
    ["reward", <bounty reward>],
    ["published_at", <bounty publication timestamp>],
    ["d", <timestamp>]
  ],
  "content": "<bounty description>",
  "sig": <signature>
}
```

## Example:
```json
{
  "id": "aa261c71c3e551b4186ecedcde029cce01ab62af0f377e2894d06583f94d717e",
  "pubkey": "21b419102da8fc0ba90484aec934bf55b7abcf75eedb39124e8d75e491f41a5e",
  "created_at: 1700681922,
  "kind": 30023,
  "tags": [
    [
       "t",
       "bounty"
    ],
    [
       "title",
       "NostrBounties: Document Event Structure"
    ],
    [
       "reward",
       "10000"
    ],
    [
       "published_at",
       "1700681922"
    ],
    [
       "d",
       "1700681922"
    ],
    [
       "t",
       "development-bounty"
    ],
    [
       "t",
       "writing-bounty"
    ]
  ],
  "content": "The nostrbounties.com website is a nostr client for finding and posting bounties to nostr.  To improve collaboration and compatibility with other bounty systems, it would be helpful if the structure of events were documented to avoid the need to reverse engineer/infer the structure\n\nTo satisfy this bounty,\n\n- a markdown file should be added to the code repository for nostr bounties (https://github.com/diamsa/nostrbounties/tree/master)\n- a section of the file should explain the event structure and provide sample json for a new nostr bounty, including the required tags for association\n- a section of the file should explain event structure and provide sample json for adding to a nostr bounty\n- an optional section can address historical/deprecated formats but this is NOT required to satisfy the bounty,
  "sig": "f91303eaff850ba57ac4f8dbe6733d7bed97cd370ba0be7c1d537106ed44ac05ec16816612901c66b80a480609702396b25deb8dfe2a86c49e3bf02ad75ade04"
}
```
