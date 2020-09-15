import { createApplication } from 'graphql-modules'
import { RootModule } from './root/root.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AreasModule } from './areas/areas.module'
import { TeamsModule } from './teams/teams.module'
import { UserTeamsModule } from './userTeams/userTeams.module'
import { CompetitionsModule } from './competitions/competitions.module'
import { MatchesModule } from './matches/matches.module'
import { UserMatchesModule } from './userMatches/userMatches.module'

export default new createApplication({
  modules: [
    RootModule,
    AuthModule,
    UsersModule,
    AreasModule,
    TeamsModule,
    UserTeamsModule,
    CompetitionsModule,
    MatchesModule,
    UserMatchesModule
  ]
})
