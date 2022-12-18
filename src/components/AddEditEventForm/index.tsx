import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, FormControlLabel, Checkbox, Typography, Chip, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Event } from "../../models/event";
import { Tag } from "../../models/tag";
import { useAddEvent } from "../../api/mutations/useAddEvent";
import { useEditEvent } from "../../api/mutations/useEditEvent";
import { Multiselect } from "multiselect-react-dropdown";

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
};

type EventError = {
  title: string | null;
  date: string | null;
  description: string | null;
}

export const AddEditEventForm = ({
  handleFormClose,
  editMode,
  event,
  selected_tags = [],
  user_tags_ids = [],
  resetCurrentEvent,
  resetEditMode,
  openSnackbar,
  token,
}: AddEditEventFormProps): JSX.Element => {
  console.log(event?.tags);
  console.log(event?.title);
  const [title, setTitle] = useState<string>(event ? event.title : "");
  const [eventTags, setEventTags] = useState<Tag[]>(event ? event.tags : []);
  const [startDate, setStartDate] = useState<Date>(
    event ? event.startDate : new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    event ? event.endDate : new Date()
  );
  const [description, setDescription] = useState<string>(
    event ? event.description : ""
  );
  const [allDay, setAllDay] = useState<boolean>(event ? event.allDay : false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { mutate: addEvent } = useAddEvent(token);
  const { mutate: editEvent } = useEditEvent(token);
  const [eventError, setEventError] = useState<EventError>({ date: null, description: null, title: null })

  function onSelect(selectedList: Tag[], selectedItem: Tag) {
    //console.log(selectedItem);
    //selectedList.push(selectedItem.id);
    console.log(selectedList);
    selected_tags = selectedList.map(e => e.id);
    //console.log("selected tags:", selected_tags);
  }
  function onRemove(selectedList: Tag[], selectedItem: Tag) {
    // console.log(selectedItem);
    //const data = selectedList.filter(el=> el != selectedItem.id);
    //selectedList = data;
    console.log(selectedList);
    selected_tags = selectedList.map(e => e.id);
    //console.log("selected after delete tags: ", selected_tags);
  }

  const onSubmit = async (data: Inputs) => {
    const dateError = endDate < startDate ? "Start date must be before end date" : null
    const descriptionError = description.length > 100 ? "Description must be at most 100 characters long" : null
    const titleError = title.length === 0 ? "Title must not be empty" : (title.length > 20 ? "Title must be at most 20 characters long" : null)

    setEventError({
      date: dateError,
      description: descriptionError,
      title: titleError,
    })

    if (dateError || descriptionError || titleError) {
      return
    }

    if (editMode) {
      editEvent({
        updatePayload: {
          id: event!.id!,
          title: data.title,
          description: data.description,
          startDate: startDate,
          endDate: endDate,
          allDay: data.allDay,
          tagsIds: selected_tags,
        },
      });
      openSnackbar("Event successfully edited!");
      resetCurrentEvent();
      resetEditMode();
    } else {
      addEvent({
        createPayload: {
          title: data.title,
          description: data.description,
          startDate: startDate,
          endDate: endDate,
          allDay: data.allDay,
          tagsIds: selected_tags,
        },
      });
      openSnackbar("Event successfully added!");
    }
    reset();
    handleFormClose();
  };

  // const handleChange = (event: SelectChangeEvent<typeof eventTags>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setEventTags(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="30px"
        >
          {eventTags && <Box display="flex" gap="10px">
            {eventTags.map(e => <Chip style={{ backgroundColor: `#${e.colorCode}` }} label={e.name} />)}
          </Box>}
          <TextField
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
              inputFormat="MM/DD/YYYY hh:mm"
              value={startDate}
              onChange={(date: any) => {
                console.log(date);
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
              inputFormat="MM/DD/YYYY hh:mm"
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
            {eventError.date !== null && <Typography color="red" alignSelf="start">{eventError.date}</Typography>}
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
            <Select style={{ width: "100%" }} multiple
              value={eventTags}
              renderValue={s => s.map(e => e.name).join(",")}
              onChange={e => {
                console.log(e.target.value);

                // if (!(eventTags.filter(t => t.id === e.target.value).length != 0)) {
                // @ts-ignore
                setEventTags((e.target.value).map(eventId => typeof eventId === "string" ? user_tags_ids.find(tag => tag.id === eventId) as Tag : eventId))
                // }
              }
              }>
              {user_tags_ids && user_tags_ids.map(e =>
                <MenuItem value={e.id} >{e.name}</MenuItem>
              )}
            </Select>

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
