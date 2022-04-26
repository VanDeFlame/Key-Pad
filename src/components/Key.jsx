import React, { useState, useContext, useRef } from 'react';
import useActions from '@hooks/useActions';
import AppContext from '@context/AppContext';
// import $ from "jquery";
import '@styles/Key.scss';

const Key = ({keyValue}) => {
  const { updateKey } = useContext(AppContext);
  const [configToggle, setConfigToggle] = useState(false);
  const [propsConfig, setPropsConfig] = useState([]);
  const updateForm = useRef(null);
  const keyType = useRef(null);

  const changeKeyProps = (type) => {
    switch(type)
    {
      case "audio": 
        setPropsConfig([
          <input
            key={keyValue.key+'-keys--key-props-'+type+'-url'}
            className='keys--input'
            name='url' type='url'
            placeholder='audio url'
            defaultValue={keyValue.url}
          />,
          <input
            key={keyValue.key+'-keys--key-props-'+type+'-volume'}
            className='keys--input input_volume'
            name='volume' type='range'
            min={0} max={10}
            defaultValue={keyValue.volume}
          />
        ]);
        break;
      case "stop": setPropsConfig([]); break;
      default: break;
    }
  }

  const changeKey = () => {
    const formData = new FormData(updateForm.current);
    let data = {
      key: keyValue.key,
      name: formData.get('name'),
      type: formData.get('type')
    };

    switch (data.type)
    {
      case 'audio':
        data = 
        {
          ...data,
          url: formData.get('url'),
          volume: formData.get('volume')
        };
        break;
      default: break;
    }

    setConfigToggle(false);
    console.log(data);
    updateKey(data);
  }
  
  return (
    <li className='keys'>
      <span key={'key-letter-'+keyValue.key}
        className='keys--letter'>{keyValue.key}</span>

      { configToggle
      ? [
        <form
          className='keys--cont'
          key={'key-form-'+keyValue.key}
          ref={updateForm}>

          <div className='keys--cont--inputs'>
            <div className='keys--key-props'>
              <input
                className='keys--input'
                name='name'
                type='text'
                placeholder='name'
                defaultValue={keyValue.name}
              />

              <input
                className='keys--input input_type'
                name='type'
                list='Options'
                placeholder='action'
                onInput={() => changeKeyProps(keyType.current.value)}
                defaultValue={keyValue.type}
                ref={keyType}
              />
            </div>

            
            {(propsConfig.length)
              ? <div className='keys--key-props'>{propsConfig}</div>
              : []
            }
          </div>
          <button
            className='keys--button'
            type='button'
            onClick={changeKey}>
            Save
          </button>
        </form>
      ]
      : [
        <div className='keys--cont' key={keyValue.key+'-key-info'}>
          <span
            className='keys--cont--text'>
            <p>{keyValue.name}</p>
          </span>

          <div className='keys--cont--buttons'>
            <button
              className='keys--button'
              onClick={() => {setConfigToggle(!configToggle); changeKeyProps(keyValue.type)}}>
              Config
            </button>

            <button
              className='keys--button'
              onClick={() => useActions(keyValue)}>
              Test
            </button>
          </div>
        </div>
      ]}
    </li>
  );
}

export default Key;