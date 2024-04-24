import { Router } from 'express';
import { PATHS } from '@/constants/paths';

const route = Router();

import AuthRoute from './auth.route';
import CategoryRoute from './category.route';
import CommunityRoute from './community.route';
import GameRoute from './game.route';
import GradeRoute from './grade.route';
import LeaderboardRoute from './leaderboard.route';
import PlayerResultRoute from './player-result.route';
import ProviderRoute from './provider.route';
import QuestionRoute from './question.route';
import QuizRoute from './quiz.route';
import UserRoute from './user.route';

route.use(PATHS.AUTH, new AuthRoute().router);
route.use(PATHS.CATEGORY, new CategoryRoute().router);
route.use(PATHS.COMUNITY, new CommunityRoute().router);
route.use(PATHS.GAME, new GameRoute().router);
route.use(PATHS.GRADE, new GradeRoute().router);
route.use(PATHS.LEADERBOARD, new LeaderboardRoute().router);
route.use(PATHS.PLAYERRESULT, new PlayerResultRoute().router);
route.use(PATHS.PROVIDER, new ProviderRoute().router);
route.use(PATHS.QUESTION, new QuestionRoute().router);
route.use(PATHS.QUIZ, new QuizRoute().router);
route.use(PATHS.USER, new UserRoute().router);

export default route;
