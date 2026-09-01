import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AppButton from "../components/common/AppButton";
import ErrorBanner from "../components/common/ErrorBanner";

import { validateOtp } from "../utils/validation";

const CODE_LENGTH = 4;
const RESEND_SECONDS = 30;

function CreateAccountVerification() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "support@gmail.com";

    const [digits, setDigits] = useState(
        Array(CODE_LENGTH).fill("")
    );

    const [error, setError] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

    const inputsRef = useRef([]);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((seconds) => seconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    const focusInput = (index) => {
        inputsRef.current[index]?.focus();
    };

    const handleChange = (index, value) => {

        const digit = value
            .replace(/\D/g, "")
            .slice(-1);

        setDigits((prev) => {
            const next = [...prev];
            next[index] = digit;
            return next;
        });

        if (error) {
            setError("");
        }

        if (digit && index < CODE_LENGTH - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (index, e) => {

        if (
            e.key === "Backspace" &&
            !digits[index] &&
            index > 0
        ) {
            focusInput(index - 1);
        }
    };

    const handlePaste = (e) => {

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, CODE_LENGTH);

        if (!pasted) return;

        e.preventDefault();

        setDigits(
            Array.from(
                { length: CODE_LENGTH },
                (_, index) => pasted[index] ?? ""
            )
        );

        focusInput(
            Math.min(pasted.length, CODE_LENGTH - 1)
        );
    };

    const handleResend = () => {

        if (secondsLeft > 0) return;

        setSecondsLeft(RESEND_SECONDS);

        setDigits(Array(CODE_LENGTH).fill(""));

        // TODO: trigger resend verification code API call

        focusInput(0);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const code = digits.join("");

        const validationError = validateOtp(
            code,
            CODE_LENGTH
        );

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        // TODO: verify OTP API call

        console.log("Verification successful:", {
            email,
            code
        });

        // Go to success page after verification
        navigate("/create-account-success");
    };

    const handleEdit = () => {

        navigate("/create-account", {
            state: {
                email
            }
        });
    };

    return (
        <AuthLayout>

            {/* Heading */}

            <h1 className="text-2xl sm:text-[32px] font-extrabold leading-5.5 tracking-normal text-black">
                Verification
            </h1>

            <p className="mt-2 text-sm font-medium leading-5.5 tracking-normal text-black">
                Please enter the 4 digits code sent to your
                <br />
                registered mail
            </p>

            {/* Email + Edit */}

            <div className="mt-5 flex items-center justify-between">

                <p className="text-sm font-bold text-black">
                    {email}
                </p>

                <button
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center gap-2 rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-500"
                >
                    <Pencil size={16} />
                    Edit
                </button>

            </div>

            {/* Verification Form */}

            <form
                onSubmit={handleSubmit}
                className="mt-7"
            >

                {/* Verification Code Label */}

                <label className="block text-xs font-bold leading-5.5 tracking-normal text-black">
                    Verification code{" "}
                    <span className="text-red-500">*</span>
                </label>

                {/* OTP Inputs */}

                <div className="mt-3 flex w-full max-w-xs gap-2 sm:gap-4">

                    {digits.map((digit, index) => (
                        <input
                            key={index}
                            ref={(element) => {
                                inputsRef.current[index] = element;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) =>
                                handleKeyDown(index, e)
                            }
                            onPaste={handlePaste}
                            className={`aspect-square w-full min-w-0 max-w-14 flex-1 rounded-xl bg-white border text-center text-lg font-semibold text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-orange-400 ${
                                error
                                    ? "border-red-400"
                                    : "border-gray-200"
                            }`}
                        />
                    ))}

                </div>

                {/* Error */}

                {error && (
                    <ErrorBanner
                        message={error}
                        show={false}
                    />
                )}

                {/* Resend */}

                <p className="mt-4 text-xs font-semibold leading-5.5 tracking-normal text-black">

                    {secondsLeft > 0 ? (
                        `Resend code in ${secondsLeft}(s)`
                    ) : (
                        <AppButton
                            type="button"
                            variant="link"
                            onClick={handleResend}
                        >
                            Resend code
                        </AppButton>
                    )}

                </p>

                {/* Continue */}

                <AppButton
                    type="submit"
                    className="mt-8"
                >
                    Continue
                </AppButton>

            </form>

            {/* Back to Login */}

            <div className="mt-6 text-center">

                <a
                    href="#"
                    className="text-sm font-bold leading-5.5 tracking-normal text-[#F36A0E] hover:text-[#CE5A0C]"
                >
                    Back to Login
                </a>

            </div>

        </AuthLayout>
    );
}

export default CreateAccountVerification;