import jsonSerializer from "@/serializers/jsonSerializer";

class Model {
  static makeDataResult(value: object[] | object | undefined) {
    const data = {
      data: value
    };
    return {
      data,
      json: () => jsonSerializer(data),
    };
  }
}

export default Model;
