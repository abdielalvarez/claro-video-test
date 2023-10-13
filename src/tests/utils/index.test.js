import {
  determineDateSelector,
  formatTimeDifference,
  generarHorasConsecutivas,
  parseDataForTvShows,
  separateDateAndTime
} from '../../utils';
import { channelMock } from '../../utils/channelMock';
import { datesMock,
  mockHalfHours,
  mockSeparatedHours,
  tvShowsWithDate,
  tvShowsWithoutDate
} from '../../utils/mocks';
import testFileSub from '../../utils/fileMock'

it('generate consecutive hours', () => {
  const consecutiveHours = generarHorasConsecutivas()
  expect(mockHalfHours).toEqual(consecutiveHours)
})

it('separate date and time', () => {
  const result = separateDateAndTime('2021/02/01 12:31:50')
  expect(mockSeparatedHours).toEqual(result)
})

it('parse data for tv shows without date', () => {
  const resultWithoutDate = parseDataForTvShows(channelMock)
  expect(tvShowsWithoutDate).toEqual(resultWithoutDate)
})

it('parse data for tv shows with date', () => {
  const resultWithDate = parseDataForTvShows(channelMock, '2021/08/12')
  expect(tvShowsWithDate).toEqual(resultWithDate)
})

it('determine date selector', () => {
  const result = determineDateSelector([channelMock])
  expect(datesMock).toEqual(result)
})

test('Test the exported value', () => {
  expect(testFileSub).toBe('test-file-sub');
});

describe('format time difference', () => {
  it('should format time difference with hours and minutes', () => {
    const result = formatTimeDifference('10:00', '20:01');
    expect(result).toBe('10h 1min');
  });

  it('should format time difference with minutes only', () => {
    const result = formatTimeDifference('10:00', '10:30');
    expect(result).toBe('30min');
  });

  it('should format time difference with hours only', () => {
    const result = formatTimeDifference('10:00', '15:00');
    expect(result).toBe('5h ');
  });

  it('should handle zero time difference', () => {
    const result = formatTimeDifference('10:00', '10:00');
    expect(result).toBe('0min');
  });

  it('should handle single-digit hours and minutes', () => {
    const result = formatTimeDifference('01:05', '02:06');
    expect(result).toBe('1h 1min');
  });

  it('should handle no params', () => {
    const result = formatTimeDifference();
    expect(result).toBe('0min');
  });
})





