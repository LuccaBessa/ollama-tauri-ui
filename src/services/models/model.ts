export interface Model {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    format: string;
    family: string;
    families: null | any[];
    parameter_size: string;
    quantization_level: string;
  };
}

export interface ModelResponse {
  models: Model[];
}
