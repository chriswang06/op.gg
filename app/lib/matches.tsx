'use client'
import { useEffect, useState } from "react";

interface Props{
    puuid : string | null;
}

export default function Matches({puuid} : Props) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {
        const fetchMatchData = async () => {
            try {
                const response = await fetch(`/api/matches?puuid=${puuid}`);
                const data = await response.json();
                setMatches(data);
                } catch (err) {
                setError((err as Error).message);
                } finally {
                setLoading(false);
                }
        };

        fetchMatchData();
    }, [puuid]);

    if (loading) return <p>Loading...</p>;

    if (error) return (<p>Error: {error}</p>);

    return(
        <div>
        {JSON.stringify(matches, null, 2)}

            </div>
    );
}