function SatsAdded({ amount }: any) {
  return (
    <div className="Profile-Stat-Card">
      <h5 className="Profile-Stat-Stat">{amount}</h5>
      <span className="Profile-Stat-Subtext">Sats contributed to bounties</span>
    </div>
  );
}

export default SatsAdded;
