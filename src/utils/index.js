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

const extractEvent = event => {
    const { date_begin, date_end } = event;
    const startDate = date_begin.split(' ')[0];
    const endDate = date_end.split(' ')[0];
    return [startDate, endDate];
};

const extractChannel = channel => {
    const uniqueDates = new Set();
    channel.events.forEach(event => {
        const [startDate, endDate] = extractEvent(event);
        uniqueDates.add(startDate);
        uniqueDates.add(endDate);
    });
    return Array.from(uniqueDates);
};

const combineUniqueDates = (channels) => {
    return channels.reduce((uniqueDates, channel) => {
        const dates = extractChannel(channel);
        dates.forEach(date => uniqueDates.add(date));
        return uniqueDates;
    }, new Set());
};

export const determineDateSelector = (channels) => {
    const uniqueDatesArray = Array.from(
        combineUniqueDates(channels)
    );

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

export const programWidth = (programa) => {
    const { startTime, endTime } = programa;
    const startParts = startTime.split(':');
    const endParts = endTime.split(':');
    const startHour = parseInt(startParts[0]);
    const startMinute = parseInt(startParts[1]);
    const endHour = parseInt(endParts[0]);
    const endMinute = parseInt(endParts[1]);
    const startOffset = startHour * 60 + startMinute;
    const endOffset = endHour * 60 + endMinute;
    const width = ((endOffset - startOffset) / 30) * 156.26;
    return width;
};

export const calculateLeftOffsets = (programs) => {
    let leftOffset = 0;
    const programsWithOffset = programs.map((program, index) => {
      const { startTime } = program;
      const startOffset = startTime
        .split(':')
        .reduce((acc, cur) => {
            return (acc * 60) + parseInt(cur)
        }, 0);
      if (index === 0 || programs[index - 1].endTime !== startTime) {
        leftOffset = (startOffset / 30) * 156.26;
      }
      return { index, program, leftOffset };
    });
    return programsWithOffset
  };
  
  
  