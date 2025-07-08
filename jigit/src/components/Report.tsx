const Report = ({ report }: { report: Report }) => {
  const images = report?.imageUrls;
  return (
    <>
      {images.map((imageUrl, index) => {
        return <img src={imageUrl} alt="image" key={index} />;
      })}
      {report.videoUrl ? (
        <video>
          <source src={report.videoUrl} />
        </video>
      ) : null}
      <p>{report?.description}</p>
      <ul>{report?.licensePlates}</ul>
      <p>{report?.latitude}</p>
      <p>{report?.longitude}</p>
      <p>{report?.createdAt}</p>
      <p>{report?.reportedBy?.email}</p>
    </>
  );
};

export default Report;
