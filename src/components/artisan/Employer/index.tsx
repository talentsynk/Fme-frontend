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

export const SimilarArtisanComp = () => {
  const router = useRouter();
  return (
    <SimilarArtisanCompStyle
      onClick={() => router.push("/dashboard/employer/hire/0")}
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
        <h4>Oragon Confectionaries</h4>
        <VerifiedBadge>
          <GreenTick />
          <p>Verified</p>
        </VerifiedBadge>
      </div>
      <div className="same rt">
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
        <p>4.5/5</p>
      </div>
      <div className="desc">
        <p>
          {truncateString(
            "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. I need a caterer for 20 peoples meal in a birthday party that is coming up soon, I need a caterer for 20 peoples meal in a birthday party that is coming up soonCall +234 817 896",
            240
          )}
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

interface IReviewer{
  role ?: "artisan" | "employer";
}
export const ReviewComp:React.FC<IReviewer> = ({role}) => {
  return (
    <ReviewCompStyles>
      <div className="one">
        <div className="deet">
          <div className="fl">
            <h4>Oluwatimilehin Alarape</h4>
            <div className="posted">posted 2 days ago</div>
          </div>
          <div className="lr">
            <p className="role">Roles : {role ? role : "Artisan"}</p>
            <div className="rate">
              <p>Rate : </p>
              <RatingIcon />
              <p>4.5/5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
          pellentesque torto, Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur
          adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet,
          consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor
          sit amet, consectetur adipiscing elit. Urna pellentesque tortorr
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
          <h4>{role == "employer" ? "Write a Review" : "Recommend Artisan"}</h4>
        </div>
        <div className="rate">
          {role == "employer" ? (
            <p>Rate this {role}</p>
          ) : (
            <p>Rate this artisan’s job delivery</p>
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
          <p>Any additional reviews about the {role}?</p>
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
