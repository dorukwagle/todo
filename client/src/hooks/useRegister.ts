import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import userService from "../services/userService";

const useRegister = (onSuccess?: () => void) => {

  return useMutation<User, AxiosError<ErrorRes>, User>({
    mutationFn: (body: User) =>
      userService.setSubroute("/register").post(body),
    onSuccess: () => onSuccess && onSuccess(),  
  });
};

export default useRegister;
