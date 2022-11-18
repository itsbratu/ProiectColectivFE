import { Box, Typography, TextField, Checkbox, Button, FormControlLabel, TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Event } from '../../models/event'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const getMockEvents = (): Event[] => {

    return [
        { id: "1", title: "First event", startDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 4), endDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 7), allDay: false },
        { id: "2", title: "Second event", startDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 30), endDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 37), allDay: false },
        { id: "3", title: "Third event", startDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 1), endDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 7), allDay: true },
        { id: "4", title: "Foutrh event", startDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 2), endDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 7), allDay: true },
        { id: "5", title: "Fifth event", startDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 40), endDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 46), allDay: false },
        { id: "6", title: "6 event", startDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 60), endDate: new Date(new Date(Date.now()).getTime() + 1000 * 60 * 60 * 70), allDay: false }
    ]
};

interface Props {

}

const localizer = momentLocalizer(moment)

const CalendarPage = (props: Props) => {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [allDay, setAllDay] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<Event | null>()


    return (
        <Box display="flex" flexDirection="column">
            <Calendar localizer={localizer} events={getMockEvents()}
                startAccessor="startDate"
                endAccessor="endDate"
                style={{ height: "80vh", }}
                onSelectEvent={event => {
                    setCurrentEvent(event)
                    setTitle(event.title)
                    // setDescription(event.des)
                    setAllDay(event.allDay);
                }}
            />
            <Box sx={{ pt: 3, pb: 40 }} display="flex" flexDirection="column" style={{ height: "30vh" }}>
                <Box display="flex">
                    <TextField sx={{ pr: 1 }} variant="outlined" placeholder="Title" style={{ width: "300px" }}
                        value={title} onChange={(e: any) => setTitle(e.target.value)} />
                    <FormControlLabel control={<Checkbox value={allDay} onChange={(e: any) => setAllDay(e.target.checked)} />} label="All day" />
                </Box>
                <Box display="flex" sx={{ pt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Start date"
                            inputFormat="MM/DD/YYYY"
                            value={startDate}
                            onChange={(e: any) => {
                                setStartDate(e)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label="End date"
                            inputFormat="MM/DD/YYYY"
                            value={endDate}
                            onChange={(date) => {
                                setEndDate(date)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ pt: 2, pb: 2 }}>
                    <TextField
                        rows={3}
                        multiline
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
                        placeholder="Description"
                        style={{ width: 400 }}
                    />
                </Box>
                <Box display="flex">
                    <Button variant="contained">Add</Button>
                    <Button variant="contained" color="error" sx={{ ml: 3, mr: 3 }}>Delete</Button>
                    <Button variant="contained">Update</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default CalendarPage
