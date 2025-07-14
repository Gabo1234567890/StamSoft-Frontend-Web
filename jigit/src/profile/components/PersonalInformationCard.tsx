import { useState } from "react";
import EditButton from "../../components/EditButton";
import LogoutButton from "../../components/LogoutButton";
import CardHeader from "./CardHeader";
import InformationField from "./InformationField";
import TextInput from "../../components/TextInput";
import PencilIcon from "../../components/PencilIcon";
import Initials from "../../components/Initials";

const PersonalInformationCard = ({ user }: { user: User }) => {
  const initials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  const [edit, setEdit] = useState(false);

  const [firstName, setFirstName] = useState<string>(user?.firstName ?? "");
  const [focusedFirstName, setFocusedFirstName] = useState(false);

  const [lastName, setLastName] = useState<string>(user?.lastName ?? "");
  const [focusedLastName, setFocusedLastName] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [focusedEmail, setFocusedEmail] = useState(false);

  const [focusedInitialsEdit, setFocusedInitialsEdit] = useState(false);

  return (
    <div className="profile-cards-container">
      <div className="flex flex-col gap-8">
        {" "}
        {edit ? (
          <div className="flex flex-col gap-8">
            {/* Title and buttons */}
            <CardHeader title="Personal Information">
              <LogoutButton />
              <EditButton onClick={() => setEdit(false)} editing={true} />
            </CardHeader>
            <div className="py-2 px-5 gap-25 flex items-center">
              {/* Initials */}
              <Initials
                email={user.email}
                focused={focusedInitialsEdit}
                onFocus={setFocusedInitialsEdit}
                edit={true}
              />
              {/* Fields */}
              <div className="flex justify-between w-2/3 pr-31">
                <div className="flex flex-col gap-7">
                  <TextInput
                    type="text"
                    placeholder="First Name"
                    onChange={setFirstName}
                    val={firstName}
                    focused={focusedFirstName}
                    onFocus={() => {
                      setFocusedFirstName(!focusedFirstName);
                    }}
                    rightIcon={
                      <PencilIcon
                        color={focusedFirstName ? "#4110EA" : "#250D77"}
                      />
                    }
                  />
                  <TextInput
                    type="text"
                    placeholder="Last Name"
                    onChange={setLastName}
                    val={lastName}
                    focused={focusedLastName}
                    onFocus={() => {
                      setFocusedLastName(!focusedLastName);
                    }}
                    rightIcon={
                      <PencilIcon
                        color={focusedLastName ? "#4110EA" : "#250D77"}
                      />
                    }
                  />
                </div>
                <div className="flex flex-col gap-7">
                  <TextInput
                    type="text"
                    placeholder="Email"
                    onChange={setEmail}
                    val={email}
                    focused={focusedEmail}
                    onFocus={() => {
                      setFocusedEmail(!focusedEmail);
                    }}
                    rightIcon={
                      <PencilIcon
                        color={focusedEmail ? "#4110EA" : "#250D77"}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Title and buttons */}
            <CardHeader title="Personal Information">
              <LogoutButton />
              <EditButton onClick={() => setEdit(true)} editing={false} />
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
        )}
      </div>
    </div>
  );
};

export default PersonalInformationCard;
