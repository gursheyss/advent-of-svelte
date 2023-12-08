type ResponseItem = {
    name: string;
    weight: number;
}

type Response = ResponseItem[];

export const load = async ({ fetch }) => {
    const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json')
    const json = await res.json() as Response

    return { json }
}