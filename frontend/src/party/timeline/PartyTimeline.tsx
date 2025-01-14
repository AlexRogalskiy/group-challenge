import { FunctionComponent } from 'react';
import { PartyResponse } from '../../api/api-models';
import PartiesOverviewItem from '../PartyOverviewItem';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const PartyTimeline: FunctionComponent<{ year: number; parties: PartyResponse[] }> = ({ year, parties }) => {
  if (parties?.length === 0) {
    return null;
  }

  const reversedParties = [...parties].sort((a, b) => new Date(b.endDate).getDate() - new Date(a.endDate).getDate());

  const timeline = new Map<string, PartyResponse[]>();
  for (const party of reversedParties) {
    if (new Date(party.endDate).getFullYear() !== year) {
      continue;
    }

    const month = new Date(party.endDate).getMonth();
    const key = months[month];
    if (!timeline.has(key)) {
      timeline.set(key, []);
    }
    timeline.get(key)!.push(party);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-4xl dark:text-slate-300">{year}</h1>
      {[...months].reverse().map((month) => (
        <div key={month} className="space-y-4 m-2">
          {timeline.has(month) && (
            <>
              <h2 className="font-bold text-2xl dark:text-slate-300">{month}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gab-4">
                {timeline.get(month)!.map((party) => (
                  <div key={party.id} className="">
                    <PartiesOverviewItem party={party} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
