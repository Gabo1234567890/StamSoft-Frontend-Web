import { useState } from "react";
import { uploadReport } from "../services/reports";
import LocationPicker from "../components/LocationPicker";
import { useAuth } from "../context/AuthContext";
import { useDropzone } from "react-dropzone";
import NavBar from "../components/NavBar";
import LicensePlate from "../components/LicensePlate";
import PlusIcon from "../components/PlusIcon";
import MediaCarousel from "./components/MediaCarousel";

const CreateReportPage = () => {
  const [description, setDescription] = useState("");
  const [licensePlates, setLicensePlates] = useState<string[]>([]);
  const [latitude, setLatitude] = useState<number | null>(42.697698767957746);
  const [longitude, setLongitude] = useState<number | null>(23.32189999999999);
  const [address, setAddress] = useState(
    'Sofia Center, bul. "Knyaginya Maria Luiza" 2, 1000 Sofia, Bulgaria'
  );
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [licensePlateInput, setLicensePlateInput] = useState("");
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [hoverAddButton, setHoverAddButton] = useState(false);
  const { setUser } = useAuth();

  const handleLocationChange = (lat: number, lng: number, addr: string) => {
    setLatitude(lat);
    setLongitude(lng);
    setAddress(addr);
  };

  const handleUpload = async () => {
    try {
      if (
        licensePlates.length == 0 ||
        !latitude ||
        !longitude ||
        images.length == 0
      ) {
        alert("All fields are required");
        return;
      }
      const response = await uploadReport({
        description,
        licensePlates,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        images,
        video,
      });
      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        return {
          ...prevUser,
          reports: [...(prevUser.reports || []), response],
        };
      });
      setDescription("");
      setLicensePlateInput("");
      setLicensePlates([]);
      setImages([]);
      setImagePreviewUrls([]);
      setVideo(null);
      setVideoPreview(null);
      setLatitude(42.697698767957746);
      setLongitude(23.32189999999999);
      setAddress(
        'Sofia Center, bul. "Knyaginya Maria Luiza" 2, 1000 Sofia, Bulgaria'
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviewUrls];
    newImages.splice(index, 1);
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviewUrls(newPreviews);
  };

  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideo(null);
    setVideoPreview(null);
  };

  const handleAddPlate = () => {
    if (licensePlateInput.trim()) {
      setLicensePlates((prev) => [...prev, licensePlateInput.trim()]);
      setLicensePlateInput("");
    }
  };

  const { getRootProps: getRootProps, getInputProps: getInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        const imageFiles = acceptedFiles.filter((file) =>
          file.type.startsWith("image/")
        );

        const videoFile = acceptedFiles.find((file) =>
          file.type.startsWith("video/")
        );

        if (imageFiles.length > 0) {
          const combined = [...images, ...imageFiles].slice(0, 5);
          setImages(combined);

          const newPreviews = imageFiles.map((file) =>
            URL.createObjectURL(file)
          );
          setImagePreviewUrls((prev) => [...prev, ...newPreviews].slice(0, 5));
        }

        if (videoFile && !video) {
          setVideo(videoFile);
          setVideoPreview(URL.createObjectURL(videoFile));
        }
      },
      accept: { "image/*": [], "video/*": [] },
      multiple: true,
      maxFiles: 5 - images.length + (video ? 0 : 1),
    });

  return (
    <>
      <NavBar
        pageTitle="New Report"
        searchQuery=""
        setSearchQuery={() => {}}
        setSearchResult={() => {}}
      />
      <div className="main-page-background">
        <div className="report-container">
          <div className="flex gap-8 max-h-[700px]">
            <div className="flex flex-col py-4 justify-between w-1/2">
              <LocationPicker onLocationChange={handleLocationChange} />
              <p className="text-paragraph-medium2 font-secondary text-primary1">
                Address: {address}
              </p>
            </div>
            <div className="flex flex-col border-l border-base-60 py-4 pl-8 gap-7 w-1/2">
              <div className="flex flex-col gap-8 pb-14">
                <div className="flex justify-end">
                  <button
                    onClick={handleUpload}
                    className="default-filled-button px-6 gap-2.5"
                  >
                    Post
                    <img src="/WhiteSendIcon.svg" alt="Post" />
                  </button>
                </div>
                <div className="flex flex-col gap-6">
                  {imagePreviewUrls.length != 0 || videoPreview ? (
                    <MediaCarousel
                      imagePreviews={imagePreviewUrls}
                      videoPreview={videoPreview}
                      removeImage={removeImage}
                      removeVideo={removeVideo}
                      getRootProps={getRootProps}
                      getInputProps={getInputProps}
                    />
                  ) : (
                    <MediaCarousel
                      imagePreviews={[]}
                      videoPreview={null}
                      removeImage={() => {}}
                      removeVideo={() => {}}
                      getRootProps={getRootProps}
                      getInputProps={getInputProps}
                    />
                  )}
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 grid-rows-2 gap-4">
                      {licensePlates.map((plate, index) => (
                        <LicensePlate licensePlate={plate} key={index} />
                      ))}

                      {licensePlates.length < 5 && (
                        <input
                          type="text"
                          value={licensePlateInput}
                          onChange={(e) => setLicensePlateInput(e.target.value)}
                          className="bg-secondary2/10 rounded-lg py-3 px-5 text-center w-full caret-primary1 text-primary1"
                        />
                      )}

                      {licensePlates.length < 5 && (
                        <button
                          onClick={handleAddPlate}
                          className="default-not-filled-button py-1 px-6 text-paragraph-medium1 w-full flex"
                          onMouseEnter={() => setHoverAddButton(true)}
                          onMouseLeave={() => setHoverAddButton(false)}
                        >
                          Add
                          <PlusIcon
                            color={hoverAddButton ? "#250d77" : "#4110ea"}
                          />
                        </button>
                      )}

                      {licensePlates.length == 5 && (
                        <div className="disabled-not-filled-button items-center justify-center flex">
                          Max 5 Plates
                        </div>
                      )}
                    </div>
                    <p className="text-paragraph-medium2 font-secondary text-base-100">
                      You can add up to 5 license plates, 5 photos and one
                      video.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReportPage;
