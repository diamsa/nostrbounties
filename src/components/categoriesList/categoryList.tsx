import { useNavigate } from "react-router-dom";
type props = {
  currentPage: string;
};

function CategoryList({ currentPage }: props) {
  let navigate = useNavigate();
  return (
    <div>
      {currentPage === "root" ? (
        <div className="overflow-x-scroll flex no-scrollbar mx-5 mt-4 sm:mx-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-background-dark-mode dark:text-gray-2 dark:border-blue-1"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "design" ? (
        <div className="overflow-x-scroll flex no-scrollbar mx-5 mt-4 sm:mx-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-background-dark-mode dark:text-gray-2 dark:border-blue-1"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "development" ? (
        <div className="overflow-x-scroll flex no-scrollbar mx-5 mt-4 sm:mx-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-background-dark-mode dark:text-gray-2 dark:border-blue-1"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "marketing" ? (
        <div className="overflow-x-scroll flex no-scrollbar mx-5 mt-4 sm:mx-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-background-dark-mode dark:text-gray-2 dark:border-blue-1"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "writing" ? (
        <div className="overflow-x-scroll flex no-scrollbar mx-5 mt-4 sm:mx-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text whitespace-nowrap bg-gray-1 rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-background-dark-mode dark:text-gray-2 dark:border-blue-1"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "debugging" ? (
        <div className="overflow-x-scroll flex no-scrollbar mx-5 mt-4 sm:mx-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-background-dark-mode dark:text-gray-2 dark:border-blue-1"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "cybersecurity" ? (
        <div className="overflow-x-scroll flex no-scrollbar mx-5 mt-4 sm:mx-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 dark:focus:ring-gray-700 dark:bg-background-dark-mode dark:text-gray-2 dark:border-blue-1"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CategoryList;
