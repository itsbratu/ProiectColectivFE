import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  DialogContent,
} from "@mui/material";
import {AddCircleOutline, DeleteOutline} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Tag} from "../../../../models/tag";
import {TagsMasterDetails} from "../../../../components/TagsMasterDetails";

export type TagsModalProps = {
  open: boolean;
  handleClose: () => void;
  openSnackbar: (message: string) => void;
  token: string;
  tags: Tag[];
};

export const TagsModal = ({
  open,
  handleClose,
  openSnackbar,
  token,
  tags,
}: TagsModalProps): JSX.Element => {
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
      aria-labelledby="tagsModalLabel"
      aria-describedby="tagsModalDescription"
    >
      <DialogTitle align="center">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{ fontSize: "28px", marginLeft: "0px"}}
          >
            {"Your Tags"}
          </Typography>
          <IconButton
            onClick={() => {
              //todo open new modal
            }}
            sx={{
              width: "10px",
              height: "30px",
              marginLeft: "20px",
            }}
          >
            <AddCircleOutline sx={{ fontSize: 30, color: "green" }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ marginBottom: "35px" }}>
        <TagsMasterDetails
          handleFormClose={handleClose}
          openSnackbar={openSnackbar}
          token={token}
          tags={tags}
        />
      </DialogContent>
    </Dialog>
  );
};
