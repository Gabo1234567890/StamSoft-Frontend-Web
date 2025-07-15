import { useEffect, useState } from "react";
import LicensePlate from "./LicensePlate";
import CommentsSection from "./CommentsSection";
import ShareReportModal from "./ShareReportModal";
import { getTokenForSharedReport } from "../services/reports";

const Report = ({ report, shared }: { report: Report; shared: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverImage, setHoverImage] = useState(false);
  const [address, setAddress] = useState("Invalid address");
  const [showModal, setShowModal] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const images = report?.imageUrls;
  if (report.videoUrl) {
    images.push(report.videoUrl);
  }

  const reverseGeocode = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK && results && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  useEffect(() => {
    reverseGeocode(report.latitude, report.longitude);
  }, []);

  const handlePrevImage = () => {
    setCurrentIndex((prev) => (prev == 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev == images.length - 1 ? 0 : prev + 1));
  };

  const handleReportSharing = async () => {
    try {
      const token = await getTokenForSharedReport(report.id);
      const url = `${
        import.meta.env.VITE_FRONTEND_BASE_URL
      }/report/share/${token}`;
      setShareLink(url);
      setCopied(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="report-container">
      <div className="flex gap-8 max-h-[700px]">
        <div className="flex flex-col gap-4 py-4 w-1/2">
          <div className="flex gap-2 items-center">
            <img src="/LocationIcon.svg" alt="Location" />
            <p>{address}</p>
          </div>
          <div className="flex flex-col gap-6 h-94/100">
            <div
              className="w-full relative aspect-[4/3] overflow-hidden"
              onMouseEnter={() => setHoverImage(true)}
              onMouseLeave={() => setHoverImage(false)}
            >
              {report.videoUrl && currentIndex == images.length - 1 ? (
                <video controls>
                  <source src={images[currentIndex]} />
                </video>
              ) : (
                <img
                  src={images[currentIndex]}
                  alt="Image"
                  className="w-full object-cover object-bottom rounded-md h-full"
                />
              )}
              <div className="flex justify-between px-4 absolute bottom-3 w-full items-center">
                {hoverImage && (
                  <button
                    onClick={handlePrevImage}
                    className="rounded-lg bg-base-60/60 p-1.5 w-1/20 aspect-square flex justify-center cursor-pointer"
                  >
                    <img src="/WhiteBackArrow.svg" alt="Previous" />
                  </button>
                )}
                <div className="flex gap-1.5 bg-base-60/60 rounded-4xl p-4 justify-center m-auto">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full ${
                        i == currentIndex
                          ? "w-2 h-2 bg-base-100"
                          : "w-2 h-2 bg-base-0"
                      }`}
                    />
                  ))}
                </div>
                {hoverImage && (
                  <button
                    onClick={handleNextImage}
                    className="rounded-lg bg-base-60/60 p-1.5 w-1/20 aspect-square flex justify-center cursor-pointer"
                  >
                    <img src="/WhiteForwardArrow.svg" alt="Next" />
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-flow-row grid-cols-3 gap-4">
              {report?.licensePlate?.map((lp, index) => (
                <LicensePlate licensePlate={lp} key={index} />
              ))}
            </div>
            <div className="w-full items-start">
              <p className="text-paragraph-medium2 font-secondary text-primary1">
                {report.createdAt.slice(0, 10).split("-").reverse().join("/")}
              </p>
              <p className="text-paragraph-medium2 font-secondary text-secondary2">
                {report.createdAt.slice(11, 16)}
              </p>
            </div>
          </div>
        </div>
        <div className="border-l border-base-60 py-4 pl-8 w-1/2">
          <div className="flex flex-col h-full">
            <div className="flex justify-end w-full">
              <>
                <button
                  onClick={() => {
                    setShowModal(!showModal);
                    handleReportSharing();
                  }}
                  className={`cursor-pointer ${shared ? "invisible" : ""}`}
                >
                  <img src="/ShareIcon.svg" alt="Share" />
                </button>
              </>
            </div>
            <CommentsSection shared={shared} />
          </div>
        </div>
      </div>
      {showModal && shareLink && (
        <div className="fixed inset-0 z-60 bg-black/50 flex justify-center items-center">
          <ShareReportModal
            setVisibility={setShowModal}
            copied={copied}
            setCopied={setCopied}
            shareLink={shareLink}
          />
        </div>
      )}
    </div>
  );
};

export default Report;
