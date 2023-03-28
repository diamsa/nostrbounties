function profileActivity({ activity }: any) {
  return (
    <div className="Profile-Stat-Card">
      <h5 className="Profile-Stat-Stat">
        {activity < 10 ? "Low" : null}
        {activity > 11 && activity < 20 ? "Medium" : null}
        {activity >= 21 ? "High" : null}
      </h5>
      <span className="Profile-Stat-Subtext">Nostr activity, last 30 days</span>
    </div>
  );
}

export default profileActivity;
