import jsonSerializer from "@/serializers/jsonSerializer";

class Controller {
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

export default Controller;
