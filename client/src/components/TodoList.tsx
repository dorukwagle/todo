import { Badge, Chip, Divider, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    status: "Completed" | "Pending";
    children?: ReactNode | ReactNode[];
}

const TodoList = ({status, children}: Props) => {
    const badgeColor = status === "Completed" ? "success" : "warning";
  return (
    <Paper elevation={6} sx={{ p: 2, width: "48%", height: "100%", overflow: "scroll" }}>
      <Typography fontFamily={"monospace"} variant={"h5"} fontWeight={600}>Todos: 
        <Badge badgeContent={status} color={badgeColor} overlap="circular" anchorOrigin={{vertical: "top", horizontal: "right"}}/>
        </Typography>
      <Divider  sx={{width: "100%", height: "2px"}} />
        {children}
    </Paper>
  )
}

export default TodoList;