export const generarHorasConsecutivas = () => {
    const horas = Array.from({ length: 24 }, (_, hora) => hora);
    const minutos = [0, 30];
    const horasConsecutivas = horas.flatMap((hora) =>
        minutos.map((minuto) => `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}hs.`)
    );
    return horasConsecutivas;
}

export const separateDateAndTime = (dateTimeString) => {
    const parts = dateTimeString.split(' ');
    const date = parts[0];
    let time = parts[1];
    const timeWithoutSeconds = time.split(':').slice(0, 2).join(':');

    return {
        date: date,
        time: timeWithoutSeconds,
    };
}

export const parseDataForTvShows = (channel, filterDate = null) => {
    const events = channel.events;

    events.sort((a, b) => {
        const dateA = new Date(a.date_begin);
        const dateB = new Date(b.date_begin);
        return dateA - dateB;
    });

    let shows = events.map(event => {
        const { name: channelName } = channel;
        const {
            name,
            date_begin,
            date_end,
            description,
            ext_season_id,
            ext_ep_original_name,
            ext_eventimage_name_base
        } = event;
        const { date: startDate, time: startTime } = separateDateAndTime(date_begin);
        const { date: endDate, time: endTime } = separateDateAndTime(date_end);

        return {
            name,
            startTime,
            endTime,
            startDate,
            endDate,
            channel: channelName,
            season: ext_season_id,
            episode: ext_ep_original_name,
            description,
            image: ext_eventimage_name_base
        };
    });

    if (filterDate) {
        shows = shows.filter(show => show.startDate === filterDate);
    }

    return shows;
};

export const determineDateSelector = (channels) => {
    const uniqueDates = new Set();

    channels.forEach(channel => {
        const events = channel.events;

        events.forEach(event => {
            const { date_begin, date_end } = event;
            const startDate = date_begin.split(' ')[0];
            const endDate = date_end.split(' ')[0];

            uniqueDates.add(startDate);
            uniqueDates.add(endDate);
        });
    });

    const uniqueDatesArray = Array.from(uniqueDates);

    uniqueDatesArray.sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
    });

    return uniqueDatesArray;
};

export const formatTimeDifference = (startTime = '00:00', endTime = '00:00') => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    const hourDiff = endHour - startHour;
    const minuteDiff = endMinute - startMinute;
  
    let formattedTime = '';
  
    if (hourDiff > 0) {
        formattedTime += `${hourDiff}h `;
    }
  
    if (minuteDiff > 0) {
        formattedTime += `${minuteDiff}min`;
    }
  
    if (hourDiff === 0) {
        formattedTime = `${minuteDiff}min`;
    }
  
    return formattedTime;
}
