import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";

const SignInPage = () => {
  const navigate = useNavigate();

  const {mutate: login, isError, error} = useLogin(() => {
    navigate("/dashboard");
  });

  const {register,  handleSubmit } = useForm();


  const onSubmit = (data: any) => {
    console.log(data);
      login(data);
  } 

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
              {...register("username", {required: true})}
              label="Username" type="text" />
            </div>
            <div>
              <TextField 
              {...register("password", {required: true})}
              label="Password" type="password" />
            </div>
            <div>
              {isError && <Typography variant="body1" color="red">
                  {error.response && error.response.data.error}
              </Typography>}
            </div>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/sign-up")}
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

export default SignInPage;
