
import { QueryClientProvider } from '@tanstack/react-query';
import { Paths } from './routes';
import { queryClient } from './services';
import AuthProvider from './contexts/AuthContext';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Paths />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
