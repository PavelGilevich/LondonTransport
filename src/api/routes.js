export default {
    STOP_POINTS: {
        GET: '/StopPoint',
        GET_BY_ID: '/StopPoint/:id',
        SEARCH: '/StopPoint/search'
    },
    TIMETABLE: {
        GET_BY_LINE_AND_STOP_POINT: '/Line/:lineId/Timetable/:stationId'
    }
};