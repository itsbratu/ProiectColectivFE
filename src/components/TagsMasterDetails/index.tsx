import {useState} from "react";
import {useForm} from "react-hook-form";
import {
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import Button from "@mui/material/Button";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Event} from "../../models/event";
import {Tag} from "../../models/tag";
import {useAddEvent} from "../../api/mutations/useAddEvent";
import {useEditEvent} from "../../api/mutations/useEditEvent";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {DeleteOutline} from "@mui/icons-material";
import {useDeleteEvent} from "../../api/mutations/useDeleteEvent";
import {useDeleteTag} from "../../api/mutations/useDeleteTag";

// export interface Inputs {
//   title: string;
//
//   colorCode: string;
// }

export type TagsMasterDetailsProps = {
  handleFormOpen: (tag: Tag) => void;
  tags?: Tag[];
  openSnackbar: (message: string) => void;
  token: string;
};

// type TagError = {
//   title: string | null;
// };

export const TagsMasterDetails = ({
                                    handleFormOpen,
                                    tags,
                                    openSnackbar,
                                    token,
                                  }: TagsMasterDetailsProps): JSX.Element => {

  const {mutate: deleteTag} = useDeleteTag(token);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="3px"
      >
        {tags?.map(tag =>
          <span>
            <Button
              onClick={() => {
                handleFormOpen(tag)
              }}
              style={{textTransform: 'none'}}
              sx={{
                width: "400px",
                height: "30px",
                backgroundColor: "#" + tag.colorCode
              }}
              variant="contained"
            >
              {tag.name}
            </Button>
            <IconButton
              onClick={() => {
                deleteTag({id: tag!.id!});
                openSnackbar("Tag successfully deleted!");
              }}
              sx={{
                width: "10px",
                height: "30px",
                marginLeft: "10px",
              }}
            >
              <DeleteOutline sx={{fontSize: 30, color: "red"}}/>
            </IconButton>
          </span>
        )}
      </Box>
    </>
  );
};
