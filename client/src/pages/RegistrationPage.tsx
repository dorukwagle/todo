import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";

const RegistrationPage = () => {
  const navigate = useNavigate();
  
  const {
    mutate: login,
    isError,
    error,
  } = useLogin(() => {
    navigate("/");
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Box
          component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <TextField
                {...register("fullName", { required: true })}
                label="Full Name"
                type="text"
              />
            </div>
            <div>
              <TextField
                {...register("username", { required: true })}
                label="Username"
                type="text"
              />
            </div>
            <div>
              <TextField
                {...register("password", { required: true })}
                label="Password"
                type="password"
              />
            </div>
            <div>
              <TextField
                {...register("confirm_password", { required: true })}
                label="Confirm Password"
                type="password"
              />
            </div>
            <div>
              {isError && (
                <Typography variant="body1" color="red">
                  {error.response && error.response.data.error}
                </Typography>
              )}
            </div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistrationPage;
