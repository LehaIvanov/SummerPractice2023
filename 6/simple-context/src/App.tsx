import { createContext, memo, useContext, useState } from "react";

const useStoreData = () => {
  const store = useState({
    first: "",
    last: "",
  });

  return store;
}

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

const StoreContext = createContext<UseStoreDataReturnType | null>(null);

const useStore = () => useContext(StoreContext)!;

const TextInput = ({ value }: { value: "first" | "last" }) => {
  const [store, setStore] = useStore();

  return (
    <div className="field">
      {value}: <input value={store[value]} onChange={e => setStore({ ...store, [value]: e.target.value })} />
    </div>
  );
};

const Display = ({ value }: { value: "first" | "last" }) => {
  const [store] = useStore();

  return (
    <div className="value">
      {value}: {store[value]}
    </div>
  );
};

const FormContainer = memo(() => (
  <div className="container">
    <h5>FormContainer</h5>
    <TextInput value="first" />
    <TextInput value="last" />
  </div>
));

const DisplayContainer = memo(() => (
  <div className="container">
    <h5>DisplayContainer</h5>
    <Display value="first" />
    <Display value="last" />
  </div>
));

const ContentContainer = memo(() => (
  <div className="container">
    <h5>ContentContainer</h5>
    <FormContainer />
    <DisplayContainer />
  </div>
));

const App = () => {
  const store = useState({
    first: "",
    last: "",
  });

  return (
    <StoreContext.Provider value={store}>
      <div className="container">
        <h5>App</h5>
        <ContentContainer />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
