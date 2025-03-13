'use client'
import RiotAccount from "./components/RiotAccount";
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';

interface searchQuery{
  gameName : String;
  tagLine : String;
}
export default function Home(){

  const [search, setSearch] = useState<searchQuery>({
    gameName : "",
    tagLine : "",
  });
  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');

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
      {/* <Button variant="filled" onClick={(event) => {
          setSearch({
            gameName : nameValue,
            tagLine : tagValue,
          })
      }}>Button</Button> */}
      <RiotAccount gameName = {nameValue} tagLine = {tagValue}></RiotAccount>
    </div>

    // <div>
    // <RiotAccount gameName = "fatopman" tagLine = "joemo"></RiotAccount>
    // </div>
  )
}