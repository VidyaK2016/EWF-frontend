import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, MailOpen} from "lucide-react";

// import google from "../assets/google.png";
// import apple from "../assets/apple.png";
// import mail from "../assets/message.png";

import AuthLayout from "../components/auth/AuthLayout";
import AppInput from "../components/common/AppInput";
import AppButton from "../components/common/AppButton";
import ErrorBanner from "../components/common/ErrorBanner";
import { validateCreateAccountEmail } from "../utils/validation";
import { SOCIAL_PROVIDERS } from "../utils/socialIcons";

function CreateAccount() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailError = validateCreateAccountEmail(email);

        if (emailError) {
            setError(emailError);
            return;
        }

        setError("");

        // Navigate to Create Password
        navigate("/create-password", {
            state: {
                name,
                email
            }
        });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        if (error) {
            setError("");
        }
    };

    return (
        <AuthLayout>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Create your account
            </h1>

            <p className="text-gray-900">
                Please enter your signup details to proceed
            </p>

            {error && (
                <ErrorBanner message={error} />
            )}

            <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-1"
            >

                {/* Name */}

                <AppInput
                    id="name"
                    label="Name"
                    required
                    placeholder="Enter your name"
                    icon={<User size={18} />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Email */}

                <AppInput
                    id="email"
                    label="Email"
                    required
                    placeholder="Enter your email address"
                    icon={<MailOpen size={18} />}
                    className="mt-3"
                    value={email}
                    onChange={handleEmailChange}
                    error={error}
                    hideErrorMessage
                />

                {/* Continue Button */}

                <AppButton
                    type="submit"
                    className="mt-8"
                >
                    Continue
                </AppButton>

                {/* Sign In Divider */}

                <div className="flex items-center gap-4 sm:gap-8 mt-5">

                    <span className="border-t flex-1 border-gray-500"></span>

                    <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                        Or signin with
                    </p>

                    <span className="border-t flex-1 border-gray-500"></span>

                </div>

                {/* Social Login */}

                <div className="flex gap-6 sm:gap-12 mt-6 items-center justify-center">

                    {SOCIAL_PROVIDERS.map((provider) => (
                        <div
                            key={provider.key}
                            className="size-12 bg-white flex items-center justify-center rounded-md"
                        >
                            <img
                                src={provider.src}
                                alt={provider.label}
                                className="size-6"
                            />
                        </div>
                    ))}

                </div>

                {/* Account Login */}

                <p className="text-center text-sm text-gray-700 mt-5">
                    Have an account?{" "}
                    <a
                        href="/login"
                        className="text-orange-500 font-bold hover:underline"
                    >
                        Login now
                    </a>
                </p>

            </form>

        </AuthLayout>
    );
}

export default CreateAccount;