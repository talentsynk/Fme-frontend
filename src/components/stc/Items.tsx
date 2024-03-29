import { StcDataInterface } from '@/app/(interface)/interface';
interface MyComponentProps {
    currentItems: StcDataInterface[];
  }
import TableRow from './TableRow';


const Items: React.FC<MyComponentProps> =({ currentItems })=> {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <TableRow key={item?.id} name={item?.name} courses={item?.courses} total_students={item?.total_students} address={item?.address} state={item?.state} status={item?.status} />
          ))}
      </>
    );
  }

  export default Items;