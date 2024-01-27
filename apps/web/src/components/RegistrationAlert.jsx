const RegistartionAlert = (props) => {
  return (
    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 w-full h-full bg-slate-100 bg-opacity-70 cursor-pointer"
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
        <button
          tabIndex="-1"
          type="button"
          className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
          onClick={props.onclickClose}
        >
          <svg
            title="Close"
            tabIndex="-1"
            className="h-4 w-4 cursor-pointer text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <div className="space-y-2 p-2">
          <div className="p-4 space-y-2 text-center dark:text-white">
            <h2
              className="text-xl font-bold tracking-tight"
              id="page-action.heading"
            >
              {props.title}
            </h2>

            <p className="text-gray-500">
              Are you sure you would like to do this?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistartionAlert;
