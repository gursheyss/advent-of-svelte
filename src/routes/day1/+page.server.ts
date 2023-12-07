type ResponseItem = {
    name: string;
    tally: number;
}

type Response = ResponseItem[];

export const load = async ({ fetch }) => {
    const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')
    const json = await res.json() as Response

    const niceList = json.filter(item => item.tally > 0).sort((a, b) => b.tally - a.tally);
    const naughtyList = json.filter(item => item.tally < 0).sort((a, b) => a.tally - b.tally);

    return { niceList, naughtyList }
}