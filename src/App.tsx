import * as React from 'react';
import axios from 'axios';
import Search from './components/Search';

interface AppInterface {
  url: string;
  errorMessage: string;
}

const App: React.FC<AppInterface> = ({ errorMessage, url }) => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const fetchData = React.useCallback(() => {
    axios
      .get(url)
      .then(res => {
        if (res.status === 200 && res.data) {
          setData(res.data);
          setLoading(false);
          setHasError(false);
        }
      })
      .catch(err => {
        setLoading(false);
        setHasError(true);
      });
  }, [url]);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Search
      data={data}
      loading={loading}
      hasError={hasError}
      errorMessage={errorMessage}
    />
  );
};

export default App;
