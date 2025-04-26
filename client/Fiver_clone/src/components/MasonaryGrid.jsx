import React from "react";
import Masonry from "react-masonry-css";

export const MasonaryGrid = ({masonary}) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {masonary.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 rounded-lg mb-5">
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
               <p className="font-semibold text-[15px]">{item.name}</p>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};
