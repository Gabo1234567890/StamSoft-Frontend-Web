const LicensePlate = ({ licensePlate }: { licensePlate: string }) => {
  return (
    <div className="bg-secondary2/10 rounded-lg py-3 px-5 text-center w-full flex items-center justify-center">
      <p className="text-body1 font-secondary text-secondary2">
        {licensePlate}
      </p>
    </div>
  );
};

export default LicensePlate;
