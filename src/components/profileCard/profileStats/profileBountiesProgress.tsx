function BountiesProgress({ bountiesProgress }: any) {
  function bountyQuantity() {
    let itemAmount = bountiesProgress.filter(
      (item: string) => item === "in progress"
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
