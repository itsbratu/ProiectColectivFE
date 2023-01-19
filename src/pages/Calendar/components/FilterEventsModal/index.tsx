import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  DialogContent,
} from "@mui/material";
import { Tag } from "../../../../models/tag";
import {EventsTagFilterDetails} from "../../../../components/EventsTagFilterDetails";
export type FilterEventsModalProps = {
  open: boolean;
  handleClose: () => void;
  allTags: Tag[] | undefined;
  selectedTags: string[];
  handleChangeSelectedTags: (newTags: string[]) => void;
};

export const FilterEventsModal = ({
  open,
  handleClose,
  allTags,
  selectedTags,
  handleChangeSelectedTags,
}: FilterEventsModalProps): JSX.Element => {
  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "700px",
            maxHeight: "900px",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="filterEventsModalLabel"
        aria-describedby="filterEventsModalDescription"
      >
        <DialogTitle align="center">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ fontSize: "28px", marginLeft: "0px" }}>
              Filter events by tags
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ marginBottom: "35px" }}>
          <EventsTagFilterDetails
            allTags={allTags}
            selectedTags={selectedTags}
            handleChangeSelectedTags={handleChangeSelectedTags}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
