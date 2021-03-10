import './App.css';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/Users/Users';
import AdminPage from './AdminPage';
import { getIssues } from './actions/issues';

const loginStyle = {
  margin: "33px auto 36px",
  maxWidth: "550px",
  padding: "35px",
};

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}
export default App;