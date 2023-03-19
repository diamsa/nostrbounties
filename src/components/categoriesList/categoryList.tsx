import { useNavigate } from "react-router-dom";
type props = {
  currentPage: string;
};

function CategoryList({ currentPage }: props) {
  let navigate = useNavigate();
  return (
    <div>
      {currentPage === "root" ? (
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "design" ? (
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "development" ? (
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "marketing" ? (
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "writing" ? (
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "debugging" ? (
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
      {currentPage === "cybersecurity" ? (
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text  rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CategoryList;
