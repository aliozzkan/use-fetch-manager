import React from "react";

import { useFetchManager } from "use-fetch-manager";

function fetchPosts() {
  return fetch("http://example.com/movies.json").then((response) =>
    response.json()
  );
}

const App = () => {
  const {
    data,
    fetch,
    hasData,
    isFullfilled,
    isPending,
    isRejected,
    onReset,
    status,
  } = useFetchManager(fetchPosts);
  return <div>{status}</div>;
};
export default App;
