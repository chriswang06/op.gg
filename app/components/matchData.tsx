import {useEffect, useState} from 'react';
import MatchCard from "./MatchCard";
import * as match from "../interfaces/matchTypes";
import { fetchMatchData } from './fetchData';


interface MatchDataProps{
    matchIds : string[];
}

function MatchData(props: MatchDataProps){
    console.log("props: ");
    console.log(props.matchIds);
    const [matchesData, setMatchesData] = useState<match.MatchDto[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect (()=> {
        if (props.matchIds.length == 0){
            console.log("no matchess found, skipping fetch");
            setMatchesData(null);
            setLoading(false);
            return;
        }
        const fetchAllMatchData = async () => {
            try{
                const matchPromises = props.matchIds.map((matchId) => fetchMatchData(matchId));
                const fetchedMatches = await Promise.all(matchPromises);
                console.log("Fetched Matches", fetchedMatches);
                setMatchesData(fetchedMatches.filter((match)=> match !== null) as match.MatchDto[])

            } catch (err){
                setError("Failed to fetch match data");
            } finally {
                setLoading(false);
            }
        };
        fetchAllMatchData();
    }, [props.matchIds]);
    if (loading) {
        return <div>Loading...</div>;
      }
    
      // Error state
      if (error) {
        return <div>{error}</div>;
      }
    
      // If matchesData is null or empty, render a message
      if (matchesData === null || matchesData.length === 0) {
        console.log("no match data after fetching");

        return <div>No match data available</div>;
      }
    console.log(matchesData);
    return (<div>
            {matchesData.map((matchData, index) => (
                <MatchCard key = {index} match = {matchData}/>
            ))}
            </div>
    );
}

export default MatchData;