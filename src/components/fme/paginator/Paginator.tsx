import { WhiteArrowLeft, WhiteArrowRight } from "@/components/icons/main";
import { ArrowLeft } from "@/components/icons/recovery";
import styled from "styled-components";

interface IPaginator {
  incrementFunc: () => void;
  decrementFunc: () => void;
  value: number;
}
export const Paginator: React.FC<IPaginator> = ({
  incrementFunc,
  decrementFunc,
  value,
}) => {
  return (
    <PaginatorStyles>
      <div className="btn-cont">
        <button type="button" onClick={decrementFunc}>
          <WhiteArrowLeft />
        </button>
        <p>{value}</p>
        <button type="button" onClick={incrementFunc}>
          <WhiteArrowRight />
        </button>
      </div>
    </PaginatorStyles>
  );
};

export const PaginatorStyles = styled.div`
  margin-top: 2rem;
  padding-bottom: 1rem;
  dispay: flex;
  .btn-cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    p {
      text-decoration: underline;
      color: var(--text-style, #101928);
      font-family: "Satoshi";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    button {
      width: 2rem;
      height: 2rem;
      border: 2px solid #red;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--text-style, #101928);
      border-radius: 1.6875rem;
    }
  }
`;
