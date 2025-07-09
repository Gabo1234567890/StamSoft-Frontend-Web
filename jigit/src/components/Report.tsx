import { useState } from "react";
import { getTokenForSharedReport } from "../services/reports";

const Report = ({ report, hidden }: { report: Report; hidden: boolean }) => {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const images = report?.imageUrls;
  return (
    <>
      {images.map((imageUrl, index) => {
        return <img src={imageUrl} alt="image" key={index} />;
      })}
      {report.videoUrl && (
        <video controls>
          <source src={report.videoUrl} />
        </video>
      )}
      <p>{report?.description}</p>
      {report?.licensePlate?.map((lp, index) => (
        <p key={index}>{lp}</p>
      ))}
      <p>{report?.latitude}</p>
      <p>{report?.longitude}</p>
      <p>{report?.createdAt}</p>
      {!hidden && (
        <>
          <button onClick={handleReportSharing}>Share</button>
          {shareLink && (
            <div>
              <p>Share this link:</p>
              <input type="text" readOnly value={shareLink} />
              <button onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy to clipboard"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Report;
