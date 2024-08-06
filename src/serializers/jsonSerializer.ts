const jsonSerializer = (data: object[] | object | undefined) => {
  return JSON.stringify(data, null, 2);
};

export default jsonSerializer;
