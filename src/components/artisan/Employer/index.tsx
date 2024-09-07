interface IArtisan{
  AverageRating:number;
  BusinessDescription:string;
  BusinessName:string;
  FirstName?:string;
  LastName?:string;
  ID:number;
}
import Image from "next/image";
import {
  ReviewCompStyles,
  ReviewModalStyles,
  SimilarArtisanCompStyle,
  SimilarEmployerCompStyle,
} from "./style";
import {
  FilledStar,
  GreenTick,
  RatingIcon,
  SmallBriefCaseIcon,
  UnFilledStar,
} from "@/components/icons/artisan/icons";
import { TagStyle, VerifiedBadge } from "../style";
import { useRouter } from "next/navigation";
import { XIcon } from "@/components/icons/sidebar";
import { ChangeEvent, useState } from "react";
import { truncateString } from "@/utils/truncateString";

export const SimilarComp = () => {
  const router = useRouter();
  return (
    <SimilarEmployerCompStyle
      onClick={() => router.push("/dashboard/artisan/jobs/employer/0")}
    >
      <div className="img">
        <Image
          src="/images/frame_2.png"
          width={0}
          height={214}
          sizes="100%"
          alt="avatar"
        />
      </div>
      <div className="hl">
        <h4>Oragon Confectionaries</h4>
        <VerifiedBadge>
          <GreenTick />
          <p>Verified</p>
        </VerifiedBadge>
      </div>
      <div className="same rt">
        <RatingIcon />
        <p>4.5/5</p>
      </div>
      <div className="same">
        <SmallBriefCaseIcon />
        <p>12 Jobs Posted</p>
      </div>
    </SimilarEmployerCompStyle>
  );
};


export const SimilarArtisanComp:React.FC<IArtisan> = ({AverageRating,BusinessName,BusinessDescription,FirstName,LastName,ID}) => {
  const router = useRouter();
  return (
    <SimilarArtisanCompStyle
      onClick={() => router.push(`/dashboard/employer/hire/${ID}`)}
    >
      <div className="img">
        <Image
          src="/images/frame_3.png"
          width={0}
          height={214}
          sizes="100%"
          alt="avatar"
        />
      </div>
      <div className="hl">
        <h4>{BusinessName}</h4>
        <VerifiedBadge>
          <GreenTick />
          <p>Verified</p>
        </VerifiedBadge>
      </div>
      <div className="same rt">
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
        <p>{AverageRating}/5</p>
      </div>
      <div className="desc">
        <p>
          {/* {truncateString(
            {BusinessDescription},
            240
          )} */}
          {BusinessDescription}
        </p>
      </div>
      <div className="tags">
        <TagStyle>
          <p>#fashiondesign</p>
        </TagStyle>
        <TagStyle>
          <p>#creative</p>
        </TagStyle>
      </div>
      <div className="btn">
        <button type="button">
          <p>View Profile</p>
        </button>
      </div>
    </SimilarArtisanCompStyle>
  );
};



interface IReviews{
  CreatedAt:string;
  Rating:number;
  EmployerID:number;
  Description:string;
  FirstName:string;
  LastName:string;
}
export const ReviewComp: React.FC<IReviews> = ({ FirstName,LastName,Description,CreatedAt,Rating }) => {
  const getDaysAgo = (date: string): number => {
    const currentDate = new Date();
    const createdDate = new Date(date);

    // Calculate the difference in time between the two dates in milliseconds
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    // Convert time difference from milliseconds to days
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysAgo;
};
const lol= getDaysAgo(CreatedAt)
  return (
    <ReviewCompStyles>
      <div className="one">
        <div className="deet">
          <div className="fl">
            <h4>{FirstName } {LastName}</h4>
            <div className="posted">posted {lol} days ago</div>
          </div>
          <div className="lr">
            <p className="role">Roles : {"Professional"}</p>
            <div className="rate">
              <p>Rate : </p>
              <RatingIcon />
              <p>{Rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text">
        <p>
          {Description}
        </p>
      </div>
    </ReviewCompStyles>
  );
};

interface IReviewModal {
  role: "employer" | "artisan";
  closeModal: () => void;
}
interface IBody {
  rateNo: number;
  comments?: string;
}
export const ReviewModal: React.FC<IReviewModal> = ({ role, closeModal }) => {
  const [comments, setComments] = useState("");

  const [selectedRating, setSelectedRating] = useState(0);
  const handleRating = (index: number) => {
    setSelectedRating(index);
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value); // Update state with the new value
  };

  const handleSubmit = () => {
    let body: IBody = {
      rateNo: selectedRating,
    };
    if (comments !== "") {
      body["comments"] = comments;
    }
    console.log(body); // submit to API
  };

  return (
    <ReviewModalStyles>
      <div className="pop">
        <div className="up">
          <div className="x" onClick={closeModal}>
            {" "}
            <XIcon />
          </div>
          <h4>
            {role == "employer" ? "Write a Review" : "Recommend Professional"}
          </h4>
        </div>
        <div className="rate">
          {role == "employer" ? (
            <p>Rate this {role}</p>
          ) : (
            <p>Rate this professional’s job delivery</p>
          )}
          <div className="starlight">
            {[1, 2, 3, 4, 5].map((ele, index) => (
              <StarComp
                isSelected={ele <= selectedRating}
                handleClick={() => handleRating(ele)}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="comments">
          <p>
            Any additional reviews about the{" "}
            {role == "artisan" ? "Professional" : role}?
          </p>
          <div className="text">
            <textarea
              name="comments"
              value={comments}
              onChange={handleChange}
              cols={30}
              rows={10}
            ></textarea>
          </div>
        </div>
        <div className="down">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedRating == 0}
          >
            {role == "employer" ? "Send Review" : "Send Recommendation"}
          </button>
        </div>
      </div>
    </ReviewModalStyles>
  );
};

interface IStarComp {
  isSelected: boolean;
  handleClick: () => void;
}
export const StarComp: React.FC<IStarComp> = ({ isSelected, handleClick }) => {
  return (
    <div onClick={handleClick}>
      {isSelected ? <FilledStar /> : <UnFilledStar />}
    </div>
  );
};
