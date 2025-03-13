import {Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import * as match from '../interfaces/matchTypes';
import {fetchMatchData} from "../components/fetchData";

interface MatchCardProps{
  match : match.MatchDto;
}
export default function MatchCard(props : MatchCardProps){

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
              height={160}
              alt="Norway"
            />
          </Card.Section>
    
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Norway Fjord Adventures</Text>
            <Badge color="pink">On Sale</Badge>
          </Group>
    
          <Text size="sm" c="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>
    
          <Button color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
      );
}