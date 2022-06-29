import { Link } from 'react-router-dom';

export default function BreweryList() {
  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form>
        <input type='text' name='search' placeholder='Find a brewery' />
        <button type='submit'>Search</button>
        <button type='reset'>Reset</button>
      </form>
      <ul>
        <li>
          <Link to='/breweries/1'>Brewery 1</Link> - Brewtown, OR
        </li>
      </ul>
    </main>
  );
}
