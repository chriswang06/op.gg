import { NextRequest, NextResponse } from "next/server";
interface RiotAccount {
    puuid: string;
    gameName: string;
    tagLine: string;
  }
interface ErrorResponse {
    error: string;
  }
export async function GET(req : NextRequest) {
    const { searchParams } = new URL(req.url);
    const gameName = searchParams.get("gameName");
    const tagLine = searchParams.get("tagLine");
    const api_key = process.env.RIOT_API_KEY;
    const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`;
    console.log(url)
    if (!api_key) {
        return NextResponse.json({ error: "Missing API key" }, { status: 500 });
      }
      
      if (!gameName || !tagLine) {
        return NextResponse.json({ error: "Missing gameName or tagLine" }, { status: 400 });
      }
    try{
        console.log("fetching api", url);
        const response = await fetch(url);

        if (!response.ok){
            const errorText = await response.text();
            console.error("Error response: ", errorText);
            return NextResponse.json({error: "Failed to fetch data"}, {status : response.status});
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error){
        console.error("fetch error", error);
        return NextResponse.json({error: (error as Error).message}, {status: 500});
    }
}