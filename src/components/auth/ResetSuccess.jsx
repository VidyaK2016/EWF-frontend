import AuthLayout from './AuthLayout'
import AuthHeading from './AuthHeading'
import AppButton from '../common/AppButton'
import SuccessBadge from '../common/SuccessBadge'

const ResetSuccess = ({ onBackToLogin }) => {
  return (
    <AuthLayout dense>
      <div className="text-center">
        <SuccessBadge className="mx-auto h-11 w-11 text-[#00BC7D] sm:h-[52px] sm:w-[52px]" />

        <AuthHeading
          align="center"
          title="Successful"
          titleClassName="mt-4 text-[#00BC7D]"
          subtitle="Your password has been updated successfully"
          subtitleClassName="mt-4 text-sm sm:text-base"
        />

        <AppButton type="button" className="mt-8 short:mt-5" onClick={() => onBackToLogin?.()}>
          Back to Login
        </AppButton>
      </div>
    </AuthLayout>
  )
}

export default ResetSuccess
