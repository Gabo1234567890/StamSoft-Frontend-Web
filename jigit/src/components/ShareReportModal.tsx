import { type Dispatch, type SetStateAction } from "react";

const ShareReportModal = ({
  setVisibility,
  shareLink,
  copied,
  setCopied,
}: {
  setVisibility: Dispatch<SetStateAction<boolean>>;
  shareLink: string;
  copied: boolean;
  setCopied: Dispatch<SetStateAction<boolean>>;
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-container">
      <div className="px-2 justify-end flex w-full">
        <button onClick={() => setVisibility(false)} className="cursor-pointer">
          <img src="/CloseIcon.svg" alt="Close" />
        </button>
      </div>
      <p className="modal-heading">Copy Link</p>
      <div className="py-3 px-5 gap-4 flex w-full justify-center items-center">
        {shareLink ? (
          <>
            <input
              type="text"
              readOnly
              value={shareLink}
              className="border border-secondary2 rounded-sm py-4 px-3 w-2/3 max-h-[52px]"
            />
            <button
              className="default-filled-button w-1/3 max-h-[52px]"
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </>
        ) : (
          <p>Failed to generate link</p>
        )}
      </div>
    </div>
  );
};

export default ShareReportModal;
