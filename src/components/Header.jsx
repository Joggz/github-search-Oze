import React from "react";

const Header = () => {
  return (
    <div class="sticky top-0 z-40 ">
      <nav class=" h-20 bg-gray-50  drop-shadow-2xl shadow-black-500/50 flex justify-center items-center">
        <div class="w-11/12 flex items-center justify-around">
          <div class=" pl-14 flex-1 uppercase sm:text-sm sm:capitalize  sm:pl-4 text-xl  ">
            Search Github user
          </div>

          <div class=" flex flex-1 justify-end pr-14">
            <section class="flex items-center">
              <img
                class="w-10 h-10 rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
                alt=""
                width="5"
                height="5"
              />
              {/* <span class="px-4 opacity-40"> Account </span> */}
            </section>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
