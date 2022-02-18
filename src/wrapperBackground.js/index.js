import React from "react";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-50 overflow-x-hidden min-h-screen  pb-10">
      {children}
    </div>
  );
};

export default BackgroundWrapper;
