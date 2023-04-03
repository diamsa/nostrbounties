function IsNotLogged({ hideElement }: any) {
  setTimeout(() => {
    hideElement(false);
  }, 2000);

  return (
    <div className="bg-alert-1 px-4 py-2 fixed bottom-0 rounded-lg my-16 mx-72 sm:fixed z-30 sm:mb-24 sm:mx-20">
      <p className="text-gray-2 text-sm">Please sign in first</p>
    </div>
  );
}

export default IsNotLogged;
