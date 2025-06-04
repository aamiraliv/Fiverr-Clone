const CategoryCard = ({ category, onCategoryClick, isActive }) => {
  return (
    <div
      onClick={() => onCategoryClick(category)}
      className={` relative w-[120px] h-[120px] flex-shrink-0 bg-white rounded-2xl shadow-sm p-4 overflow-hidden border transition-all duration-200 cursor-pointer ${
        isActive
          ? "border-green-500 bg-gradient-radial from-green-500/20 from-10% to-white shadow-md"
          : "border-gray-200 hover:bg-gradient-radial hover:from-green-500/10 hover:from-10% hover:to-white hover:shadow-md"
      }`}
    >
      <div className="absolute -bottom-5 opacity-10 -right-2" >{category.img}</div>
      <div className="flex flex-col gap-2">
        <div className="flex-shrink-0">{category.icon}</div>
        <div className="font-semibold text-gray-800 text-[12px] leading-tight">
          {category.title}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
