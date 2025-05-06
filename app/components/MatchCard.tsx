import { Card, Image, Text, Button, Grid, Divider } from '@mantine/core';
import * as match from '../dataTypes/matchTypes';
import { useState } from 'react';
import spells from '../dataTypes/spells';
import React from 'react';

interface MatchCardProps {
  match: match.MatchDto;
  puuid: string;
}

// Interface for the stat component
interface StatProps {
  label: string;
  value: string | number;
}

// Interface for damage row
interface DamageRowProps {
  label: string;
  value: number;
  percent: number;
  color: string;
}

// Interface for team comparison
interface CompareStatProps {
  label: string;
  team1: number;
  team2: number;
}

// Interface for damage chart
interface DamageChartProps {
  physical: number;
  magic: number;
  true: number;
}

export default function MatchCard(props: MatchCardProps): React.ReactElement {
  const [expanded, toggleExpanded] = useState<boolean>(false);
  const playerpuuid = props.puuid;
  const player = props.match.info.participants.find(p => p.puuid === playerpuuid);
  
  // Player data
  const championPlayed = player ? player.championName : "Unknown";
  const result = player ? player.win : false;
  const kills = player ? player.kills : 0;
  const deaths = player ? player.deaths : 0;
  const assists = player ? player.assists : 0;
  const s1 = player ? player.summoner1Id : 0;
  const s2 = player ? player.summoner2Id : 0;
  
  // Additional player stats
  const cs = player ? (player.totalMinionsKilled || 0) + (player.neutralMinionsKilled || 0) : 0;
  const goldEarned = player ? player.goldEarned : 0;
  const visionScore = player ? player.visionScore : 0;
  const damageDealt = player ? player.totalDamageDealtToChampions : 0;
  const gameMode = props.match.info.gameMode;
  const gameDuration = props.match.info.gameDuration ? Math.floor(props.match.info.gameDuration / 60) : 0;
  const playerTeamId = player?.teamId || 0;
  
  // Calculate KDA ratio
  const kda = deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(2);
  
  // Get player items
  const items = player ? [
    player.item0, player.item1, player.item2, 
    player.item3, player.item4, player.item5, player.item6
  ] : [];
  
  // Color theme based on result
  const borderColor = result ? '#2B7CD4' : '#E84057';
  
  // Get all players grouped by team
  const allyTeam = props.match.info.participants.filter(p => p.teamId === playerTeamId);
  const enemyTeam = props.match.info.participants.filter(p => p.teamId !== playerTeamId);
  
  // For spells lookup safety
  const getSpellImage = (spellId: number) => {
    // Convert spellId to string since the spells object has string keys
    const spellIdStr = spellId.toString();
    // Make sure spellId exists in the spells object
    if (spellId && spells[spellIdStr as keyof typeof spells]) {
      return `https://ddragon.leagueoflegends.com/cdn/15.5.1/img/spell/${spells[spellIdStr as keyof typeof spells]}.png`;
    }
    return 'https://ddragon.leagueoflegends.com/cdn/15.5.1/img/spell/SummonerFlash.png'; // fallback
  };
  
  // Function to render player row
  const renderPlayerRow = (teamPlayer: any, isCurrentPlayer: boolean) => {
    // Get player name from Riot ID properties
    const playerName = teamPlayer.riotIdGameName ? 
                      `${teamPlayer.riotIdGameName}` : 
                      (teamPlayer.summonerName || teamPlayer.championName);
    
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginBottom: '6px',
        gap: '6px',
        width: '100%', // Ensure full width
        backgroundColor: isCurrentPlayer ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        padding: '2px 4px',
        borderRadius: '4px'
      }}>
        <div style={{ 
          width: '24px', 
          height: '24px', 
          borderRadius: '4px', 
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <Image 
            src={`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/${teamPlayer.championName}.png`}
            alt={teamPlayer.championName}
            width={24}
            height={24}
          />
        </div>
        <Text size="xs" style={{ 
          flex: '0 0 auto',
          minWidth: '70px',
          maxWidth: '70px',
          color: isCurrentPlayer ? '#FFFFFF' : '#D0D0D0',
          fontWeight: isCurrentPlayer ? 600 : 400
        }}>
          {teamPlayer.kills}/{teamPlayer.deaths}/{teamPlayer.assists}
        </Text>
        <Text size="xs" style={{
          color: isCurrentPlayer ? '#FFFFFF' : '#D0D0D0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1, // Take remaining space
          textAlign: 'left' // Force left alignment
        }}>
          {playerName}
        </Text>
      </div>
    );
  };
  
  return (
    <Card 
      shadow="sm" 
      padding="md" 
      radius="md" 
      style={{
        backgroundColor: result ? 'rgba(24, 28, 38, 0.95)' : 'rgba(32, 28, 38, 0.95)', // Dark background
        marginBottom: '1rem',
        overflow: 'visible',
        position: 'relative',
        borderLeft: `4px solid ${borderColor}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Champion and match info section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              overflow: 'hidden',
              borderRadius: '5px',
              position: 'relative',
            }}>
              <Image 
                src={`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/${championPlayed}.png`}
                alt={championPlayed}
                width={64}
                height={64}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                backgroundColor: result ? 'rgba(43, 124, 212, 0.7)' : 'rgba(232, 64, 87, 0.7)',
                padding: '2px 0',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {result ? 'VICTORY' : 'DEFEAT'}
              </div>
            </div>
          </div>
          
          <div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              gap: '4px'
            }}>
              <Text w={700} size="lg" style={{ color: '#FFFFFF' }}>{championPlayed}</Text>
              <Text size="xs" style={{ marginTop: '-4px', color: '#A0A0A0' }}>
                {player?.riotIdGameName || player?.summonerName || "You"} • {gameMode} • {gameDuration} minutes
              </Text>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'baseline', 
                marginTop: '4px',
                gap: '8px'
              }}>
                <Text size="md" w={700} style={{ color: '#FFFFFF' }}>{kills} / {deaths} / {assists}</Text>
                <Text size="sm" style={{ color: '#A0A0A0' }}>({kda} KDA)</Text>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summoner spells and items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', overflow: 'hidden' }}>
              <Image
                src={getSpellImage(s1)}
                alt="Summoner spell 1"
                width={20}
                height={20}
              />
            </div>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', overflow: 'hidden' }}>
              <Image
                src={getSpellImage(s2)}
                alt="Summoner spell 2"
                width={20}
                height={20}
              />
            </div>
            <Text size="sm" style={{ color: '#FFFFFF' }}>{player?.perks?.styles?.[0]?.selections?.length || 0}</Text>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'flex-end' }}>
            {items.slice(0, 6).map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '2px', 
                  overflow: 'hidden',
                  backgroundColor: item > 0 ? 'transparent' : 'rgba(255,255,255,0.1)',
                }}
              >
                {item > 0 && (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/item/${item}.png`}
                    alt={`Item ${index + 1}`}
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team Players Section */}
      <div style={{ 
        display: 'flex', 
        marginTop: '20px',
        marginBottom: '20px',
        gap: '40px'
      }}>
        {/* Ally Team */}
        <div style={{ flex: 1 }}>
          {allyTeam.map((teamPlayer, idx) => (
            <React.Fragment key={teamPlayer.puuid || `ally-${idx}`}>
              {renderPlayerRow(teamPlayer, teamPlayer.puuid === playerpuuid)}
            </React.Fragment>
          ))}
        </div>
        
        {/* Enemy Team */}
        <div style={{ flex: 1 }}>
          {enemyTeam.map((teamPlayer, idx) => (
            <React.Fragment key={teamPlayer.puuid || `enemy-${idx}`}>
              {renderPlayerRow(teamPlayer, false)}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Performance metrics */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px',
        width: '100%',
        marginTop: '16px',
        marginBottom: '12px'
      }}>
        <StatBox label="CS" value={cs} />
        <StatBox label="Gold" value={goldEarned.toLocaleString()} />
        <StatBox label="Vision" value={visionScore} />
      </div>
      
      {/* Expandable section */}
      <Button 
        variant="subtle"
        color={result ? "blue" : "red"}
        fullWidth
        radius="md" 
        style={{ marginTop: '8px' }}
        onClick={() => toggleExpanded(!expanded)}
      >
        {expanded ? "Hide details" : "View more details"}
      </Button>
      
      {expanded && (
        <div style={{ marginTop: '1rem' }}>
          <Divider style={{ marginBottom: '1rem' }} />
          
          {/* Expanded match details */}
          <Grid>
            <Grid.Col span={6}>
              <Text w={700} style={{ marginBottom: 8, color: '#FFFFFF' }}>Damage Distribution</Text>
              <DamageChart 
                physical={player?.physicalDamageDealtToChampions || 0} 
                magic={player?.magicDamageDealtToChampions || 0} 
                true={player?.trueDamageDealtToChampions || 0} 
              />
            </Grid.Col>
            
            <Grid.Col span={6}>
              <Text w={700} style={{ marginBottom: 8, color: '#FFFFFF' }}>Team Comparison</Text>
              {/* Team stats comparison */}
              <div>
                <CompareStat 
                  label="Kills" 
                  team1={getTeamStat(props.match, playerTeamId, 'kills')} 
                  team2={getTeamStat(props.match, playerTeamId === 100 ? 200 : 100, 'kills')} 
                />
                <CompareStat 
                  label="Gold" 
                  team1={getTeamStat(props.match, playerTeamId, 'goldEarned')} 
                  team2={getTeamStat(props.match, playerTeamId === 100 ? 200 : 100, 'goldEarned')} 
                />
                <CompareStat 
                  label="Towers" 
                  team1={getTeamStat(props.match, playerTeamId, 'turretKills', true)} 
                  team2={getTeamStat(props.match, playerTeamId === 100 ? 200 : 100, 'turretKills', true)} 
                />
              </div>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </Card>
  );
}

// Helper component for stats box
function StatBox({ label, value }: StatProps): React.ReactElement {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: label === 'Vision' ? 'flex-end' : (label === 'Gold' ? 'center' : 'flex-start'),
      width: '100%'
    }}>
      <Text size="xs" style={{ color: '#A0A0A0' }}>{label}</Text>
      <Text size="md" style={{ color: '#FFFFFF' }}>{value}</Text>
    </div>
  );
}

