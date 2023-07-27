import { memo } from "react";
import { create } from "zustand";

type NameType = 'first' | 'last';

type PersonName = {
  first: string;
  last: string;
  updateName: (type: NameType, value: string) => void;
};

const useStore = create<PersonName>((set) => ({
  first: '',
  last: '',
  updateName: (type: NameType, value: string) => set((state) => ({ ...state, [type]: value }))
}));

const TextInput = ({ value }: { value: NameType }) => {
  const store = useStore();

  return (
    <div className="field">
      {value}: <input value={store[value]} onChange={e => store.updateName(value, e.target.value)} />
    </div>
  );
};

const Display = ({ value }: { value: NameType }) => {
  const store = useStore();

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

const App = () => (
  <div className="container">
    <h5>App</h5>
    <ContentContainer />
  </div>
)

export default App;
