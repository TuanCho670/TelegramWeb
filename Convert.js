const atlasToJSON = (atlasData) => {
    const lines = atlasData.split('\n');
    const json = {
      meta: {},
      frames: {},
    };
  
    let currentKey = null;
  
    lines.forEach((line) => {
      line = line.trim();
      if (line === '') return;
  
      // Meta data
      if (!line.startsWith(' ') && !line.includes(':')) {
        if (!json.meta.image) {
          json.meta.image = line;
        } else {
          currentKey = line;
          json.frames[currentKey] = {};
        }
      } else if (line.includes(':')) {
        const [key, value] = line.split(':').map((s) => s.trim());
  
        if (!currentKey) {
          // Global meta
          if (key === 'size') {
            const [width, height] = value.split(',').map(Number);
            json.meta.size = { width, height };
          } else {
            json.meta[key] = value;
          }
        } else {
          // Frame data
          if (key === 'xy' || key === 'size' || key === 'orig' || key === 'offset') {
            const [x, y] = value.split(',').map(Number);
            json.frames[currentKey][key] = { x, y };
          } else if (key === 'rotate') {
            json.frames[currentKey][key] = value === 'true';
          } else if (key === 'index') {
            json.frames[currentKey][key] = parseInt(value, 10);
          } else {
            json.frames[currentKey][key] = value;
          }
        }
      }
    });
  
    return JSON.stringify(json, null, 2);
  };
  
  // Atlas data as input
  const atlasData = `
  Symbols@2x.webp
  size: 2048,2044
  format: RGBA8888
  filter: Linear,Linear
  repeat: none
  2Tiao_G
    rotate: true
    xy: 1812, 582
    size: 102, 123
    orig: 102, 123
    offset: 0, 0
    index: -1
  2Tiao_N
    rotate: true
    xy: 1878, 10
    size: 102, 123
    orig: 102, 123
    offset: 0, 0
    index: -1
  `;
  
  // Convert and output the result
  console.log(atlasToJSON(atlasData));
  
