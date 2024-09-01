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

import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import User from "../entities/User";

const RegistrationPage = () => {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const {mutate: registerUser, isError, error} = useRegister(() => navigate("/"));

    const onSubmit = (data: FieldValues) => {
        if (data.password !== data.confirmPassword)
          return alert("Passwords do not match");
        
        registerUser(data as User);
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
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                                label="Confirm Password"
                                type="password"
                            />
                        </div>
                        <div>
                            {isError && (
                                <Typography variant="body1" color="red">
                                    {error.response &&
                                        error.response.data.error}
                                </Typography>
                            )}
                        </div>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                type="submit"
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
