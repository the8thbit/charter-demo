import './App.css';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './Themes/theme';

import RewardsTable from './Components/RewardsTable';

const App = () => {
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    fetch('/dataset.json').then((response) => {
      if (!response.ok) {
        console.error(response);
        throw new Error(response);
      }
      return response.json();
    }).then((json) => {
      console.log(json);
      setRawData(json);
    }).catch((e) => {
      console.error(e);
      throw new Error(e);
    });
  }, [setRawData]);

  return (
    <ThemeProvider theme={getTheme()}>
      <div className="App">
        <RewardsTable rawData={rawData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
