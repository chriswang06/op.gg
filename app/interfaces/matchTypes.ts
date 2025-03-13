export interface MatchDto {
    metadata: MetadataDto;
    info: InfoDto;
}

export interface MetadataDto {
    dataVersion: string;
    matchId: string;
    participants: string[];
}

export interface InfoDto {
    endOfGameResult: string;
    gameCreation: number;
    gameDuration: number;
    gameEndTimestamp: number;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: ParticipantDto[];
    platformId: string;
    queueId: number;
    teams: TeamDto[];
    tournamentCode: string;
}

export interface ParticipantDto {
    allInPings: number;
    assistMePings: number;
    assists: number;
    baronKills: number;
    bountyLevel: number;
    champExperience: number;
    champLevel: number;
    championId: number;
    championName: string;
    commandPings: number;
    championTransform: number;
    consumablesPurchased: number;
    challenges: ChallengesDto;
    damageDealtToBuildings: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    deaths: number;
    detectorWardsPlaced: number;
    doubleKills: number;
    dragonKills: number;
    eligibleForProgression: boolean;
    enemyMissingPings: number;
    enemyVisionPings: number;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    gameEndedInEarlySurrender: boolean;
    gameEndedInSurrender: boolean;
    goldEarned: number;
    goldSpent: number;
    individualPosition: string;
    inhibitorKills: number;
    inhibitorTakedowns: number;
    inhibitorsLost: number;
    itemsPurchased: number;
    killingSprees: number;
    kills: number;
    lane: string;
    longestTimeSpentLiving: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    magicDamageTaken: number;
    neutralMinionsKilled: number;
    pentaKills: number;
    perks: PerksDto;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    profileIcon: number;
    puuid: string;
    quadraKills: number;
    riotIdGameName: string;
    riotIdTagline: string;
    role: string;
    sightWardsBoughtInGame: number;
    summonerId: string;
    summonerLevel: number;
    summonerName: string;
    teamId: number;
    teamPosition: string;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalHeal: number;
    totalMinionsKilled: number;
    visionScore: number;
    win: boolean;
}

export interface ChallengesDto {
    legendaryItemUsed: number[];
    damagePerMinute: number;
    kda: number;
    killParticipation: number;
    visionScorePerMinute: number;
}

export interface PerksDto {
    statPerks: PerkStatsDto;
    styles: PerkStyleDto[];
}

export interface PerkStatsDto {
    defense: number;
    flex: number;
    offense: number;
}

export interface PerkStyleDto {
    description: string;
    selections: PerkStyleSelectionDto[];
    style: number;
}

export interface PerkStyleSelectionDto {
    perk: number;
    var1: number;
    var2: number;
    var3: number;
}

export interface TeamDto {
    bans: BanDto[];
    objectives: ObjectivesDto;
    teamId: number;
    win: boolean;
}

export interface BanDto {
    championId: number;
    pickTurn: number;
}

export interface ObjectivesDto {
    baron: ObjectiveDto;
    champion: ObjectiveDto;
    dragon: ObjectiveDto;
    horde: ObjectiveDto;
    inhibitor: ObjectiveDto;
    riftHerald: ObjectiveDto;
    tower: ObjectiveDto;
}

export interface ObjectiveDto {
    first: boolean;
    kills: number;
}
