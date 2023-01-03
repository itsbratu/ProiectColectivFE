import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  DialogContent,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useDeleteTag } from "../../../../api/mutations/useDeleteTag";
import IconButton from "@mui/material/IconButton";
import {Tag} from "../../../../models/tag";
import {AddEditTagForm} from "../../../../components/AddEditTagForm";

export type AddEditTagModalProps = {
  editMode: boolean;
  open: boolean;
  handleClose: () => void;
  tag?: Tag;
  resetCurrentTag: () => void;
  resetEditMode: () => void;
  openSnackbar: (message: string) => void;
  token: string;
};

export const AddEditTagModal = ({
  editMode,
  open,
  handleClose,
  tag,
  resetCurrentTag,
  resetEditMode,
  openSnackbar,
  token,
}: AddEditTagModalProps): JSX.Element => {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "600px",
          maxHeight: "900px",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="TagModalLabel"
      aria-describedby="TagModalDescription"
    >
      <DialogTitle align="center">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{ fontSize: "28px", marginLeft: "0px" }}
          >
            {editMode ? "Edit Tag" : "Add Tag"}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ marginBottom: "35px"}}>
        <AddEditTagForm
          handleFormClose={handleClose}
          tag={tag}
          editMode={editMode}
          resetCurrentTag={resetCurrentTag}
          resetEditMode={resetEditMode}
          openSnackbar={openSnackbar}
          token={token}
        />
      </DialogContent>
    </Dialog>
  );
};
