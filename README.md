# use-fetch-manager

> Manager your fetches

[![NPM](https://img.shields.io/npm/v/use-fetch-manager.svg)](https://www.npmjs.com/package/use-fetch-manager) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-fetch-manager
```

## Usage

```tsx
import * as React from "react";

import { useFetchManager } from "use-fetch-manager";

const Example = () => {
  const { fetch, isFulfilled, isRejected, status, reset } = useFetchManager(
    () => fetch("url")
  );

  useEffect(() => {
    fetch();
  }, [])

  return <div>{status}</div>;
};
```

## License

MIT © [aliozzkan](https://github.com/aliozzkan)

