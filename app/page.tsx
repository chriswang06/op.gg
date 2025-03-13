'use client'
import {fetchPuuid, fetchMatches, fetchMatchData} from "./components/fetchData";
import RiotAccount from "./components/RiotAccount";
import Matches from "./components/matches";
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import MatchCard from './components/MatchCard';
import * as match from "./interfaces/matchTypes";
import MatchData from "./components/matchData";

export default function Home(){

  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [puuid, setPuuid] = useState("");
  const [matches, setMatches] = useState<string[]>([]);

  const handlePuuidChange = async () => {
    const fetchedPuuid = await fetchPuuid(nameValue, tagValue);
    setPuuid(fetchedPuuid);

    if (!fetchedPuuid){
      console.error("failed to fetch puuid");
      return;
    }

    const fetchedMatches = await fetchMatches(fetchedPuuid);
    console.log("fetched matches", fetchedMatches);
    setMatches(fetchedMatches);
  };
  return(
    <div>
      <TextInput
        label = "game name"
        placeholder = "player"
        value = {nameValue}
        onChange={(event) => setNameValue(event.currentTarget.value)}
      />
      <TextInput
        label = "tagline"
        placeholder = "1234"
        value = {tagValue}
        onChange={(event) => setTagValue(event.currentTarget.value)}
      />

      <Button variant="filled" onClick={handlePuuidChange}>
        Search Games
      </Button>

      <RiotAccount gameName = {nameValue} tagLine = {tagValue}></RiotAccount>
      {puuid == ""?<div></div> :<Matches puuid = {puuid}></Matches>}
      <MatchData matchIds = {matches}></MatchData>

    </div>

    // <div>
    // <RiotAccount gameName = "fatopman" tagLine = "joemo"></RiotAccount>
    // </div>
  )
}