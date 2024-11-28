interface IArtisan {
  AverageRating: number;
  BusinessDescription: string;
  BusinessName: string;
  FirstName?: string;
  LastName?: string;
  ID: number;
  Skill?: string;
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
import { SuccessModal, FailureModal } from "@/components/fme/mda/modals";
import Cookies from "js-cookie";
import axios from "axios";
import { TagStyle, VerifiedBadge } from "../style";
import { XIcon } from "@/components/icons/sidebar";
import { ChangeEvent, useState } from "react";
import { truncateString } from "@/utils/truncateString";
import { useRouter } from "next/navigation";
import { VerifiedTick } from "@/components/landing/faqs/Svgs";
import ClickOutsideWrapper from "@/components/auth/wrapper";

export const SimilarComp = () => {
  const router = useRouter();
  return (
    <SimilarEmployerCompStyle
      onClick={() => router.push("/dashboard/artisan/jobs/employer/0")}
    >
      {/* <div className="img">
        <Image
          src="/images/frame_2.png"
          width={0}
          height={214}
          sizes="100%"
          alt="avatar"
        />
      </div> */}
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

export const SimilarArtisanComp: React.FC<IArtisan> = ({
  AverageRating,
  BusinessName,
  BusinessDescription,
  Skill,
  FirstName,
  LastName,
  ID,
}) => {
  const router = useRouter();
  return (
    <SimilarArtisanCompStyle
      onClick={() => router.push(`/dashboard/employer/hire/${ID}`)}
    >
      <div className=" w-12 h-12 rounded-[50%] bg-[#E7F6EC] flex justify-center items-center">
        {/* <Image
          src="/images/frame_3.png"
          width={0}
          height={214}
          sizes="100%"
          alt="avatar"
        /> */}
        {/* <p className=" font-bold ">{FirstName[0].toUpperCase}{LastName[0].toUpperCase}</p> */}
        <p className="font-bold text-[16px] leading-[24px] text-[#101928]">
          {FirstName?.toUpperCase()?.[0]} {LastName?.toUpperCase()?.[0]}
        </p>
      </div>
      <div className="hl">
        <h4>{FirstName?.toUpperCase()} {LastName?.toUpperCase()}</h4>
        <VerifiedBadge>
          <GreenTick />
          <p>Verified</p>
        </VerifiedBadge>
      </div>
      <div className="same rt">
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
        <p>{Math.round(AverageRating)}/5</p>
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
          <p>#{Skill}</p>
        </TagStyle>
        <TagStyle>{/* <p>#creative</p> */}</TagStyle>
      </div>
      <div className="btn">
        <button type="button">
          <p>View Profile</p>
        </button>
      </div>
    </SimilarArtisanCompStyle>
  );
};

interface IReviews {
  CreatedAt: string;
  Rating: number;
  EmployerID: number;
  Description: string;
  FirstName: string;
  LastName: string;
}
export const ReviewComp: React.FC<IReviews> = ({
  FirstName,
  LastName,
  Description,
  CreatedAt,
  Rating,
}) => {
  const getDaysAgo = (date: string): number => {
    const currentDate = new Date();
    const createdDate = new Date(date);

    // Calculate the difference in time between the two dates in milliseconds
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    // Convert time difference from milliseconds to days
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysAgo;
  };
  const lol = getDaysAgo(CreatedAt);
  return (
    <ReviewCompStyles>
      <div className="one">
        <div className="deet">
          <div className="fl">
            <div className="flex gap-2 items-center font-bold">
              <div className="relative flex justify-center items-center w-10 h-10 rounded-[50%] bg-[rgba(52,202,165,0.1)] ">
                {/* <p>{fullName.slice(0, 2).toUpperCase()}</p> */}
                <p className="font-bold text-[16px] leading-[24px] text-[#101928]">
                  {FirstName[0]}
                  {LastName[0]}
                </p>
                <VerifiedTick />
              </div>
              <h4>
                {FirstName} {LastName}
              </h4>
            </div>
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
        <p>{Description}</p>
      </div>
    </ReviewCompStyles>
  );
};

interface IReviewModal {
  role: "employer" | "artisan";
  closeModal: () => void;
  id?: number | string;
}
interface IBody {
  rateNo: number;
  comments?: string;
}

export const ReviewModal: React.FC<IReviewModal> = ({
  role,
  closeModal,
  id,
}) => {
  const [comments, setComments] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false); // State for Failure Modal
  const [first, setFirst] = useState(true);
  const router = useRouter();
  const redirectToDashboard = () => {
    if (role === "employer") {
      router.push(`/dashboard/employer`);
    } else {
      router.push(`/dashboard/artisan`);

    }
    setShowSuccessModal(false);
  };
  const handleRating = (index: number) => {
    setSelectedRating(index);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Retrieve token from cookies
    const token = Cookies.get("token"); // Adjust the cookie key to match your token's name

    // Prepare the request body
    let body = {
      Rating: selectedRating,
      Description: comments || "No additional comments",
    };

    // Conditionally select API endpoint based on role
    const apiEndpoint =
      role === "employer"
        ? `https://fme-backend-version-1.onrender.com/job/rate/${id}` // Dummy API for employer
        : `https://fme-backend-version-1.onrender.com/job/rate/employer/${id}`; // Dummy API for artisan

    try {
      const response = await axios.post(apiEndpoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setFirst(false);
      setShowSuccessModal(true); // Show success modal on success
      // closeModal(); // Close modal on success
    } catch (error) {
      console.error(error);
      setFirst(false);
      setShowFailureModal(true); // Show failure modal on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {first && (
       
          <ReviewModalStyles>
             <ClickOutsideWrapper onClickOutside={closeModal}>
            <div className="pop">
              <div className="up">
                <div className="x" onClick={closeModal}>
                  <XIcon />
                </div>
                <h4>
                  {role === "artisan"
                    ? "Write a Review"
                    : "Recommend Professional"}
                </h4>
              </div>
              <div className="rate">
                {role === "employer" ? (
                  <p>Rate this Professional</p>
                ) : (
                  <p>Rate this Employer&apos;s job delivery</p>
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
                  {role === "artisan" ? "Employer" : "Professional"}?
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
                  disabled={selectedRating === 0 || loading} // Disable button if no rating or during loading
                >
                  {loading
                    ? "Sending..."
                    : role !== "employer"
                    ? "Send Review"
                    : "Send Recommendation"}
                </button>
              </div>
            </div>
            </ClickOutsideWrapper>
          </ReviewModalStyles>
      )}
      {showSuccessModal && (
        <SuccessModal
          cancelModal={() => setShowSuccessModal(false)}
          head="Review Submitted!"
          msg="Your review has been successfully submitted."
          navigationText="Go to Dashboard"
          navigationFunction={redirectToDashboard}
          hasCancel={false} // Remove the cancel option
        />
      )}

      {/* Failure Modal */}
      {showFailureModal && (
        <FailureModal
          cancelModal={() => setShowFailureModal(false)}
          head="Submission Failed"
          msg="Something went wrong. Please try again."
          navigationText="Go to Dashboard"
          navigationFunction={redirectToDashboard}
          hasCancel={false} // Remove the cancel option
        />
      )}
    </>
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
