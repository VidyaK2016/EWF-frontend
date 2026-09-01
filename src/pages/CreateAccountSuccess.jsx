import { useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AppButton from "../components/common/AppButton";

function CreateAccountSuccess() {

    const navigate = useNavigate();

    return (
        <AuthLayout>

            <div className="flex flex-col items-center text-center">

                {/* Success Icon */}

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D1FAE5]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981]">
                        <CircleCheck
                            size={24}
                            className="text-white"
                            strokeWidth={3}
                        />
                    </div>
                </div>

                {/* Heading */}

                <h1 className="mt-5 text-3xl font-extrabold text-[#00B67A]">
                    Successful
                </h1>

                {/* Description */}

                <p className="mt-3 text-sm font-medium text-gray-900">
                    Your password has been updated successfully
                </p>

                {/* Back to Login */}

                <AppButton
                    type="button"
                    className="mt-8"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </AppButton>

            </div>

        </AuthLayout>
    );
}

export default CreateAccountSuccess;