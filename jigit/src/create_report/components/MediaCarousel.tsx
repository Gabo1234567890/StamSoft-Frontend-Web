import { useState } from "react";
import {
  type DropzoneRootProps,
  type DropzoneInputProps,
} from "react-dropzone";

const MediaCarousel = ({
  imagePreviews,
  videoPreview,
  removeImage,
  removeVideo,
  getRootProps,
  getInputProps,
}: {
  imagePreviews: string[];
  videoPreview: string | null;
  removeImage: (index: number) => void;
  removeVideo: () => void;
  getRootProps: () => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
}) => {
  const allMedia = [...imagePreviews, ...(videoPreview ? [videoPreview] : [])];
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const isVideo = videoPreview && index === allMedia.length - 1;

  return (
    <div
      {...getRootProps()}
      className="max-h-11/20 w-full relative aspect-[4/3] overflow-hidden rounded-lg border border-dashed border-primary1 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input {...getInputProps()} />

      {allMedia.length > 0 ? (
        <>
          {isVideo ? (
            <video
              src={videoPreview!}
              className="w-full h-full object-cover object-bottom"
              controls
            />
          ) : (
            <img
              src={allMedia[index]}
              alt={`Media ${index}`}
              className="w-full h-full object-cover object-bottom"
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between px-4 absolute bottom-3 w-full items-center">
            {hover && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((prev) =>
                    prev === 0 ? allMedia.length - 1 : prev - 1
                  );
                }}
                className="rounded-lg bg-base-60/60 p-1.5 w-1/20 aspect-square flex justify-center cursor-pointer"
              >
                <img src="/WhiteBackArrow.svg" alt="Previous" />
              </button>
            )}
            <div className="flex gap-1.5 bg-base-60/60 rounded-4xl p-4 justify-center m-auto">
              {allMedia.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full ${
                    i == index ? "w-2 h-2 bg-base-100" : "w-2 h-2 bg-base-0"
                  }`}
                />
              ))}
            </div>
            {hover && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((prev) =>
                    prev === allMedia.length - 1 ? 0 : prev + 1
                  );
                }}
                className="rounded-lg bg-base-60/60 p-1.5 w-1/20 aspect-square flex justify-center cursor-pointer"
              >
                <img src="/WhiteForwardArrow.svg" alt="Next" />
              </button>
            )}
          </div>
          {/* Remove */}
          {hover && (
            <div className="absolute top-3 right-3 z-10">
              {isVideo ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeVideo();
                    setIndex((prev) => (prev == 0 ? 0 : prev - 1));
                  }}
                  className="rounded-lg bg-base-60/60 p-1.5 aspect-square flex justify-center cursor-pointer"
                >
                  <img src="/WhiteCloseIcon.svg" alt="Remove" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                    setIndex((prev) => (prev == 0 ? 0 : prev - 1));
                  }}
                  className="rounded-lg bg-base-60/60 p-1.5 aspect-square flex justify-center cursor-pointer"
                >
                  <img src="/WhiteCloseIcon.svg" alt="Remove" />
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-center text-secondary2 font-secondary px-6">
          Drag & drop images or a video here, or click to upload
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
