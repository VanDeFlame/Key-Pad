import React, { useContext, useEffect } from 'react';
import Key from '@components/Key';
import { importConfig } from '@hooks/useSaveConfig';
import AppContext from '@context/AppContext';
import '@styles/Abc.scss';

const Abc = () => {
  const { importKeys, state:{keys} } = useContext(AppContext);
  const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  useEffect(() => {
    let key = [];
    try {
      key = importConfig();
    }
    catch (e) {
      console.error(e);
      abc.forEach(k => key.push({key:k,name:null,type:null,url:null,volume:null}));
    }
    
    importKeys(key);
  }, []);

  return (
    <section>
      <datalist id="Options" name="Producto">
        <option value="audio" />
        <option value="stop" />
      </datalist>

      <ol className="key--list" id="key--list" type="A">
        {keys.map(k => {
          return (<Key keyValue={k} key={'abc-'+k.key}/>)
        })}
      </ol>
    </section>
  );
}

export default Abc;