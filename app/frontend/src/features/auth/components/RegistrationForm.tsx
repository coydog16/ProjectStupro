import React from "react";
import { FormInput, SubmitButton, FormTitle } from "./FormComponents";

interface RegistrationFormProps {
    registrationData: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
    handleRegistrationSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleRegistrationInputChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    toggleSignupMode: (isSignup: boolean) => void;
    isSignupMode: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    registrationData,
    handleRegistrationSubmit,
    handleRegistrationInputChange,
    toggleSignupMode,
    isSignupMode,
}) => {
    return (
        <form
            id="signupForm"
            onSubmit={handleRegistrationSubmit}
            className={`
      absolute inset-0 flex justify-center items-center flex-col w-full gap-[15px] z-[40]
      transition-all duration-500 ease-in-out transform ${
          isSignupMode
              ? "opacity-100 pointer-events-auto translate-x-0"
              : "opacity-0 pointer-events-none translate-x-[100%]"
      }
    `}
        >
            <FormTitle title="Registration" />

            <FormInput
                name="username"
                placeholder="Username"
                value={registrationData.username}
                onChange={handleRegistrationInputChange}
            />

            <FormInput
                type="email"
                name="email"
                placeholder="Email Address"
                value={registrationData.email}
                onChange={handleRegistrationInputChange}
            />

            <FormInput
                type="password"
                name="password"
                placeholder="Create Password"
                value={registrationData.password}
                onChange={handleRegistrationInputChange}
            />

            <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registrationData.confirmPassword}
                onChange={handleRegistrationInputChange}
            />

            <SubmitButton value="Register Account" />

            <div className="relative w-[70%] flex justify-center">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleSignupMode(false);
                    }}
                    className="text-white text-[0.85em]"
                >
                    Already Have an Account?&nbsp;&nbsp;&nbsp;&nbsp;
                    <b>Login</b>
                </a>
            </div>
        </form>
    );
};

export default RegistrationForm;
