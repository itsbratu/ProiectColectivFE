import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Chip,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Event } from "../../models/event";
import { Tag } from "../../models/tag";
import { useAddEvent } from "../../api/mutations/useAddEvent";
import { useEditEvent } from "../../api/mutations/useEditEvent";
import { useTheme } from "@mui/material/styles";

export interface Inputs {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  allDay: boolean;
  tags: Tag[];
}

export type AddEditEventFormProps = {
  handleFormClose: () => void;
  editMode: boolean;
  event?: Event;
  selected_tags?: string[];
  user_tags_ids?: Tag[];
  resetCurrentEvent: () => void;
  resetEditMode: () => void;
  openSnackbar: (message: string) => void;
  token: string;
  defaultDate: Date;
};

type EventError = {
  title: string | null;
  date: string | null;
  description: string | null;
};

export const AddEditEventForm = ({
  handleFormClose,
  editMode,
  event,
  user_tags_ids = [],
  resetCurrentEvent,
  resetEditMode,
  openSnackbar,
  token,
  defaultDate,
}: AddEditEventFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>(event ? event.title : "");
  const [eventTagsIds, setEventTagsIds] = useState<string[]>(
    event ? event.tags.map((e) => e.id) : []
  );
  const [startDate, setStartDate] = useState<Date>(
    event ? event.startDate : defaultDate
  );
  const [endDate, setEndDate] = useState<Date>(
    event ? event.endDate : defaultDate
  );
  const [description, setDescription] = useState<string>(
    event ? event.description : ""
  );
  const [allDay, setAllDay] = useState<boolean>(event ? event.allDay : false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { mutate: addEvent } = useAddEvent(token);
  const { mutate: editEvent } = useEditEvent(token);
  const [eventError, setEventError] = useState<EventError>({
    date: null,
    description: null,
    title: null,
  });
  const theme = useTheme();

  const onSubmit = async () => {
    const dateError =
      endDate < startDate ? "Start date must be before end date" : null;
    const descriptionError =
      description.length > 100
        ? "Description must be at most 100 characters long"
        : null;
    const titleError =
      title.length === 0
        ? "Title must not be empty"
        : title.length > 20
        ? "Title must be at most 20 characters long"
        : null;

    setEventError({
      date: dateError,
      description: descriptionError,
      title: titleError,
    });

    if (dateError || descriptionError || titleError) {
      return;
    }

    if (editMode) {
      editEvent({
        updatePayload: {
          id: event!.id!,
          title: title,
          description: description,
          startDate: startDate,
          endDate: endDate,
          allDay: allDay,
          tagsIds: eventTagsIds,
        },
      });
      openSnackbar("Event successfully edited!");
      resetCurrentEvent();
      resetEditMode();
    } else {
      addEvent({
        createPayload: {
          title: title,
          description: description,
          startDate: startDate,
          endDate: endDate,
          allDay: allDay,
          tagsIds: eventTagsIds,
        },
      });
      openSnackbar("Event successfully added!");
    }
    reset();
    handleFormClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="30px"
        >
          <TextField
            sx={{marginTop:3}}
            {...register("title")}
            id="title"
            name="title"
            value={title}
            placeholder={"Title"}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: 400 }}
            error={eventError.title !== null}
            helperText={eventError.title}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start date"
              inputFormat="MM/DD/YYYY hh:mm A"
              value={startDate}
              onChange={(date: any) => {
                if (date != undefined) {
                  setStartDate(date!);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} style={{ width: 400 }} />
              )}
            />
            <DateTimePicker
              label="End date"
              inputFormat="MM/DD/YYYY hh:mm A"
              value={endDate}
              onChange={(date) => {
                if (date != undefined) {
                  setEndDate(date!);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} style={{ width: 400 }} />
              )}
            />
            {eventError.date !== null && (
              <Typography color="red" alignSelf="start">
                {eventError.date}
              </Typography>
            )}
            <TextField
              {...register("description")}
              id="description"
              name="description"
              rows={3}
              multiline
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              placeholder="Description"
              style={{ width: 400 }}
              error={eventError.description !== null}
              helperText={eventError.description}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
              <Select
                multiple
                labelId="demo-multiple-chip-label"
                value={eventTagsIds}
                onChange={(e) => {
                  const { value } = e.target;
                  setEventTagsIds(
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                style={{ width: "100%" }}
                input={<OutlinedInput label="Tags" />}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          user_tags_ids.find((e) => e.id === value)?.name ?? ""
                        }
                        style={{
                          backgroundColor: `#${
                            user_tags_ids.find((e) => e.id === value)
                              ?.colorCode ?? ""
                          }`,
                          color: "white",
                        }}
                      />
                    ))}
                  </Box>
                )}
              >
                {user_tags_ids.map((tag) => (
                  <MenuItem
                    key={tag.id}
                    value={tag.id}
                    style={{
                      fontWeight:
                        eventTagsIds.indexOf(tag.id) === -1
                          ? theme.typography.fontWeightRegular
                          : theme.typography.fontWeightMedium,
                    }}
                  >
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Checkbox
                {...register("allDay")}
                id="allDay"
                name="allDay"
                checked={allDay}
                value={allDay}
                onChange={(e: any) => setAllDay(e.target.checked)}
              />
            }
            label="All day"
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "25%", textDecoration: "none" }}
          >
            {editMode ? "Edit" : "Add"}
          </Button>
        </Box>
      </form>
    </>
  );
};
