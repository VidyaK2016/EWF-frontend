import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    LockKeyhole,
    Eye,
    EyeOff,
    Pencil,
    CircleCheck
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AppInput from "../components/common/AppInput";
import AppButton from "../components/common/AppButton";
import ErrorBanner from "../components/common/ErrorBanner";

import {
    getPasswordChecks,
    isPasswordValid,
    passwordsMatch
} from "../utils/validation";

function CreatePassword() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "support@gmail.com";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const passwordChecks = getPasswordChecks(password);

    const handlePasswordChange = (e) => {
        const value = e.target.value;

        setPassword(value);

        if (passwordError) {
            setPasswordError("");
        }

        if (confirmPasswordError) {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;

        setConfirmPassword(value);

        if (confirmPasswordError) {
            setConfirmPasswordError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setPasswordError("");
        setConfirmPasswordError("");

        if (!isPasswordValid(password)) {
            setPasswordError("Please enter a valid password");
            return;
        }

        if (!passwordsMatch(password, confirmPassword)) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        navigate("/create-account-verification", {
            state: {
                email
            }
        });
    };

    return (
        <AuthLayout>

            {/* Heading */}

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Create password
            </h1>

            <p className="text-gray-900">
                Create a new password to login
            </p>

            {/* Password Error */}

            {confirmPasswordError && (
                <ErrorBanner message={confirmPasswordError} />
            )}

            {/* Email */}

            <div className="flex items-center justify-between mt-6 gap-3">

                <p className="text-sm font-bold text-gray-900 break-all">
                    {email}
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/create-account")}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-500"
                >
                    <Pencil size={16} />
                    Edit
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-6"
            >

                {/* Password */}

                <AppInput
                    id="password"
                    label="Password"
                    required
                    placeholder="Enter your password"
                    icon={<LockKeyhole size={18} />}
                    type={showPassword ? "text" : "password"}
                    isPassword
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError}
                    hideErrorMessage
                    rightElement={
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="shrink-0 text-orange-500"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    }
                />

                {/* Password Requirements */}

                <div className="mt-2 flex flex-col gap-1.5">

                    <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CircleCheck
                            size={14}
                            className={
                                passwordChecks.length
                                    ? "text-green-500"
                                    : "text-gray-700"
                            }
                        />

                        <span>
                            8 - 16 Characters
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CircleCheck
                            size={14}
                            className={
                                passwordChecks.upperLowerCase
                                    ? "text-green-500"
                                    : "text-gray-700"
                            }
                        />

                        <span>
                            One upper case & one lower case
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CircleCheck
                            size={14}
                            className={
                                passwordChecks.numberSpecialChar
                                    ? "text-green-500"
                                    : "text-gray-700"
                            }
                        />

                        <span>
                            Number and special character.
                        </span>
                    </div>

                </div>

                {/* Confirm Password */}

                <div className="mt-7">

                    <AppInput
                        id="confirm-password"
                        label="Confirm Password"
                        required
                        placeholder="Re-enter your password"
                        icon={<LockKeyhole size={18} />}
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        isPassword
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={confirmPasswordError}
                        hideErrorMessage
                        rightElement={
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="shrink-0 text-orange-500"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        }
                    />

                </div>

                {/* Create Account */}

                <AppButton
                    type="submit"
                    className="mt-7"
                >
                    Create Account
                </AppButton>

            </form>

        </AuthLayout>
    );
}

export default CreatePassword;