// Helper component for damage chart
function DamageChart({ physical, magic, true: trueDmg }: DamageChartProps): React.ReactElement {
  const total = physical + magic + trueDmg;
  const physicalPercent = total > 0 ? (physical / total) * 100 : 0;
  const magicPercent = total > 0 ? (magic / total) * 100 : 0;
  const truePercent = total > 0 ? (trueDmg / total) * 100 : 0;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <DamageRow label="Physical" value={physical} percent={physicalPercent} color="#AD5E99" />
      <DamageRow label="Magic" value={magic} percent={magicPercent} color="#5E9CAD" />
      <DamageRow label="True" value={trueDmg} percent={truePercent} color="#FFFFFF" />
    </div>
  );
}

// Helper component for damage rows
function DamageRow({ label, value, percent, color }: DamageRowProps): React.ReactElement {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Text size="xs" style={{ color: '#FFFFFF' }}>{label}</Text>
        <Text size="xs" style={{ color: '#FFFFFF' }}>{value.toLocaleString()} ({percent.toFixed(1)}%)</Text>
      </div>
      <div style={{ position: 'relative', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${percent}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// Helper component for team comparison
function CompareStat({ label, team1, team2 }: CompareStatProps): React.ReactElement {
  const total = team1 + team2;
  const team1Percent = total > 0 ? (team1 / total) * 100 : 50;
  
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Text size="xs" style={{ color: '#FFFFFF' }}>{team1}</Text>
        <Text size="xs" style={{ color: '#FFFFFF' }}>{label}</Text>
        <Text size="xs" style={{ color: '#FFFFFF' }}>{team2}</Text>
      </div>
      <div style={{ position: 'relative', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${team1Percent}%`,
            backgroundColor: '#0078D4',
            borderRadius: '4px 0 0 4px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: `${100 - team1Percent}%`,
            backgroundColor: '#E83F5B',
            borderRadius: '0 4px 4px 0'
          }}
        />
      </div>
    </div>
  );
}

// Helper function to get team stats
function getTeamStat(
  matchData: match.MatchDto, 
  teamId: number, 
  statName: string, 
  isTeamStat: boolean = false
): number {
  if (isTeamStat) {
    const team = matchData.info.teams.find(t => t.teamId === teamId);
    if (!team) return 0;
    
    // Safe access to team stats
    const statValue = team[statName as keyof typeof team];
    return typeof statValue === 'number' ? statValue : 0;
  }
  
  return matchData.info.participants
    .filter(p => p.teamId === teamId)
    .reduce((sum, player) => {
      const value = player[statName as keyof typeof player];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
}