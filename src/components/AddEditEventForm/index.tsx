import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Event } from "../../models/event";
import { useAddEvent } from "../../api/mutations/useAddEvent";
import { useEditEvent } from "../../api/mutations/useEditEvent";

export interface Inputs {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  allDay: boolean;
}

export type AddEditEventFormProps = {
  handleFormClose: () => void;
  editMode: boolean;
  event?: Event;
  resetCurrentEvent: () => void;
  resetEditMode: () => void;
  openSnackbar: (message: string) => void;
};

export const AddEditEventForm = ({
  handleFormClose,
  editMode,
  event,
  resetCurrentEvent,
  resetEditMode,
  openSnackbar,
}: AddEditEventFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>(event ? event.title : "");
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
  const { mutate: addEvent } = useAddEvent();
  const { mutate: editEvent } = useEditEvent();

  const onSubmit = async (data: Inputs) => {
    if (editMode) {
      editEvent({
        updatePayload: {
          id: event!.id!,
          title: data.title,
          description: data.description,
          startDate: startDate,
          endDate: endDate,
          allDay: data.allDay,
          tagsIds: [],
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
          tagsIds: [],
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
            {...register("title")}
            id="title"
            name="title"
            value={title}
            placeholder={"Title"}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: 400 }}
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
            />
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
