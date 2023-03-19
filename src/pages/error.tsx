import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";

import MobileMenu from "../components/menus/mobileMenu/mobileMenu";

function Error404() {
  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>

      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-2 dark:bg-background-dark-mode">
        <p className="font-sans text-2xl text-center mt-16 font-medium dark:text-gray-1">
          Oops, page wasn't found
        </p>
      </div>
    </div>
  );
}

export default Error404;
