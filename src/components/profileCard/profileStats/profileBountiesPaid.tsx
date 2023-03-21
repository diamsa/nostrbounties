function BountiesPaid({ bountiesPaid }: any) {
  function bountyQuantity() {
    let itemAmount = bountiesPaid.filter((item: string) => item === "paid");
    return itemAmount.length;
  }

  return (
    <div className="bg-white border border-blue-1  rounded-lg p-3 m-2 shadow-md dark:bg-sidebar-bg">
      <div className="flex flex-col items-center">
        <h5 className="mb-1 text-2xl font-medium text-dark-text dark:text-gray-1">
          {bountyQuantity()}
        </h5>
        <span className="text-xs text-center text-gray-500 dark:text-gray-1 px-6">
          Bounties paid
        </span>
      </div>
    </div>
  );
}

export default BountiesPaid;
