import apiConfig from './config';
import routes from './routes';
import { stat } from 'fs';

class Api {
    getBusStationsByQuery(query) {
        const url = routes.STOP_POINTS.SEARCH;
        const requestParams = {
            modes: 'bus',
            maxResults: 25,
            faresOnly: false,
            includeHubs: true,
            tflOperatedNationalRailStationsOnly: false,
            query: query
        };

        return apiConfig.get(url, {params: requestParams});
    }

    getBusStationsByBorderCoords(coords) {
        const url = routes.STOP_POINTS.GET,
        requestParams = Object.assign({
                stopTypes: 'NaptanBusCoachStation,NaptanPublicBusCoachTram',
                modes: 'bus'
            }, coords);

        return apiConfig.get(url, {params: requestParams});    
    }

    getBusStationById(id) {
        const url = this._prepareRoute(routes.STOP_POINTS.GET_BY_ID, {
            id: id
        })
        return apiConfig.get(url);
    }

    getTimetable(lineId, stationId) {
        const url = this._prepareRoute(routes.TIMETABLE.GET_BY_LINE_AND_STOP_POINT, {
            lineId: lineId,
            stationId: stationId
        });
        const requestParams = {
                  direction: 'inbound'
              };
        return apiConfig.get(url, {params: requestParams});
    }

    _prepareRoute(url, params) {
        let resultUrl = url;
	    for (var key in params) {
		    resultUrl = resultUrl.replace(`:${key}`, params[key]);
        }
	    return resultUrl;
    }
}

export default Api;