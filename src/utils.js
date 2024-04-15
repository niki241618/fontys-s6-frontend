export function secToMin(seconds) {
    return  Math.ceil(seconds / 60);
}

export async function sleep(ms)
{
    return new Promise(res => setTimeout(res, ms))
}
