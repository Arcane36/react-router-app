import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Homepage from './pages/Homepage';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import EventDetailPage, { loader as eventsDetailsLoader } from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import NewEventPage, { action as newEventAction } from './pages/NewEventPage';
import EventsRootLayout from './pages/EventsRootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Homepage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            path: '',
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventsDetailsLoader,
            children: [
              { index: true, element: <EventDetailPage /> },
              { path: 'edit', element: <EditEventPage /> },
            ],
          },
          { path: 'new', element: <NewEventPage />, action: { newEventAction } },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
