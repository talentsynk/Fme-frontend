import Image from "next/image";
import { ReviewCompStyles, SimilarEmployerCompStyle } from "./style";
import {
  GreenTick,
  RatingIcon,
  SmallBriefCaseIcon,
} from "@/components/icons/artisan/icons";
import { VerifiedBadge } from "../style";
import { useRouter } from "next/navigation";

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

export const ReviewComp = () => {
  return (
    <ReviewCompStyles>
      <div className="one">
        <div className="deet">
          <div className="fl">
            <h4>Oluwatimilehin Alarape</h4>
            <div className="posted">posted 2 days ago</div>
          </div>
          <div className="lr">
            <p className="role">Roles : Artisan</p>
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
