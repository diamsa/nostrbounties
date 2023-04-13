function BountiesProgress({ bountiesProgress }: any) {
  function bountyQuantity() {
    let arrBountiesInProgress = Object.values(bountiesProgress);
    let itemAmount = arrBountiesInProgress.filter(
      (item: any) => item[0] === "in progress"
    );
    return itemAmount.length;
  }

  return (
    <div className="Profile-Stat-Card">
      <h5 className="Profile-Stat-Stat">{bountyQuantity()}</h5>
      <span className="Profile-Stat-Subtext">Bounties In progress</span>
    </div>
  );
}

export default BountiesProgress;
