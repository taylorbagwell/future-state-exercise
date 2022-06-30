import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import update from 'immutability-helper';

import { Brewery } from '../../types';
import Loader from '../../components/Loader';

export default function BreweryDetail() {
  const [details, setDetails] = useState<Brewery | null>(null);
  const [showLoader, setShowLoader] = useState(true);

  const { id } = useParams();
  const init = useRef(false);

  useEffect(() => {
    function fetchDetails() {
      fetch(`https://api.openbrewerydb.org/breweries/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setShowLoader(false);

          if (typeof res.id === 'string') {
            setDetails((d) => update(d, { $set: res }));
          } else {
            setDetails((d) => update(d, { $set: null }));
          }
        })
        .catch((err) => {
          setShowLoader(false);

          if (err instanceof Error) {
            alert(err.message);
          }
        });
    }

    if (init.current === false) {
      init.current = true;

      fetchDetails();
    }
  }, [id]);

  return (
    <main className="font-sans max-w-2xl mx-auto mt-16 p-8 rounded-md shadow-md w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl">Brewery Details</h1>
        <Link
          className="text-blue-500 transition-opacity hover:opacity-70"
          to="/breweries"
        >
          &larr; Back to Breweries
        </Link>
      </div>
      {details ? (
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="font-bold p-2">Name</td>
              <td className="p-2">{details.name}</td>
            </tr>
            <tr>
              <td className="font-bold p-2">Location</td>
              <td className="p-2">{`${details.city}, ${details.state} ${details.country}`}</td>
            </tr>
            <tr>
              <td className="font-bold p-2">Phone Number</td>
              <td className="p-2">{details.phone}</td>
            </tr>
            <tr>
              <td className="font-bold p-2">Website</td>
              <td className="p-2">
                {details.website_url ? (
                  <a
                    className="text-blue-500 transition-opacity hover:opacity-70"
                    href={details.website_url}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    View Website
                  </a>
                ) : (
                  <>
                    No website found.
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Uh oh! Brewery not found!</p>
      )}

      {showLoader && <Loader />}
    </main>
  );
}
