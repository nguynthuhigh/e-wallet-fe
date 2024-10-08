import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import authAPI from "../../api/auth.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading, LoadingButton } from "../../components/auth/loading";
import Header from "../../components/header/header_login";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorResponse, setErrorResponse] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorResponse({ password: null, email: null });
  };
  const hanldeSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.signinAPI(formData);
      if (response.status === 200) {
        navigate("/dashboard");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorResponse({ password: error.response.data.message });
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Header></Header>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <div class="px-6 sm:px-0 max-w-sm">
                <a
                  href="https://sso-pointer.vercel.app/authorize?clientId=66f38b1441aea9e24920e456"
                  type="button"
                  class=" w-full border-[2px] border-[#4285F4] font-semibold text-[#4285F4]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                >
                  <img
                    alt="pointer logo"
                    className={
                      "mr-2 -ml-1 w-6 h-6 border-white  border rounded-full"
                    }
                    src="https://i.imgur.com/5cYzRrm.png"
                  />
                  Sign in with Pointer<div></div>
                </a>
              </div>
              <h1 className="text-center">Or</h1>
              <form class="space-y-1 md:space-y-1" onSubmit={hanldeSignIn}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-color-default block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  <p className="text-[12px] text-red-500">
                    {errorResponse.email}
                  </p>
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  <p className="text-[12px] text-red-500">
                    {errorResponse.password}
                  </p>
                </div>
                <div class="w-full">
                  <div class="w-fit ml-auto text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </div>
                </div>
                {isLoading ? (
                  <LoadingButton></LoadingButton>
                ) : (
                  <button
                    type="submit"
                    class="bg-color-default w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign In
                  </button>
                )}
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <img className="ml-10" alt="" src={logo}></img>
        </div>
      </section>
    </div>
  );
}
