const jsonSerializer = (data: object[] | undefined) => {
  return JSON.stringify(data, null, 2);
};

export default jsonSerializer;
