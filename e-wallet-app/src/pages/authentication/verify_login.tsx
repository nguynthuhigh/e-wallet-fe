import Cookies from "universal-cookie";
const cookie = new Cookies();
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "preact/hooks";
import OTPInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import { verifyLoginAPI } from "../../services/api/auth.api";
import LoadingIcon from "../../assets/svg/loading.svg";
import PageNotFound from "../page_not_found";
import AuthImg from "../../assets/png/auth_img.png";
const VerifyLogin = () => {
  const location = useLocation();
  const loginData = (location.state as { loginData?: any } | undefined)
    ?.loginData;
  useEffect(() => {
    toast.success(location.state?.message);
  }, []);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  if (!loginData) {
    return <PageNotFound />;
  }
  type ErrorResponse = {
    response: {
      data: {
        message: string;
      };
    };
  };
  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      const body = {
        email: loginData.email,
        otp: value,
      };
      console.log(body);
      setIsLoading(true);
      try {
        const response = await verifyLoginAPI(body);
        if (response.status === 200) {
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          cookie.set("token_auth", response.data.token, {
            path: "/",
            expires: expiryDate,
          });
          navigate("/");
          setIsLoading(false);
        }
      } catch (error: unknown) {
        setIsLoading(false);
        setError(!error);
        const typeError = error as ErrorResponse;
        toast.error(typeError.response.data.message);
      }
    }
  };
  return (
    <div>
      <img class={`mx-auto mt-10 w-52`} src={AuthImg}></img>
      <h1 class={`text-center font-semibold text-2xl my-4`}>
        Xác minh đăng nhập
      </h1>
      <h1 class={`text-center font-inter text-sm my-4 mb-10`}>
        Chúng tôi đã gửi mã OTP đến{" "}
        <span
          class={`text-center font-inter text-sm my-2 text-blue-default font-semibold`}
        >
          {loginData?.email}
        </span>
      </h1>
      <div class={`mx-auto w-fit relative`}>
        <OTPInput
          value={otp}
          onChange={handleChangeOTP}
          numInputs={6}
          renderInput={({ style, ...props }) => (
            <input
              class={`text-center font-semibold text-3xl border w-14 h-14 mx-2 bg-gray-50 rounded-xl ${
                error && "border-red-500"
              }`}
              {...props}
            />
          )}
        />
        {isLoading && (
          <img
            class={`animate-spin absolute -top-[50%] text-center right-[50%] left-[50%]`}
            src={LoadingIcon}
          />
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default VerifyLogin;
