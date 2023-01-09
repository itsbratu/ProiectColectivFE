import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  DialogContent,
} from "@mui/material";
import {ChangeDateForm} from "../../../../components/ChangeDateForm";

export type ChangeDateModalProps = {
  open: boolean;
  isAgenda: boolean;
  handleClose: () => void;
  endDay: Date;
  currentDay: Date;
  handleSubmit:(newEndDay: Date|null, newCurrentDay: Date) => void;
};

export const ChangeDateModal = ({
                                  open,
                                  isAgenda,
                                  handleClose,
                                  endDay,
                                  currentDay,
                                  handleSubmit
                                }: ChangeDateModalProps): JSX.Element => {

  let titleLabel = isAgenda? "Filter" : "Jump To Date";

  return (
    <>
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
              sx={{fontSize: "28px", marginLeft: "0px"}}
            >
              {titleLabel}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{marginBottom: "35px"}}>
          <ChangeDateForm
            isAgenda={isAgenda}
            endDay={endDay}
            handleFormClose={handleClose}
            currentDay={currentDay}
            handleDateSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
