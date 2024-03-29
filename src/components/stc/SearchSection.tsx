import { FilterSvg, SortSvg } from "./Svg"


const SearchSection = () => {
  return (
    <div className=" flex gap-6 mt-4">
      <input type="text" name="" id="stc-searchbar" className=" w-[85%] rounded-lg border-2 border-[red] focus:border-[#00932E] p-2" placeholder="Search MDAs" />
      <div className="w-[15%] flex cursor-pointer items-center justify-center gap-2 border-[#E4E7EC] border-2 rounded-lg text-sm font-medium text-[#667185] leading-[20px]">
        <div className=" flex gap-1 ">
            <FilterSvg />
            <span className="">Filter</span>
        </div>
        <div className=" flex gap-1">
            <SortSvg />
            <span className="">Sort</span>
        </div>
      </div>
    </div>
  )
}

export default SearchSection
