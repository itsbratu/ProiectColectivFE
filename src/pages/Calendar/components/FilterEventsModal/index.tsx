import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Tag } from "../../../../models/tag";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type FilterEventsModalProps = {
  open: boolean;
  handleClose: () => void;
  allTags: Tag[] | undefined;
  selectedTags: string[] | undefined;
  handleChangeSelectedTags: (newTags: string[]) => void;
};

export const FilterEventsModal = ({
  open,
  handleClose,
  allTags,
  selectedTags,
  handleChangeSelectedTags,
}: FilterEventsModalProps): JSX.Element => {
  const handleChangeTags = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    if (selectedTags && value) {
      handleChangeSelectedTags(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

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
          {selectedTags && (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="tags_label">Tags</InputLabel>
              <Select
                labelId="tags_label"
                id="tags_label"
                multiple
                value={selectedTags}
                onChange={handleChangeTags}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selectedTags) => selectedTags.join(",")}
                MenuProps={MenuProps}
              >
                {selectedTags &&
                  allTags &&
                  allTags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.name}>
                      <Checkbox checked={selectedTags.indexOf(tag.name) > -1} />
                      <ListItemText primary={tag.name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
