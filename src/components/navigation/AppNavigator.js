import { createStackNavigator } from 'react-navigation'

import {
    LibraryScreen,
    SongsScreen,
    StoriesScreen,
    PlayerScreen,
} from '../../screens'

export const AppRoutes = {
    Library: 'Library',
    Songs: 'Songs',
    Stories: 'Stories',
    Player: 'Player',
}

export const AppNavigator = createStackNavigator(
  {
    Library: LibraryScreen,
    Songs: SongsScreen,
    Stories: StoriesScreen,
    Player: PlayerScreen,
  },
  {
    initialRouteName: 'Library',
  }
)