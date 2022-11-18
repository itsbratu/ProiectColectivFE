import {
    Box,
    Typography,
    TextField,
    Checkbox,
    Button,
    FormControlLabel,
    TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "../../models/event";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEvents } from "../../api/queries/useEvents";
import { useAddEvent } from "../../api/mutations/useAddEvent";
import { useEditEvent } from "../../api/mutations/useEditEvent";
import { useDeleteEvent } from "../../api/mutations/useDeleteEvent";

interface Props { }

const localizer = momentLocalizer(moment);

const CalendarPage = (props: Props) => {
    const { events } = useEvents();
    const { mutate: addEvent } = useAddEvent();
    const { mutate: updateEvent } = useEditEvent();
    const { mutate: deleteEvent } = useDeleteEvent();
    const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));
    const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now()));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [allDay, setAllDay] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Event | null>();

    console.log(currentEvent);


    return (
        <Box display="flex" flexDirection="column">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="startDate"
                endAccessor="endDate"
                style={{ height: "80vh" }}
                onSelectEvent={(event) => {
                    setCurrentEvent(event);
                }}
            />
            <Box
                sx={{ pt: 3, pb: 40 }}
                display="flex"
                flexDirection="column"
                style={{ height: "30vh" }}
            >
                <Box display="flex">
                    <TextField
                        sx={{ pr: 1 }}
                        variant="outlined"
                        placeholder="Title"
                        style={{ width: "300px" }}
                        value={currentEvent && currentEvent.title}
                        onChange={(e: any) => setTitle(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={allDay}
                                onChange={(e: any) => setAllDay(e.target.checked)}
                            />
                        }
                        label="All day"
                    />
                </Box>
                <Box display="flex" sx={{ pt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Start date"
                            inputFormat="MM/DD/YYYY"
                            value={currentEvent && currentEvent.startDate}
                            onChange={(e: any) => {
                                setStartDate(e);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label="End date"
                            inputFormat="MM/DD/YYYY"
                            value={currentEvent && currentEvent.endDate}
                            onChange={(date) => {
                                setEndDate(date!);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ pt: 2, pb: 2 }}>
                    <TextField
                        rows={3}
                        multiline
                        value={currentEvent && currentEvent.description}
                        onChange={(e: any) => setDescription(e.target.value)}
                        placeholder="Description"
                        style={{ width: 400 }}
                    />
                </Box>
                <Box display="flex">
                    <Button
                        variant="contained"
                        onClick={() =>
                            addEvent({
                                createPayload: {
                                    title: title,
                                    allDay: allDay,
                                    endDate: endDate!,
                                    startDate: startDate!,
                                    description: description
                                },
                            })
                        }
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: 3, mr: 3 }}
                        onClick={() => deleteEvent({ id: currentEvent?.id! })}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() =>
                            updateEvent({
                                updatePayload: {
                                    id: currentEvent?.id!,
                                    title: title,
                                    allDay: allDay,
                                    endDate: endDate!,
                                    startDate: startDate!,
                                    description: description
                                },
                            })
                        }
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CalendarPage;
