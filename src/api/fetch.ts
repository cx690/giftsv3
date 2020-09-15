const fetchDefault = {
  method: "GET",
  cache: "no-cache",
  credentials: "include", // include, same-origin, *omit
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
};

function getRequestQuery(params: { [index: string]: any }) {
  //目前无需考虑兼容性问题
  const query = paramFilter(params);
  const usp = new URLSearchParams(query);
  return usp.toString();
}

function paramFilter(params: { [index: string]: any }) {
  //删除无用的数据
  const result: {
    [index: string]: any;
  } = {};
  for (const k in params) {
    if (params[k] !== "" && params[k] !== undefined && params[k] !== null) {
      result[k] = params[k];
    }
  }
  return result;
}

export default function fetch(url: string, data = {}, opt = {}) {
  const options: any = Object.assign({}, fetchDefault, opt);
  options.method = options.method.toUpperCase();
  if (options.method === "GET" || options.method === "HEAD") {
    const query = getRequestQuery(data);
    if (query) {
      url = `${url}?${query}`;
    }
  } else {
    options.body = JSON.stringify(paramFilter(data));
  }
  return window
    .fetch(url, options)
    .then(response => {
      if (response.ok) {
        const res = response.json() || {};
        return res;
      }
      console.error("服务器繁忙，请稍后再试！");
      throw new Error(response.statusText);
    })
    .catch(err => {
      console.error("Fetch Error : %s", err);
      return {};
      // throw new Error(err);
    });
}
