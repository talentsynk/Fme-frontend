interface StcTableProps {
  itemsPerPage: number;
}
"use client"
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { StcData } from '@/app/(data)/MockData';
import { StcDataInterface } from '@/app/(interface)/interface';
import Items from './Items';
// import TableRow from './TableRow';



  
  const StcTable: React.FC<StcTableProps> =({ itemsPerPage}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = StcData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(StcData.length / itemsPerPage);
    const handlePageClick = (event:any) => {
      const newOffset = (event.selected * itemsPerPage) % StcData.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
      <table className=' w-full border-collapse mt-4'>
        <thead className=''>
          <tr className=' text-[#344054] bg-[#F9FAFB] border-[#E4E7EC]'>
          <th className='p-2 text-left w-[33.3%] rounded-tl-[10px]'>NAME</th>
          <th className='p-2 text-left w-[11.1%]'>COURSES</th>
          <th className='p-2 text-left w-[11.1%]'>TOTAL STUDENTS</th>
          <th className='p-2 text-left w-[11.1%]'>ADDRESS</th>
          <th className='p-2 text-left w-[11.1%]'>STATE</th>
          <th className='p-2 text-left w-[22.2%] rounded-tr-[10px]'>STATUS</th>
          </tr>
        </thead>
        <tbody className=' border-2 border-[#F9FAFB]'>
        <Items currentItems={currentItems} />
        </tbody>

      </table>
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
      </>
    );
  }   

  export default StcTable