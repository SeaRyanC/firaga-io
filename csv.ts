export type Csv = {
    headers: readonly string[],
    rows: readonly (readonly string[])[]
};
export function parseCsv(content: string): Csv {
    const lines = content.split(/\r?\n/g);
    const result = {
        headers: lines[0].split(/,/g),
        rows: lines.slice(1).map(s => s.split(/,/g))
    };
    for (const r of result.rows) {
        if (r.length !== result.headers.length) {
            throw new Error(`Malformed line: ${JSON.stringify(r)} length doesn't match header size (${result.headers.length})`);
        }
    }
    return result;
}
