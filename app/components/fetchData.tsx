import * as match from "../interfaces/matchTypes";

export async function fetchMatchData(matchId : string): Promise<match.MatchDto | null> {
    try {
      console.log("finding data for match:  ${matchId}")
      const response = await fetch(`/api/matchData?matchId=${matchId}`);
      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        return null;
    }
      const data = await response.json();
  
      if (!data) {
        console.error("No Data found in the response.");
        return null;
      }

      return data as match.MatchDto;
    } catch (error) {
      console.error("Failed to fetch puuid", error);
      return null;
    }
  }

export async function fetchMatches(puuid : string): Promise<string[]> {
    try {
        const response = await fetch(`/api/matches?puuid=${puuid}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          console.log("successfuly fetched matches!")

          return data;  // Return the puuid from the function
        } else {
        console.error("No matches found in the response.");
        return [];
        }
    } catch (error) {
        console.error("Failed to fetch matches", error);
        return [];
    }
}

export async function fetchPuuid(gameName: string, tagLine: string): Promise<string> {
    try {
        const response = await fetch(`/api/account?gameName=${gameName}&tagLine=${tagLine}`);
        const data = await response.json();

        if (data && data.puuid) {
        return data.puuid;  // Return the puuid from the function
        } else {
        console.error("No PUUID found in the response.");
        return "";
        }
    } catch (error) {
        console.error("Failed to fetch puuid", error);
        return "";
    }
}