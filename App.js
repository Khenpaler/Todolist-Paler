import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import TodoScreen from './src/components/screens/TodoScreen';


export default function App() {
  return (
    <PaperProvider>
        <TodoScreen/>
    </PaperProvider>
  );
}