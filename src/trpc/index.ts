import { publicProcedure, router } from './trpc';

export const appRouter = router({
  text: publicProcedure.query(() => {
    return 'hello';
  }),
});

export type AppRouter = typeof appRouter;
