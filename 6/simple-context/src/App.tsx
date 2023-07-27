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
  updateName: (type: NameType, value: string) => set(() => ({ [type]: value }))
}));

const TextInput = ({ nameType }: { nameType: NameType }) => {
  const value = useStore((state) => state[nameType]);
  const updateName = useStore((state) => state.updateName);

  return (
    <div className="field">
      {nameType}: <input value={value} onChange={e => updateName(nameType, e.target.value)} />
    </div>
  );
};

const Display = ({ nameType }: { nameType: NameType }) => {
  const value = useStore((state) => state[nameType]);

  return (
    <div className="value">
      {nameType}: {value}
    </div>
  );
};

const FormContainer = memo(() => (
  <div className="container">
    <h5>FormContainer</h5>
    <TextInput nameType="first" />
    <TextInput nameType="last" />
  </div>
));

const DisplayContainer = memo(() => (
  <div className="container">
    <h5>DisplayContainer</h5>
    <Display nameType="first" />
    <Display nameType="last" />
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
