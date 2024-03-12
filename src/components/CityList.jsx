import CityItem from "./CityItem";
import styles from "./CityList.module.css";
function CityList({ cities, isLoading }) {
  return (
    <ul className={styles.classList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
