import {Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import * as match from '../dataTypes/matchTypes';
import {fetchMatchData, fetchPuuid} from "../lib/fetchData";
import {useState} from 'react';
import spells from '../dataTypes/spells';

interface MatchCardProps{
  match : match.MatchDto;
  puuid : String;
}

export default function MatchCard(props : MatchCardProps){
  const [expanded, toggleExpanded] = useState(false);
  const playerpuuid = props.puuid;
  const player = props.match.info.participants.find(p => p.puuid === playerpuuid)
  const championPlayed = player ? player.championName : "Unknown";
  console.log(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championPlayed}_0.jpg`);

  const result = player? player.win : "Draw";
  const kills = player? player.kills : "kills";
  const deaths = player? player.deaths : "deaths";
  const assists = player? player.assists : "assists";
  const placements = player? player.placement : "placement";
  const s1 = player? player.summoner1Id : "flash";
  const s2 = player? player.summoner2Id : "ignite";

  return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          {/* <Card.Section> */}

          <Group justify="flex-start" mt="md" mb="xs" align="center" spacing="sm">
          <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/${championPlayed}.png`}
              height={80}
              w = {80}
              fit = "contain"
              alt= {championPlayed}
            />
            {result?
              <Badge color="blue">Victory!</Badge>:
              <Badge color="red">Defeat</Badge>
            }
            <Text size = "s" c = "dimmed">
              KDA   : 
            </Text>
            <Text size = "l">
            {kills} / {deaths} / {assists}
            </Text>
            <Stack>
              <Image
                src = {`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/spell/${spells[s1]}.png`}
                alt = {spells.s1}
              />
              <Image
                src = {`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/spell/${spells[s2]}.png`}
                alt = {spells.s2}
              />
            </Stack>
          </Group>
          {/* </Card.Section> */}
    

    
          <Text size="sm" c="dimmed">
            KDA: {kills}/{deaths}/{assists}
          </Text>
          {!expanded?           
          <Button color="blue" fullWidth mt="md" radius="md" onClick = {() => toggleExpanded(true)}>
            View more details
          </Button>: 
          <div>
          {/*<Details></Details> */}
            <Button color="blue" fullWidth mt="md" radius="md" onClick = {() => toggleExpanded(false)}>
              Hide details
            </Button>
          </div>
          }

        </Card>
      );
}