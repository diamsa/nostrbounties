import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultRelays from "../consts";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp } from "../utils";

import Header from "../components/header/header";
import BountyLargeInfor from "../components/bounty/bountyLargeInfo/bountyLargeInfo";


function BountyInfo() {
  const params:any = useParams();
  const [content, setContent] = useState<any>({});
  const [contactDetails, setContactDetails] = useState<any>({});
  const [pubKey, setPubkey] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [addedReward, setAddedReward] = useState([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let relays = defaultRelays;
    let subFilterContent:{ids:string}[] = [
      {
        // @ts-ignore
        ids: [params.id],
      },
    ];
    let subFilterStatus = [
      {
        "#e": [params.id],
        "#t": ["bounty-reply"],
      },
    ];
    let subFilterAddedReward = [
      {
        "#e": [params.id],
        "#t": ["bounty-added-reward"],
      },
    ];
    let arr_status: Array<string | undefined> = [];
    let arr_addedReward: { posterPubkey: string; amount: string }[] = [];

    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });
    //subscribe for content
    relayPool.subscribe(
      // @ts-ignore
      subFilterContent,
      relays,
      (event, isAfterEose, relayURL) => {
        // remember to parse the content
        let date: string = convertTimestamp(event.created_at);
        let parsedContent = JSON.parse(event.content);

        setContent({
          title: parsedContent.title,
          description: parsedContent.description,
          reward: parsedContent.reward,
        });

        setContactDetails({
          discord: parsedContent.discord,
          telegram: parsedContent.telegram,
          email: parsedContent.email,
          whatsapp: parsedContent.whatsapp,
        });
        setDate(date);
        setPubkey(event.pubkey);
      }
    );

    //subscribe for status
    relayPool.subscribe(
      subFilterStatus,
      relays,
      (event, isAfterEose, relayURL) => {
        arr_status.push(event.content);
        // @ts-ignore
        setStatus(arr_status[0]);
      }
    );

    //subscribe for bounty-added-reward
    relayPool.subscribe(
      subFilterAddedReward,
      relays,
      (event, isAfterEose, relayURL) => {
        let data = {
          posterPubkey: event.pubkey,
          amount: event.content,
        };
        arr_addedReward.push(data);
        console.log(arr_addedReward);
      }
    );

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
    }, 20000);

    setTimeout(() => {
      // @ts-ignore
      setAddedReward(arr_addedReward);
    }, 3500);
  }, []);

  return (
    <div className="max-w-7xl lg:px-40">
      <div>
        <Header />
      </div>
      <div>
        <BountyLargeInfor
          content={content}
          pubkey={pubKey}
          date={date}
          status={status}
          contact={contactDetails}
          id={params.id}
          addedReward={addedReward}
        />
      </div>
    </div>
  );
}

export default BountyInfo;
