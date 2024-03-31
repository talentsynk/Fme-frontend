"use client";
interface MyComponentProps {
  currentItems: number[];
}
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import CourseCard from "@/components/course_list/CourseCard";
import CurrentCourse from "@/components/course_list/CurrentCourse";
import SearchSection from "@/components/stc/SearchSection";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "dashboard",
//   description: "dashboard for setting courses",
// };
const mockArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56]

const Items: React.FC<MyComponentProps> =({ currentItems })=> {
  return (
    <>
      {currentItems &&
        currentItems.map((coursecard) => (
          <CourseCard key={coursecard} post={coursecard} />
        ))}
    </>
  );
}


export default function Home() {
  // const mappedArray=mockArray.map(coursecard=>(<CourseCard key={coursecard} />))
  //mock data
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 35;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = mockArray.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(mockArray.length / 35);
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * 35) % mockArray.length;
    setItemOffset(newOffset);
  };

  //

    return (
      <section className="">
        <div className="flex justify-between items-center">
        <div className="">
          <h5 className=" text-2xl font-bold text-[#101928] leading-[32px]">Course List</h5>
          <p className=" text-sm text-[#667185] leading-[20px]">This shows all the courses that are being offered by STCs</p>
        </div>
        <div className=" flex  gap-4">
          <button className="px-3 py-2 rounded-md flex space-x-2.5  border-[#D0D5DD] border-[1px] border-solid bg-white">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8333 3.33333C10.8333 2.8731 10.4602 2.5 10 2.5C9.53976 2.5 9.16667 2.8731 9.16667 3.33333V9.16667H3.33333C2.8731 9.16667 2.5 9.53976 2.5 10C2.5 10.4602 2.8731 10.8333 3.33333 10.8333H9.16667V16.6667C9.16667 17.1269 9.53976 17.5 10 17.5C10.4602 17.5 10.8333 17.1269 10.8333 16.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H10.8333V3.33333Z" fill="#111111"/>
          </svg>
            <span className=" font-bold text-[#111111]  text-sm">Add new STC</span>
          </button>
          <button className=" bg-[#00932E] px-3 py-2 rounded-md flex space-x-2.5">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9987 11.7084C10.3439 11.7084 10.6237 11.9882 10.6237 12.3334V15.8245L11.2234 15.2248C11.4675 14.9807 11.8632 14.9807 12.1073 15.2248C12.3514 15.4689 12.3514 15.8646 12.1073 16.1087L10.4406 17.7754C10.1966 18.0194 9.80083 18.0194 9.55676 17.7754L7.89009 16.1087C7.64601 15.8646 7.64601 15.4689 7.89009 15.2248C8.13417 14.9807 8.5299 14.9807 8.77397 15.2248L9.3737 15.8245V12.3334C9.3737 11.9882 9.65352 11.7084 9.9987 11.7084Z" fill="white"/>
          <path d="M10.1872 1.91675C7.89545 1.91675 6.05029 3.75077 6.05029 5.99763C6.05029 6.38277 6.1042 6.75468 6.20477 7.10685C6.6191 7.22643 7.00696 7.40749 7.35741 7.63932C7.6453 7.82976 7.7243 8.21752 7.53386 8.50541C7.34342 8.7933 6.95565 8.8723 6.66776 8.68186C6.35042 8.47194 5.98967 8.32136 5.60144 8.24603C5.41659 8.21016 5.22507 8.19126 5.02846 8.19126C3.3942 8.19126 2.08203 9.49856 2.08203 11.0957C2.08203 12.6928 3.3942 14.0001 5.02846 14.0001C5.37364 14.0001 5.65346 14.2799 5.65346 14.6251C5.65346 14.9703 5.37364 15.2501 5.02846 15.2501C2.71783 15.2501 0.832031 13.397 0.832031 11.0957C0.832031 8.84213 2.64026 7.01848 4.88496 6.94365C4.8293 6.63637 4.80029 6.32019 4.80029 5.99763C4.80029 3.04651 7.21908 0.666748 10.1872 0.666748C12.8189 0.666748 15.0174 2.53649 15.4832 5.0178C17.3998 5.83134 18.7487 7.71616 18.7487 9.9192C18.7487 12.4808 16.9256 14.612 14.5044 15.1298C14.1669 15.202 13.8347 14.9869 13.7625 14.6493C13.6903 14.3118 13.9054 13.9796 14.243 13.9074C16.1094 13.5083 17.4987 11.8692 17.4987 9.9192C17.4987 8.1386 16.341 6.61747 14.7174 6.06228C14.2936 5.91735 13.8377 5.83832 13.3618 5.83832C12.8763 5.83832 12.4116 5.92057 11.9806 6.07113C11.6547 6.18496 11.2983 6.01306 11.1845 5.68719C11.0706 5.36132 11.2425 5.00487 11.5684 4.89105C12.1303 4.69479 12.7342 4.58832 13.3618 4.58832C13.608 4.58832 13.8506 4.60471 14.0884 4.63647C13.5212 3.05534 11.9922 1.91675 10.1872 1.91675Z" fill="white"/>
          </svg>
            <span className="font-bold text-white  text-sm">Export CSV</span>
          </button>
        </div>
        </div>
        <SearchSection />
        <section className="p-4 rounded-lg bg-white">
          <CurrentCourse />
        <div className=" flex flex-wrap gap-4 p-4 justify-evenly ">
        <Items currentItems={currentItems} />
        </div> 
        <ReactPaginate
          activeClassName={'item active '}
          breakClassName={'item break-me '}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          nextClassName={"item next "}
          pageClassName={'item pagination-page '}
          previousClassName={"item previous"}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />

        </section>
      </section>
    );
  }