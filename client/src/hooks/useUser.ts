import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import meService from "../services/userService";
import User  from "../entities/User";
import { HOUR, USER_CACHE_KEY } from "../entities/constants";

const useUser = () => {
  return useQuery<User, AxiosError>({
    queryKey: USER_CACHE_KEY,
    queryFn: () => meService.setSubroute("/me").get(),
    staleTime: HOUR,
  });
};

export default useUser;
