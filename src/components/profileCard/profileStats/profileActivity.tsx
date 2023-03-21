function profileActivity({ activity }: any) {
  return (
    <div className="bg-white border border-blue-1 rounded-lg p-3 m-2 shadow-md dark:bg-sidebar-bg">
      <div className="flex flex-col items-center">
        <p className="mb-1 text-2xl font-medium text-dark-text dark:text-gray-1">
          {activity < 10 ? "Low" : null}
          {activity > 11 && activity < 20 ? "Medium" : null}
          {activity >= 21 ? "High" : null}
        </p>
        <span className="text-xs text-center text-gray-500 dark:text-gray-1 px-6">
          activity in nostr in the last 30 days
        </span>
      </div>
    </div>
  );
}

export default profileActivity;
