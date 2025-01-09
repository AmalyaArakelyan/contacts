// App.tsx
import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import router from './routes/Routes.tsx'; // This imports the router defined in Routes.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {
  return (
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;
