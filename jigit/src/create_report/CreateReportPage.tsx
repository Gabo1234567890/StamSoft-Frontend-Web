import { useState, type ChangeEvent } from "react";
import { uploadReport } from "../services/reports";
import TextInput from "../components/TextInput";
import LocationPicker from "../components/LocationPicker";
import { useAuth } from "../context/AuthContext";

const CreateReportPage = () => {
  const [description, setDescription] = useState("");
  const [licensePlates, setLicensePlates] = useState<string[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [licensePlateInput, setLicensePlateInput] = useState("");
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const { setUser } = useAuth();

  const handleLocationChange = (lat: number, lng: number, addr: string) => {
    setLatitude(lat);
    setLongitude(lng);
    setAddress(addr);
  };

  const handleUpload = async () => {
    try {
      if (
        !description ||
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
      setLatitude(null);
      setLongitude(null);
      setAddress("");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((f) =>
        f.type.startsWith("image/")
      );
      const combinedFiles = [...images, ...newFiles].slice(0, 5);
      setImages(combinedFiles);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviewUrls((prev) => [...prev, ...newPreviews].slice(0, 5));

      e.target.value = "";
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

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]?.type.startsWith("video/")) {
      const videoFile = e.target.files[0];
      setVideo(videoFile);
      setVideoPreview(URL.createObjectURL(videoFile));
    } else {
      setVideo(null);
      setVideoPreview(null);
    }
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

  return (
    <>
      <TextInput
        placeholder="Description"
        type="text"
        val={description}
        onChange={setDescription}
      />
      <TextInput
        placeholder="License Plate"
        type="text"
        val={licensePlateInput}
        onChange={setLicensePlateInput}
      />
      <button onClick={handleAddPlate}>Add Plate</button>

      <ul>
        {licensePlates.map((plate, index) => (
          <li key={index}>{plate}</li>
        ))}
      </ul>

      <label>Images (1-5):</label>
      {images.length < 5 && (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      )}
      {imagePreviewUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Image ${index}`} width={50} height={50} />
          <button onClick={() => removeImage(index)}>Remove</button>
        </div>
      ))}

      <label>Optional Video:</label>
      {videoPreview ? (
        <>
          <video src={videoPreview} controls />
          <button onClick={removeVideo}>Remove</button>
        </>
      ) : (
        <input type="file" accept="video/*" onChange={handleVideoChange} />
      )}

      <>
        <h3>Select Location</h3>
        <LocationPicker onLocationChange={handleLocationChange} />
        {latitude && longitude && (
          <p>
            Address: {address}
            <br />
            Coordinates: {latitude}, {longitude}
          </p>
        )}
      </>

      <button onClick={handleUpload}>Submit Report</button>
    </>
  );
};

export default CreateReportPage;
