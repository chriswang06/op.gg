'use client'
import { useEffect, useState } from "react";
import React from 'react';

interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

interface Props {
  gameName: string;
  tagLine: string;
}

export default function RiotAccount({gameName, tagLine} : Props) {
    const [accountData, setAccountData] = useState<RiotAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {
        const fetchAccountData = async () => {
            try {
                const response = await fetch(`/api/account?gameName=${gameName}&tagLine=${tagLine}`);
                // if (!response.ok) {
                //     throw new Error("Failed to fetch account data");
                // }
                const data: RiotAccount = await response.json();
                setAccountData(data);
                } catch (err) {
                setError((err as Error).message);
                } finally {
                setLoading(false);
                }
        };

        fetchAccountData();
    }, [gameName, tagLine]);

    if (loading) return <p>Loading...</p>;

    if (error) return (<p>Error: {error}</p>);
    const puuid = accountData ? accountData.puuid : null;
    return(
        <div>
        {JSON.stringify(accountData, null, 2)}
            <h1>PUUID !!!</h1>
            {puuid}
            </div>
    );
}
