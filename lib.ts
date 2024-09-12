export async function getData() {
    const data = await (window as any).dadJokes
    return data
}