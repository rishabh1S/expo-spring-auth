import { ZodError, ZodSchema } from "zod";

export const useValidation = () => {
  const validate = (values: any, schema: ZodSchema) => {
    try {
      schema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
      }
      return {};
    }
    return {};
  };

  return { validate };
};
