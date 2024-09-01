import { CheckBox, Delete } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";


interface Props {
    options?: boolean;
    title: string;
    body: string;
    onCompleteClicked?: () => void;
    onDelete: () => void;
}

const TodoComponent = ({title, body, options, onCompleteClicked, onDelete}: Props) => {


    const optionComponent = () => (
      <Button variant="text" color="success" onClick={onCompleteClicked}><CheckBox /></Button>
    );

  return (
    <Paper elevation={6} sx={{ p: 2, m:1}} square> 
      {/* <Typography fontWeight={600} fontSize={18}>Todo Title</Typography> */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Stack sx={{flexGrow: 1}}>
          <Typography fontWeight={600} fontSize={18}>{title}</Typography>
          <Typography variant={"body1"}>{body}</Typography>
        </Stack>
        <Stack alignItems="flex-start" sx={{flexGrow: 0}}>
          <Button variant="text" color="error" onClick={onDelete}><Delete/></Button>
          {options && optionComponent()}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default TodoComponent;