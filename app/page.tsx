'use client'
import {fetchPuuid, fetchMatches, fetchMatchData} from "./lib/fetchData";
import RiotAccount from "./components/RiotAccount";
import Matches from "./lib/matches";
import { Button, TextInput, Container, Group, Box, Paper, Space, Text } from '@mantine/core';
import { useState } from 'react';
import MatchCard from './components/MatchCard';
import * as match from "./dataTypes/matchTypes";
import MatchData from "./components/matchData";

export default function Home() {
  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [puuid, setPuuid] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [submittedName, setSubmittedName] = useState('');
  const [submittedTag, setSubmittedTag] = useState('');

  const handlePuuidChange = async () => {
    if (!nameValue || !tagValue) return;
    
    setLoading(true);
    setSubmittedName(nameValue);
    setSubmittedTag(tagValue);

    try {
      const fetchedPuuid = await fetchPuuid(nameValue, tagValue);
      setPuuid(fetchedPuuid);

      if (!fetchedPuuid) {
        console.error("Failed to fetch puuid");
        return;
      }

      const fetchedMatches = await fetchMatches(fetchedPuuid);
      console.log("Fetched matches", fetchedMatches);
      setMatches(fetchedMatches);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlePuuidChange();
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#1E2030', 
      minHeight: '100vh',
      padding: '40px 0'
    }}>
      <Container size="lg">
        {/* Title with subtle glow effect */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          position: 'relative'
        }}>
          <Text 
            style={{ 
              fontSize: '36px', 
              fontWeight: 700, 
              color: '#61AFEF', 
              letterSpacing: '1px',
              textShadow: '0 0 10px rgba(97, 175, 239, 0.3)'
            }}
          >
            League of Legends Stats
          </Text>
        </div>
        
        {/* Search form with darker theme */}
        <Paper 
          shadow="md" 
          p="xl" 
          radius="md" 
          mb={30} 
          style={{ 
            backgroundColor: '#282C3A',
            border: '1px solid #3B4252'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Group grow>
              <TextInput
                label={<Text style={{color: '#E6EDF3', fontWeight: 600}}>Game Name</Text>}
                placeholder="Enter your game name"
                size="md"
                value={nameValue}
                onChange={(event) => setNameValue(event.currentTarget.value)}
                onKeyPress={handleKeyPress}
                required
                styles={{
                  input: {
                    backgroundColor: '#1E2030',
                    borderColor: '#3B4252',
                    color: '#E6EDF3',
                    '&:focus': {
                      borderColor: '#61AFEF'
                    }
                  }
                }}
                style={{ flexGrow: 2 }}
              />
              <TextInput
                label={<Text style={{color: '#E6EDF3', fontWeight: 600}}>Tagline</Text>}
                placeholder="1234"
                size="md"
                value={tagValue}
                onChange={(event) => setTagValue(event.currentTarget.value)}
                onKeyPress={handleKeyPress}
                required
                styles={{
                  input: {
                    backgroundColor: '#1E2030',
                    borderColor: '#3B4252',
                    color: '#E6EDF3',
                    '&:focus': {
                      borderColor: '#61AFEF'
                    }
                  }
                }}
                style={{ flexGrow: 1 }}
              />
            </Group>
            
            <Button 
              variant="filled" 
              onClick={handlePuuidChange} 
              loading={loading}
              size="md"
              fullWidth
              style={{ 
                backgroundColor: '#61AFEF', 
                color: '#000000',
                border: 'none',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: '#87C7FF'
                  }
                }
              }}
            >
              Search Games
            </Button>
          </div>
        </Paper>
        
        {submittedName && (
          <Box mb={20} style={{ textAlign: 'center' }}>
            <Text style={{ fontSize: '22px', fontWeight: 600, color: '#E6EDF3' }}>
              Match History for <span style={{ color: '#61AFEF' }}>{submittedName}#{submittedTag}</span>
            </Text>
          </Box>
        )}

        {puuid && matches.length > 0 ? (
          <MatchData matchIds={matches} puuid={puuid} />
        ) : puuid && matches.length === 0 ? (
          <Paper p="xl" style={{ textAlign: 'center', backgroundColor: '#282C3A', color: '#E6EDF3', fontWeight: 500 }} shadow="md">
            No match history found for this player
          </Paper>
        ) : null}
      </Container>
    </div>
  );
}