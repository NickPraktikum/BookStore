import { FunctionComponent } from "react";

const ErrorMessage: FunctionComponent<{ message: string }> = ({ message }) => {
  return (
    <div className="w-[200px] h-[100px] bg-white rounded-2xl flex justify-center items-center text-base font-medium">
      <p>{message}</p>
    </div>
  );
};
export default ErrorMessage;
