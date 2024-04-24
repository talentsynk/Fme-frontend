import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TrStyles } from "../mda/styles";
import { NocenterStyles } from "../stc/styles";


export const TRSkeleton = () => {
  return (
    <TrStyles>
      <td className="nocenter">
        <NocenterStyles>
          <Skeleton />
        </NocenterStyles>
      </td>
      <td>
        <p>
          <Skeleton />
        </p>
      </td>
      <td>
        <p>
          <Skeleton />
        </p>
      </td>
      <td>
        <p>
          <Skeleton />
        </p>
      </td>
      <td>
        <p>
          <Skeleton />
        </p>
      </td>
      <td>
        <p>
          <Skeleton />
        </p>
      </td>
    </TrStyles>
  );
};
