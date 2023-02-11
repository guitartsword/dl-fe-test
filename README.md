# Frontend Test

## How to run

```sh
npm i
npm run dev

# Open the following url: http://127.0.0.1:5173/
# You can play around with network throttle using dev tools 
```

## What to expect
Autocomplete component has debounce, uses a loading state
that makes it easier to increase and tune UX by not showing the loader immediately,
which makes it feel "faster" on slower networks.

You can modify the contents on the file `src/mocks/names.json` to add/modify/delete search results,
it uses `msw` to simulate api calls.
