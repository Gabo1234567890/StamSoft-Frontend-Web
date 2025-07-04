const Report = ({ report }: { report: Report }) => {
  console.log(report);
  const images = report?.imageUrls;
  return (
    <>
      {images.map((imageUrl) => {
        return <img src={imageUrl} alt="image" />;
      })}
      {report.videoUrl ? (
        <video>
          <source src={report.videoUrl} />
        </video>
      ) : null}
      <p>{report?.description}</p>
      <p>{report?.licensePlate}</p>
      <p>{report?.longtitude}</p>
      <p>{report?.longtitude}</p>
      <p>{report?.createdAt}</p>
      <p>{report?.reportedBy?.email}</p>
    </>
  );
};

export default Report;
