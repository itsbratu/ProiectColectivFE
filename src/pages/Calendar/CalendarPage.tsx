import { Typography } from '@mui/material'
import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Event } from '../../models/event'

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
    return (
        <div>
            <Calendar localizer={localizer} events={getMockEvents()}
                startAccessor="startDate"
                endAccessor="endDate"
                style={{ height: "100vh" }} />
        </div>
    )
}

export default CalendarPage
