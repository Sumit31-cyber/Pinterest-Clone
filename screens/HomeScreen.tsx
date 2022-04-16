import { useNhostClient } from "@nhost/react";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import MasonaryList from "../components/MasonaryList";

export default function HomeScreen() {
  const nhost = useNhostClient();
  const [loading, setLoading] = useState(false);

  const [pins, setPins] = useState([]);

  const fetchPins = async () => {
    setLoading(true);
    const response = await nhost.graphql.request(`
    query MyQuery {
      pins {
      created_at
      id
      image
      title
      user_id
      
    }
    }
    `);
    if (response.error) {
      Alert.alert("Error", response.error.message);
    } else {
      setPins(response.data.pins);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <MasonaryList pins={pins} onRefresh={fetchPins} refreshing={loading} />
  );
}
