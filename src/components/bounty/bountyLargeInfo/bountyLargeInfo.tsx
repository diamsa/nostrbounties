import BountyStatus from "../bountyStatus/bountyStatus";

function BountyLargeInfor() {
    return ( <div class="my-4 mx-10 px-10 py-3 justify-between items-center flex border border-gray-200 rounded-lg shadow-md max-w-7xl md: flex-wrap">
    <div class="p-2">
      <div class="flex-wrap">
        <div>
          <p class="font-sans text-2xl font-semibold">Bounty manager</p>
          <p class="font-sans text-sm font-light mb-2">by NVK</p>
        </div>
        
        <p class="font-sans text-base font-ligh">Browsing view
It should show a list of available and closed bounties along with their amounts and who is offering the bounty (name and picture fetched from kind:0 events + npub, otherwise just npub).

When clicking a bounty the visitor should see the details of the bounty and the history of bounties offered from that same user and if they were paid or not. They are “paid” when there is an event replying to the bounty that states that (see below).

Bounty creation view
It should work with a soft-standard text format text on top of kind:1 posts. The flow should be something like:

user connects with a NIP-07 extension
writes title, amount and terms of the bounty
the app publishes the event with the "t" tag set to "bounty" and content set to something like
bounty: Build a wheel
description: A wheel must be built so it spins.
reward: 10000 sats
Additional bounty pledges
Other people should be able to add to the bounty. When showing that in the UI the additional pledges should be clearly separated from the original bounty, for example, "reward: 10000 sats + 542 sats", the 542 sats being the addition, in a different color.

There should be a button somewhere to add to the pledge. Any user should be able to click that, select the amount and press “ok” and then an event is sent as a reply to the original bounty offer, with "t" tag set to something like "bounty-added-reward" or something like that. These tags should be standardized.

The content should be something like:

added reward: 542 sats
Bounty award and bounty cancelation
A similar flow, with yet another special hashtag ("t") and again a standard format, should be published, again as a reply to the original bounty event. I’ll not be very specific here because that is not necessary.</p>
        <div class="w-250">
      <p class="font-sans text-base font-light mr-1 mt-1">
        20000 sats
      </p>
      <button class="font-sans text-base font-light underline mr-3 mt-1">Reply new state</button>
      <button class="font-sans text-base font-light underline mr-1 mt-1">Contact details</button>
      </div>
      </div>
      <div>
        <BountyStatus status="open"/>
      </div>
    </div>
  </div> 
  
  );
}

export default BountyLargeInfor;