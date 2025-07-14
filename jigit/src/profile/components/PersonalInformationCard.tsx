import EditButton from "../../components/EditButton";
import LogoutButton from "../../components/LogoutButton";
import CardHeader from "./CardHeader";
import InformationField from "./InformationField";

const PersonalInformationCard = ({ user }: { user: User }) => {
  const initials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="profile-cards-container">
      <div className="flex flex-col gap-8">
        {/* Title and buttons */}
        <CardHeader title="Personal Information">
          <LogoutButton />
          <EditButton />
        </CardHeader>

        {/* Details */}
        <div className="py-2 px-5 gap-25 flex items-center">
          {/* Initials */}
          <div className="flex items-center justify-center aspect-square h-full w-1/9 bg-primary2 rounded-2xl">
            <p className="font-secondary lg:text-heading0 sm:text-heading3 text-secondary2">
              {initials(user?.email || "")}
            </p>
          </div>
          {/* Fields */}
          <div className="flex justify-between w-2/3 pr-31">
            <div className="flex flex-col gap-7">
              <InformationField
                title="First Name"
                value={user?.firstName || "Your Name"}
                type="text"
              />
              <InformationField
                title="Last Name"
                value={user?.lastName || "Your Name"}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-7">
              <InformationField
                title="Email"
                value={user?.email || ""}
                type="email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;
