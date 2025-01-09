import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import ContactList from '../pages/ContactList.tsx'
import CreateContact from '../pages/CreateContact.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ContactList,
})

const homeRouteWithContact = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$id',
  component: ContactList,
})

const createContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateContact,
})
const editContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/edit/$id',
  component: CreateContact,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  homeRouteWithContact,
  createContactRoute,
  editContactRoute,
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router
