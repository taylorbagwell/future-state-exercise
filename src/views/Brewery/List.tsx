import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';

import { Brewery } from '../../types';
import Button from '../../components/Button';

export default function BreweryList() {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const init = useRef(false);
  const prevPage = useRef(1);

  const fetchBreweries = useCallback(() => {
    let uri = `https://api.openbrewerydb.org/breweries?per_page=10&page=${page}`;

    if (search.trim().length > 0) {
      uri = `https://api.openbrewerydb.org/breweries/search?query=${encodeURIComponent(search.trim())}&per_page=10&page=${page}`;
    }

    fetch(uri)
      .then((res) => res.json())
      .then((res) => {
        console.log('callback', res);

        if (res instanceof Array) {
          setBreweries((s) => update(s, {
            $set: res as Brewery[],
          }));
        }

        setHasNextPage(res.length === 10);
      })
      .catch((err) => {
        if (err instanceof Error) {
          alert(err.message);
        }
      });
  }, [page, search]);

  useEffect(() => {
    if (init.current === false) {
      init.current = true;

      fetchBreweries();
    } else if (prevPage.current !== page) {
      prevPage.current = page;

      fetchBreweries();
    }
  }, [fetchBreweries, page]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    fetchBreweries();
  }

  function onReset() {
    setSearch('');
    setBreweries((s) => update(s, { $set: [] }));
  }

  return (
    <main className="font-sans max-w-2xl mx-auto mt-16 p-8 rounded-md shadow-md w-full">
      <h1 className="text-4xl mb-8">Brewery Catalog</h1>
      <form className="mb-8" onSubmit={onSubmit}>
        <div className="flex gap-2">
          <input
            className="border-2 border-gray-300 px-3 py-2 rounded-md text-black w-full"
            name="search"
            placeholder="Find a brewery"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Button
            text="Search"
            type="submit"
          />
          <Button
            text="Reset"
            theme="DANGER"
            type="reset"
            onClick={() => onReset()}
          />
        </div>
      </form>
      {breweries.length === 0 ? (
        <p>Uh oh! No breweries found!</p>
      ) : (
        <>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">City</th>
                <th className="p-2">State</th>
              </tr>
            </thead>
            <tbody>
              {breweries.map((elem, index) => (
                <tr
                  className={'text-left' && index % 2 === 1 ? 'bg-gray-100' : 'bg-transparent'}
                  key={elem.id}
                >
                  <td className="p-2 text-blue-500 transition-opacity hover:opacity-70">
                    <Link to={`/breweries/${elem.id}`}>
                      {elem.name}
                    </Link>
                  </td>
                  <td className="p-2">{elem.city}</td>
                  <td className="p-2">{elem.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-4 justify-center mt-8">
            <Button
              disabled={page === 1}
              text="Prev"
              theme="PLAIN"
              onClick={() => {
                setPage((p) => {
                  if (p > 1) {
                    return p - 1;
                  }

                  return p;
                });
              }}
            />
            <Button
              disabled={!hasNextPage}
              text="Next"
              theme="PLAIN"
              onClick={() => setPage((p) => p + 1)}
            />
          </div>
        </>
      )}
    </main>
  );
}
