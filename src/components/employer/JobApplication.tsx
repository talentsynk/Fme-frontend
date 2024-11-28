import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { SmallVerified } from "../landing/faqs/Svgs";
import Link from "next/link";
import { ContactCard, AirplaneIcon } from "../landing/faqs/Svgs";
import { BACKEND_URL } from "@/lib/config";
import { HireProfessionalComp, HireArtisanComp } from "../fme/students/modal";

interface IArtisan {
  AverageRating: number;
  BusinessDescription: string;
  BusinessName: string;
  ID: number;
  Skill: string;
}

interface IJob {
  ApplicationId: number;
  ArtisanId: number;
  AverageRating: number;
  ApplicationStatus: string;
  BusinessDescription: string;
  BusinessName: string;
  FirstName: string;
  LastName: string;
  JobApplicationDate: string;
  JobId: number;
}

const JobApplication: React.FC<IJob> = ({
  BusinessName,
  FirstName,
  LastName,
  BusinessDescription,
  ApplicationStatus,
  JobApplicationDate,
  ArtisanId,
  JobId,
  ApplicationId,
}) => {
  const [data, setData] = useState<IArtisan | null>(null);

  const getTimeDifferenceInDays = (jobApplicationDate: string): number => {
    const jobDate = new Date(jobApplicationDate);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - jobDate.getTime();

    // Convert milliseconds to days (1000 ms * 60 s * 60 min * 24 hours)
    return diffInMilliseconds / (1000 * 60 * 60 * 24);
  };

  const hoursAgo = Math.floor(getTimeDifferenceInDays(JobApplicationDate));

  const [showHireArtisanModal, setShowHireArtisanModal] = useState(false);
  const [showHireSelectModal, setShowHireSelectModal] = useState(false);
  const [showHireProfessionalModal, setShowHireProfessionalModal] =
    useState(false);
  const handleModalAction = () => {
    // Here you should update the job status based on the modal's action
    // setHiringStatus(prevState => !prevState); // Toggle the job status
    setShowHireArtisanModal(false);
  };

  const handleProfessionalAction = () => {
    // Here you should update the job status based on the modal's action
    // setHiringStatus(prevState => !prevState); // Toggle the job status
    setShowHireProfessionalModal(false);
  };
  useEffect(() => {
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${BACKEND_URL}/artisan/${ArtisanId}`, config)
      .then((res) => {
        const data = res.data.artisan;
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section className="min-w-[288px] space-y-2">
      {/* Image Section */}
      <div className="w-full">
        <Image
          src="/images/landing/application.png"
          alt="job application"
          className="w-full"
          width={100}
          height={214}
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-4">
        {/* Business Name and Application Status */}
        <div className="flex justify-between">
          <h5 className="text-lg font-bold leading-6 text-black">
            {FirstName} {LastName}
          </h5>
          <div className="rounded-[5px] bg-[#E4F5EA] w-[82px] h-[26px] flex gap-1 justify-center items-center">
            <SmallVerified />
            <p className="text-[12px] leading-[17.4px] font-medium text-[#00932E]">
              {ApplicationStatus}
            </p>
          </div>
        </div>

        {/* Business Description */}
        <p className="text-[13px] leading-[18.5px] font-medium text-black-70">
          {BusinessDescription}
        </p>

        {/* Days Since Applied */}
        <div className="flex justify-end">
          <p className="font-medium text-sm leading-5 text-black-25">
            Applied {hoursAgo} days ago
          </p>
        </div>

        {/* Conditionally Render Buttons Based on Application Status */}
        {ApplicationStatus !== "listed" ? (
          // Render the "Review Profile" button if ApplicationStatus is not "listed"
          <Link
            href={`/dashboard/employer/hire/${ArtisanId}/${JobId}/${ApplicationId}`}
          >
            <button className="w-full text-[16px] leading-6 font-bold text-white bg-[#00932E] rounded-md px-4 py-2">
              Review Profile
            </button>
          </Link>
        ) : (
          // Render the "Hire Professional" button and modal trigger if ApplicationStatus is "listed"
          <div className="flex gap-1">
            <button
              onClick={() => setShowHireProfessionalModal(true)}
              className="rounded-md gap-2 text-sm font-bold text-white bg-[#00932E] md:w-[90%] md:h-[48px] w-[90%] h-[40px] flex justify-center items-center"
            >
              <p>Hire Professional</p>
              <AirplaneIcon />
            </button>
            <div
              onClick={() => setShowHireArtisanModal(true)}
              className="flex justify-center items-center w-12 h-12 rounded-[12px] bg-[#E7F6EC]"
            >
              <ContactCard />
            </div>
            {showHireProfessionalModal && (
              <HireProfessionalComp
                JobId={JobId}
                artisanId={data?.ID}
                handleModAction={handleProfessionalAction}
                cancelModal={() => setShowHireProfessionalModal(false)}
              />
            )}
            {showHireArtisanModal && (
              <HireArtisanComp
                artisanId={data?.ID}
                handleModalAction={handleModalAction}
                cancelModal={() => setShowHireArtisanModal(false)}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobApplication;
