import configFile from '@assets/config.json';

const importConfig = () => {
  return configFile;
}

const exportConfig = async (datos) => {
  let dataStr = JSON.stringify(datos);

  dataStr = dataStr.replaceAll("," , ',\n    ');
  dataStr = dataStr.replaceAll("    {", "{\n    ");
  dataStr = dataStr.replaceAll("}", "\n}");
  
  let hiddenElement = document.createElement('a');  
  hiddenElement.href = 'data:attachment/text,' + encodeURI(dataStr);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'config.json';
  hiddenElement.click();
}

export {importConfig, exportConfig};