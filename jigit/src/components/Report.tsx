const Report = ({ report }: { report: Report }) => {
  const images = report?.imageUrls;
  return (
    <>
      {images.map((imageUrl, index) => {
        return <img src={imageUrl} alt="image" key={index} />;
      })}
      {report.videoUrl ? (
        <video controls>
          <source src={report.videoUrl} />
        </video>
      ) : null}
      <p>{report?.description}</p>
      {report?.licensePlate?.map((lp, index) => (
        <p key={index}>{lp}</p>
      ))}
      <p>{report?.latitude}</p>
      <p>{report?.longitude}</p>
      <p>{report?.createdAt}</p>
    </>
  );
};

export default Report;
