import LayoutTodo from "./Pages/Layout/Layout";
import List from "./Pages/List"
import { QueryClientProvider,QueryClient } from "react-query";
const queryclient =new QueryClient()
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryclient}>

     <LayoutTodo/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
