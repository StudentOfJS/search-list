import * as React from 'react';
import { Data, DataInterface } from '../../types';
import List from '../List';

const Search: React.FC<DataInterface> = ({
  data,
  errorMessage,
  hasError,
  loading,
}) => {
  const [value, setValue] = React.useState('');
  const [term, setTerm] = React.useState('');
  const [preDisplay, setPreDisplay] = React.useState(data);
  const [display, setDisplay] = React.useState(data);

  const searchFilter = React.useCallback(
    (item: Data): boolean => {
      return (
        item.Location.toLowerCase().includes(term) ||
        item.ProjectTitle.toLowerCase().includes(term) ||
        item.ShortDescription.toLowerCase().includes(term)
      );
    },
    [term]
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e && e.currentTarget && e.currentTarget.value) {
      setValue(e.currentTarget.value);
    } else {
      setValue('');
    }
  };
  React.useEffect(() => {
    if (data && data.length > 0 && !term) {
      setPreDisplay(data);
    }
  }, [data, term, setPreDisplay]);

  React.useEffect(() => {
    if (data && data.length > 0 && term && term.length > 1) {
      let newData = data.filter(searchFilter).map(item => {
        item.searchScore = 0;
        if (item.Location.toLowerCase().includes(term)) {
          item.searchScore += 2;
        }
        if (item.ProjectTitle.toLowerCase().includes(term)) {
          item.searchScore += 3;
        }
        if (item.ShortDescription.toLowerCase().includes(term)) {
          item.searchScore += 1;
        }
        return item;
      });
      setPreDisplay(newData);
    }
  }, [data, term, setPreDisplay, searchFilter]);

  React.useEffect(() => {
    if (data && data.length > 0 && !term) {
      setDisplay(data);
    }
  }, [data, term]);

  React.useEffect(() => {
    if (value) {
      setTerm(value.toLowerCase());
    } else {
      setTerm('');
    }
  }, [value, setTerm]);

  React.useEffect(() => {
    if (preDisplay) {
      setDisplay(
        preDisplay.sort(function(a: Data, b: Data) {
          return (b.searchScore || 0) - (a.searchScore || 0);
        })
      );
    }
  }, [preDisplay, setDisplay]);

  return (
    <article>
      <form>
        <label className="wc-label" htmlFor="project-filter">
          Filter
        </label>
        <input
          type="search"
          name="project-filter"
          id="project-filter"
          onChange={handleChange}
          placeholder="filter"
          className={`wc-project-filter__input${
            loading ? ' wc-project-filter__input--loading' : ''
          }`}
          disabled={loading || hasError}
        />
      </form>
      {hasError && <span>{errorMessage}</span>}
      {!loading && !hasError && data && data.length > 0 && (
        <List data={display} />
      )}
    </article>
  );
};

export default Search;
