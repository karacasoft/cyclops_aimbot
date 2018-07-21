if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.debug = (param) => {
    console.log('Console-Debug:', param);
    return param;
  };
  console.run = (func, ...params) => {
    const desc = `Running ${func.name}(${params.join(', ')});`;
    console.group(desc);
    console.log('Starting', func.name, 'with params:', params);
    try {
      const res = func(...params);
      console.log('Function returned', res);
      console.groupEnd(desc);
      return res;
    } catch (error) {
      console.log('Function threw the error,', error);
      console.groupEnd(desc);
      throw error;
    }
  };
} else {
  console.debug = (param) => param;
  console.run = (func, ...params) => func(params);
}
