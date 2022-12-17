import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  DialogContent,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DeleteOutline } from "@mui/icons-material";
import { useDeleteEvent } from "../../../../api/mutations/useDeleteEvent";
import { AddEditEventForm } from "../../../../components/AddEditEventForm";
import { Event } from "../../../../models/event";
import IconButton from "@mui/material/IconButton";

export type AddEditEventModalProps = {
  editMode: boolean;
  open: boolean;
  handleClose: () => void;
  event?: Event;
  resetCurrentEvent: () => void;
  resetEditMode: () => void;
  openSnackbar: (message: string) => void;
  token: string;
};

export const AddEditEventModal = ({
  editMode,
  open,
  handleClose,
  event,
  resetCurrentEvent,
  resetEditMode,
  openSnackbar,
  token,
}: AddEditEventModalProps): JSX.Element => {
  const { mutate: deleteEvent } = useDeleteEvent(token);

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "500px",
          maxHeight: "700px",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="eventModalLabel"
      aria-describedby="eventModalDescription"
    >
      <DialogTitle align="center">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{ fontSize: "28px", marginLeft: editMode ? "25px" : "0px" }}
          >
            {editMode ? "Edit event" : "Add event"}
          </Typography>
          {editMode && (
            <IconButton
              onClick={() => {
                deleteEvent({ id: event!.id! });
                handleClose();
                resetCurrentEvent();
                resetEditMode();
                openSnackbar("Event successfully deleted!");
              }}
              sx={{
                width: "10px",
                height: "30px",
                marginLeft: "20px",
              }}
            >
              <DeleteOutline sx={{ fontSize: 30, color: "red" }} />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ marginBottom: "35px" }}>
        <AddEditEventForm
          handleFormClose={handleClose}
          event={event}
          editMode={editMode}
          resetCurrentEvent={resetCurrentEvent}
          resetEditMode={resetEditMode}
          openSnackbar={openSnackbar}
          token={token}
        />
      </DialogContent>
    </Dialog>
  );
};
