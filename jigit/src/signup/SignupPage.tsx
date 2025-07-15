import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signup } from "../services/signup";
import TextInput from "../components/TextInput";
import GoogleLoginButton from "../components/GoogleLoginButton";
//import FacebookLoginButton from "../components/FacebookLoginButton";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/AuthBackground.jpg";
import VisibleTextInput from "../components/VisibleTextInput";
import HiddenTextInput from "../components/HiddenTextInput";
import CarButton from "../components/CarButton";
import { addCar } from "../services/cars";
import PlusIcon from "../components/PlusIcon";
import CreateAccountModal from "./components/CreateAccountModal";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [focusedFirstName, setFocusedFirstName] = useState(false);
  const [focusedLastName, setFocusedLastName] = useState(false);
  const [focusedBrand, setFocusedBrand] = useState(false);
  const [focusedModel, setFocusedModel] = useState(false);
  const [focusedLicensePlate, setFocusedLicensePlate] = useState(false);
  const [step, setStep] = useState(1);
  const [carsArray, setCarsArray] = useState<Car[]>([
    { brand: "", model: "", licensePlate: "" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [addButtonHover, setAddButtonHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const canAddCar =
    carsArray.length < 5 &&
    Object.values(carsArray[selectedIndex]).every((v) => v.trim() != "");

  const isValidEmail = (email: string) => {
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessageEmail("Email must have @ and .");
      setValidEmail(false);
    } else {
      setValidEmail(true);
      setErrorMessageEmail("");
    }
  };

  const isValidPassword = (password: string) => {
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      setErrorMessagePassword("Password must be 8, upper and lower");
      setValidPassword(false);
    } else {
      setErrorMessagePassword("");
      setValidPassword(true);
    }
  };

  useEffect(() => {
    isValidEmail(email);
    isValidPassword(password);
  }, [email, password]);

  const handleSignup = async () => {
    if (validEmail && validPassword) {
      try {
        const payload: SignupDetails = {
          email,
          password,
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
        };
        const { accessToken, refreshToken, user } = await signup(payload);
        setAuth(accessToken, refreshToken, user);
        const filledCars = carsArray.filter(
          (car) => car.brand && car.model && car.licensePlate
        );
        await Promise.all(filledCars.map((car) => addCar(car)));
        navigate("/");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  const addCarToArray = () => {
    if (canAddCar) {
      setCarsArray((prev) => [
        ...prev,
        { brand: "", model: "", licensePlate: "" },
      ]);
      setSelectedIndex(carsArray.length);
    }
  };

  const updateCarField = (field: keyof Car, value: string) => {
    setCarsArray((prev) =>
      prev.map((car, index) =>
        index == selectedIndex ? { ...car, [field]: value } : car
      )
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-container">
        <div className="login-form">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2 place-items-center">
              <img src="/LoginLogo.svg" />
              <div
                className={
                  "flex items-center justify-between " +
                  (step == 2 ? "w-full" : "")
                }
              >
                {step == 2 && (
                  <button onClick={() => setStep(1)} className="cursor-pointer">
                    <img src="/BackArrow.svg" alt="Back" />
                  </button>
                )}
                <h1 className="text-heading2 text-primary1 font-primary text-center">
                  Create Account
                </h1>
                {step == 2 && <div className="w-1/14"></div>}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-body2 font-primary text-secondary2">
                  {step == 1 ? "Personal Information" : "Car Details"}
                </p>
                <div className="flex gap-3">
                  <img src="/FirstStep.svg" alt="First Step" />
                  {step == 1 ? (
                    <img src="/NotFilledSecondStep.svg" alt="Second Step" />
                  ) : (
                    <img src="/FilledSecondStep.svg" alt="Second Step" />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {step == 1 && (
                  <div className="flex flex-col gap-3">
                    <TextInput
                      type="email"
                      placeholder="*Email"
                      onChange={setEmail}
                      val={email}
                      errorMessage={errorMessageEmail}
                      focused={focusedEmail}
                      onFocus={(focus) => {
                        setFocusedEmail(focus);
                      }}
                    />
                    <TextInput
                      type={showPassword ? "text" : "password"}
                      placeholder="*Password"
                      onChange={setPassword}
                      val={password}
                      errorMessage={errorMessagePassword}
                      focused={focusedPassword}
                      onFocus={(focus) => {
                        setFocusedPassword(focus);
                      }}
                      rightIcon={
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="cursor-pointer"
                        >
                          {showPassword ? (
                            <VisibleTextInput
                              color={
                                focusedPassword
                                  ? "#4110ea"
                                  : password
                                  ? "#250d77"
                                  : "#666666"
                              }
                            />
                          ) : (
                            <HiddenTextInput
                              color={
                                focusedPassword
                                  ? "#4110ea"
                                  : password
                                  ? "#250d77"
                                  : "#666666"
                              }
                            />
                          )}
                        </button>
                      }
                    />
                    <TextInput
                      type="text"
                      placeholder="First Name"
                      onChange={setFirstName}
                      val={firstName}
                      focused={focusedFirstName}
                      onFocus={(focus) => {
                        setFocusedFirstName(focus);
                      }}
                    />
                    <TextInput
                      type="text"
                      placeholder="Last Name"
                      onChange={setLastName}
                      val={lastName}
                      focused={focusedLastName}
                      onFocus={(focus) => {
                        setFocusedLastName(focus);
                      }}
                    />
                  </div>
                )}
                {step == 2 && (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      {carsArray.map((_, index) => (
                        <CarButton
                          key={index}
                          index={index}
                          setIndex={setSelectedIndex}
                          selected={index == selectedIndex}
                        />
                      ))}
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Car Brand"
                      onChange={(value) =>
                        updateCarField("brand", value.toString())
                      }
                      val={carsArray[selectedIndex].brand}
                      focused={focusedBrand}
                      onFocus={(focus) => {
                        setFocusedBrand(focus);
                      }}
                    />
                    <TextInput
                      type="text"
                      placeholder="Car Model"
                      onChange={(value) =>
                        updateCarField("model", value.toString())
                      }
                      val={carsArray[selectedIndex].model}
                      focused={focusedModel}
                      onFocus={(focus) => {
                        setFocusedModel(focus);
                      }}
                    />
                    <TextInput
                      type="text"
                      placeholder="License Plate"
                      onChange={(value) =>
                        updateCarField("licensePlate", value.toString())
                      }
                      val={carsArray[selectedIndex].licensePlate}
                      focused={focusedLicensePlate}
                      onFocus={(focus) => {
                        setFocusedLicensePlate(focus);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* <FacebookLoginButton /> */}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {step == 1 && (
                <button
                  onClick={() => {
                    setStep(2);
                  }}
                  className={
                    !validEmail || !validPassword
                      ? "disabled-filled-button"
                      : "default-filled-button"
                  }
                >
                  Continue
                </button>
              )}
              {step == 2 && (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="default-filled-button"
                  >
                    Create Account
                  </button>
                  <button
                    className={
                      "flex " +
                      (canAddCar
                        ? "default-not-filled-button"
                        : "disabled-not-filled-button")
                    }
                    onClick={addCarToArray}
                    onMouseEnter={() => setAddButtonHover(true)}
                    onMouseLeave={() => setAddButtonHover(false)}
                  >
                    Add Car
                    <PlusIcon
                      color={
                        canAddCar
                          ? addButtonHover
                            ? "#250d77"
                            : "#4110ea"
                          : "#666666"
                      }
                    />
                  </button>
                </div>
              )}
              <div className="flex justify-center gap-2">
                <p className="text-paragraph-regular2 font-secondary ">
                  Already have an account?
                </p>
                <Link to={"/login"} className="text-link">
                  Log In
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between gap-3 items-center">
                <hr className="w-1/2 border-t border-base-90" />
                <p className="text-paragraph-regular2 text-base-90 font-secondary">
                  or
                </p>
                <hr className="border-base-90 border-t w-1/2" />
              </div>
              <GoogleLoginButton />
            </div>
          </div>
        </div>
        <div className="flex px-6 gap-4 justify-center">
          <Link to={"/terms-and-conditions"} className="terms-policy">
            Terms And Conditions
          </Link>
          <Link to={"/privacy-policy"} className="terms-policy">
            Privacy Policy
          </Link>
        </div>
      </div>
      {showModal && (
        <CreateAccountModal
          handleSignup={handleSignup}
          setVisibility={setShowModal}
        />
      )}
    </div>
  );
};

export default SignupPage;
