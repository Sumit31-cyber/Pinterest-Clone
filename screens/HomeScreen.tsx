import pins from "../assets/data/pins";
import MasonaryList from "../components/MasonaryList";

export default function HomeScreen() {
  return <MasonaryList pins={pins} />;
}
