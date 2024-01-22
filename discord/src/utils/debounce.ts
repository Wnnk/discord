function debounce  (callback:Function ,delay=1000)  {
  let timer:ReturnType<typeof setTimeout >| null = null;
  return function(...args:any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this,args);
    },delay)
  }
}

export { debounce }