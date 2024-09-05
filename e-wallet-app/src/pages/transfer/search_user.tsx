import { useState } from "preact/hooks";
import { useDebouncedCallback } from "use-debounce";
import { getUserByEmail } from "../../services/api/transfer.api";
import { User } from "../../types/transfer";
import avatar from "../../assets/png/default_avatar.png";
import HeaderTransfer from "../../components/header/header_transfer";
const SearchUser = ({ ...props }) => {
  const [data, setData] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const handleSelectUser = () => {
    props.handleStepTransfer("input_amount");
  };
  const handleUserData = (data: any) => {
    setIsLoading(true);
    props.handleUserData(data);
  };
  const debounced = useDebouncedCallback(async (string: string) => {
    try {
      setIsLoading(true);
      const response = await getUserByEmail(string);
      if (response.status === 200) {
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setData(null);
      setIsLoading(null);
      console.log(error);
    }
  }, 1000);
  return (
    <div class={`p-4 w-full bg-white m-2 rounded-lg max-w-[800px] shadow-xl`}>
      <HeaderTransfer
        onClick={() => {
          props.handleStepTransfer("select_currency");
        }}
        title="Tìm kiếm người nhận"
      ></HeaderTransfer>
      <input
        name="search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target as HTMLInputElement;
          debounced(value.toLowerCase());
        }}
        class={`pl-4 text-sm p-1.5 w-full border rounded-full`}
        placeholder={`Nhập email hoặc username`}
      ></input>
      <InfoUser
        isLoading={isLoading}
        data={data}
        handleSelectUser={handleSelectUser}
        handleUserData={handleUserData}
      ></InfoUser>
    </div>
  );
};
const InfoUser = ({ ...props }) => {
  return (
    <>
      {props.isLoading === false && (
        <div
          onClick={() => {
            props.handleSelectUser();
            props.handleUserData(props.data);
          }}
          class={`flex w-full rounded-lg items-center font-semibold p-2 cursor-pointer hover:bg-gray-100 mt-4`}
        >
          <img
            class={`w-10 h-10 rounded-full object-cover`}
            src={props.data.avatar ? props.data.avatar : avatar}
          ></img>
          <div class={`ml-4`}>
            <h1 class={`text-lg`}>{props.data.full_name}</h1>
            <h1 class={`text-sm text-gray-500`}>{props.data.email}</h1>
          </div>
        </div>
      )}
      {props.isLoading === true && (
        <div
          class={`flex animate-pulse w-full rounded-lg items-center font-semibold p-2 cursor-pointer hover:bg-gray-100 mt-4`}
        >
          <div class={`w-10 h-10 rounded-full object-cover bg-gray-200`}></div>
          <div class={`ml-4`}>
            <div class={` bg-gray-200 w-40 h-4 rounded-full`}></div>
            <div class={`mt-1 bg-gray-200 w-20 h-4 rounded-full`}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default SearchUser;
